import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

async function fetchLeetCode(username: string): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "error") return null;
    return {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      ranking: data.ranking || 0,
    };
  } catch {
    return null;
  }
}

async function fetchGitHub(username: string, token?: string): Promise<{
  repos: number;
  stars: number;
  commits: number;
  prs: number;
  languages: { name: string; percentage: number }[];
} | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "CodeSpark-Analytics",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      signal: AbortSignal.timeout(10000),
    });
    if (!userRes.ok) return null;
    const user: GitHubUser = await userRes.json();

    // Get repos for language stats and stars
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, signal: AbortSignal.timeout(10000) }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];

    const langCount: Record<string, number> = {};
    let totalStars = 0;
    for (const repo of repos) {
      if (repo.language) langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      totalStars += repo.stargazers_count || 0;
    }

    const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangs) * 100),
      }));

    // Get commit count from events (approximate)
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events?per_page=100`,
      { headers, signal: AbortSignal.timeout(10000) }
    );
    const events = eventsRes.ok ? await eventsRes.json() : [];
    const pushEvents = Array.isArray(events)
      ? events.filter((e: any) => e.type === "PushEvent")
      : [];
    const recentCommits = pushEvents.reduce(
      (sum: number, e: any) => sum + (e.payload?.commits?.length || 0),
      0
    );

    // Get PRs from search
    const prRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
      { headers, signal: AbortSignal.timeout(10000) }
    );
    const prData = prRes.ok ? await prRes.json() : { total_count: 0 };

    return {
      repos: user.public_repos || repos.length,
      stars: totalStars,
      commits: recentCommits,
      prs: prData.total_count || 0,
      languages,
    };
  } catch {
    return null;
  }
}

function computeCPI(lc: LeetCodeStats | null, gh: any): number {
  if (!lc && !gh) return 0;
  const lcScore = lc
    ? Math.min(40, (lc.totalSolved / 600) * 25 + (lc.mediumSolved / 200) * 10 + (lc.hardSolved / 50) * 5)
    : 0;
  const ghScore = gh
    ? Math.min(40, (gh.commits / 1000) * 15 + (gh.repos / 30) * 10 + (gh.prs / 20) * 10 + (gh.stars / 10) * 5)
    : 0;
  return Math.round(Math.min(100, lcScore + ghScore + 10));
}

function assignCluster(cpi: number): string {
  if (cpi >= 45) return "Advanced";
  if (cpi >= 25) return "Intermediate";
  return "Beginner";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const githubToken = Deno.env.get("GITHUB_TOKEN");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all students
    const { data: students, error } = await supabase
      .from("students")
      .select("id, github_username, leetcode_username");

    if (error) throw error;
    if (!students || students.length === 0) {
      return new Response(JSON.stringify({ message: "No students to refresh" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results = { updated: 0, failed: 0, errors: [] as string[] };

    // Process in batches of 5 to avoid rate limits
    for (let i = 0; i < students.length; i += 5) {
      const batch = students.slice(i, i + 5);
      const promises = batch.map(async (student) => {
        try {
          const [lcData, ghData] = await Promise.all([
            fetchLeetCode(student.leetcode_username),
            fetchGitHub(student.github_username, githubToken),
          ]);

          const updates: Record<string, any> = {
            last_refreshed_at: new Date().toISOString(),
          };

          if (lcData) {
            updates.leetcode_total_solved = lcData.totalSolved;
            updates.leetcode_easy = lcData.easySolved;
            updates.leetcode_medium = lcData.mediumSolved;
            updates.leetcode_hard = lcData.hardSolved;
            updates.leetcode_ranking = lcData.ranking;
          }

          if (ghData) {
            updates.github_total_repos = ghData.repos;
            updates.github_total_stars = ghData.stars;
            updates.github_total_prs = ghData.prs;
            updates.github_languages = ghData.languages;
            if (ghData.commits > 0) {
              updates.github_total_commits = ghData.commits;
            }
          }

          const cpi = computeCPI(lcData, ghData);
          if (cpi > 0) {
            updates.cpi = cpi;
            updates.cluster = assignCluster(cpi);
          }

          const { error: updateError } = await supabase
            .from("students")
            .update(updates)
            .eq("id", student.id);

          if (updateError) {
            results.errors.push(`${student.leetcode_username}: ${updateError.message}`);
            results.failed++;
          } else {
            results.updated++;
          }
        } catch (e) {
          results.errors.push(`${student.leetcode_username}: ${e.message}`);
          results.failed++;
        }
      });

      await Promise.all(promises);
      // Small delay between batches
      if (i + 5 < students.length) {
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
