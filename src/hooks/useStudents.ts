import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Student, ClusterSummary } from "@/lib/types";

interface DbStudent {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  github_username: string;
  leetcode_username: string;
  department: string;
  year: number;
  cluster: string;
  cpi: number;
  leetcode_total_solved: number | null;
  leetcode_easy: number | null;
  leetcode_medium: number | null;
  leetcode_hard: number | null;
  leetcode_streak: number | null;
  leetcode_ranking: number | null;
  github_total_commits: number | null;
  github_total_repos: number | null;
  github_total_prs: number | null;
  github_total_stars: number | null;
  github_languages: any;
  last_refreshed_at: string | null;
}

const generateHistory = (base: number) => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split("T")[0],
      count: Math.max(0, Math.floor(base + Math.random() * 4 - 1)),
    });
  }
  return data;
};

function mapDbToStudent(db: DbStudent): Student {
  const commitBase = Math.max(1, Math.floor((db.github_total_commits || 0) / 100));
  const subBase = Math.max(1, Math.floor((db.leetcode_total_solved || 0) / 100));
  return {
    id: db.id,
    name: db.name,
    email: db.email,
    avatarUrl: db.avatar_url || "",
    githubUsername: db.github_username,
    leetcodeUsername: db.leetcode_username,
    department: db.department,
    year: db.year,
    cluster: db.cluster as Student["cluster"],
    cpi: db.cpi,
    leetcode: {
      totalSolved: db.leetcode_total_solved || 0,
      easy: db.leetcode_easy || 0,
      medium: db.leetcode_medium || 0,
      hard: db.leetcode_hard || 0,
      streak: db.leetcode_streak || 0,
      ranking: db.leetcode_ranking || 0,
      recentSubmissions: generateHistory(subBase),
    },
    github: {
      totalCommits: db.github_total_commits || 0,
      totalRepos: db.github_total_repos || 0,
      totalPRs: db.github_total_prs || 0,
      totalStars: db.github_total_stars || 0,
      languages: Array.isArray(db.github_languages) ? db.github_languages : [],
      commitHistory: generateHistory(commitBase),
    },
  };
}

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: async (): Promise<Student[]> => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("cpi", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapDbToStudent);
    },
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: async (): Promise<Student | null> => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data ? mapDbToStudent(data) : null;
    },
    enabled: !!id,
  });
}

export function useClusterSummaries(students: Student[]) {
  const clusters: ClusterSummary[] = [
    { name: "Advanced", count: 0, avgCpi: 0, color: "hsl(152, 60%, 50%)" },
    { name: "Intermediate", count: 0, avgCpi: 0, color: "hsl(210, 80%, 55%)" },
    { name: "Beginner", count: 0, avgCpi: 0, color: "hsl(38, 92%, 50%)" },
  ];
  for (const s of students) {
    const c = clusters.find((cl) => cl.name === s.cluster);
    if (c) {
      c.count++;
      c.avgCpi += s.cpi;
    }
  }
  for (const c of clusters) {
    if (c.count > 0) c.avgCpi = Math.round(c.avgCpi / c.count);
  }
  return clusters;
}

export function useRefreshStudents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("refresh-students");
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}
