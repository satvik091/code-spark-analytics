import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students } from "@/lib/mock-data";
import CpiGauge from "@/components/dashboard/CpiGauge";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, Code2, Flame, Star, GitPullRequest, FolderGit2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const StudentDetail = () => {
  const { id } = useParams();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96 text-muted-foreground">Student not found</div>
      </DashboardLayout>
    );
  }

  const difficultyData = [
    { name: "Easy", value: student.leetcode.easy, color: "hsl(152,60%,50%)" },
    { name: "Medium", value: student.leetcode.medium, color: "hsl(38,92%,50%)" },
    { name: "Hard", value: student.leetcode.hard, color: "hsl(0,72%,55%)" },
  ];

  return (
    <DashboardLayout>
      <div className="px-8 py-8">
        {/* Back */}
        <Link to="/students" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Students
        </Link>

        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground font-bold text-xl">
            {student.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{student.name}</h1>
            <p className="text-sm text-muted-foreground">{student.department} · Year {student.year} · {student.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs font-mono gap-1"><Github className="h-3 w-3" />{student.githubUsername}</Badge>
              <Badge variant="outline" className="text-xs font-mono gap-1"><Code2 className="h-3 w-3" />{student.leetcodeUsername}</Badge>
            </div>
          </div>
          <div className="text-center">
            <CpiGauge value={student.cpi} size="md" />
            <p className="text-[10px] text-muted-foreground mt-1">CPI Score</p>
          </div>
          <Badge variant={student.cluster === "Advanced" ? "default" : student.cluster === "Intermediate" ? "secondary" : "outline"}>
            {student.cluster}
          </Badge>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-6 gap-3 mb-6">
          {[
            { icon: Code2, label: "Problems Solved", value: student.leetcode.totalSolved },
            { icon: Flame, label: "LC Streak", value: student.leetcode.streak },
            { icon: Github, label: "Commits", value: student.github.totalCommits },
            { icon: FolderGit2, label: "Repositories", value: student.github.totalRepos },
            { icon: GitPullRequest, label: "Pull Requests", value: student.github.totalPRs },
            { icon: Star, label: "Stars", value: student.github.totalStars },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className="h-4 w-4 mx-auto text-muted-foreground mb-2" />
              <p className="text-xl font-bold font-mono text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Commit History */}
          <div className="col-span-2 rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">GitHub Commit History</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={student.github.commitHistory.slice(-14)}>
                <defs>
                  <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152,60%,50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(152,60%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={25} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
                <Area type="monotone" dataKey="count" stroke="hsl(152,60%,50%)" fill="url(#gc)" strokeWidth={2} name="Commits" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Difficulty Pie */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Problem Difficulty</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={difficultyData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={36} outerRadius={56} strokeWidth={2} stroke="hsl(220,18%,7%)">
                  {difficultyData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {difficultyData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-[10px] text-muted-foreground">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LeetCode submissions + Languages */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">LeetCode Submissions (14 days)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={student.leetcode.recentSubmissions.slice(-14)}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} tickFormatter={(v) => v.slice(8)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={25} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
                <Bar dataKey="count" fill="hsl(210,80%,55%)" radius={[4, 4, 0, 0]} name="Submissions" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Languages</h3>
            <div className="space-y-4">
              {student.github.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-foreground font-medium">{lang.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${lang.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDetail;

