import DashboardLayout from "@/components/layout/DashboardLayout";
import { students, clusterSummaries } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ScatterChart, Scatter, CartesianGrid, Cell } from "recharts";

const Analytics = () => {
  // Department breakdown
  const deptData = Object.entries(
    students.reduce<Record<string, { solved: number; commits: number; count: number }>>((acc, s) => {
      if (!acc[s.department]) acc[s.department] = { solved: 0, commits: 0, count: 0 };
      acc[s.department].solved += s.leetcode.totalSolved;
      acc[s.department].commits += s.github.totalCommits;
      acc[s.department].count += 1;
      return acc;
    }, {})
  ).map(([name, d]) => ({ name, avgSolved: Math.round(d.solved / d.count), avgCommits: Math.round(d.commits / d.count) }));

  // Scatter data
  const scatterData = students.map((s) => ({
    name: s.name,
    x: s.leetcode.totalSolved,
    y: s.github.totalCommits,
    cpi: s.cpi,
    cluster: s.cluster,
  }));

  const clusterColors: Record<string, string> = { Advanced: "hsl(152,60%,50%)", Intermediate: "hsl(210,80%,55%)", Beginner: "hsl(38,92%,50%)" };

  // CPI distribution
  const cpiRanges = [
    { range: "0-20", count: students.filter(s => s.cpi <= 20).length },
    { range: "21-40", count: students.filter(s => s.cpi > 20 && s.cpi <= 40).length },
    { range: "41-60", count: students.filter(s => s.cpi > 40 && s.cpi <= 60).length },
    { range: "61-80", count: students.filter(s => s.cpi > 60 && s.cpi <= 80).length },
    { range: "81-100", count: students.filter(s => s.cpi > 80).length },
  ];

  return (
    <DashboardLayout>
      <div className="px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Deep dive into campus-wide coding performance</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Department comparison */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Department Comparison</h3>
            <p className="text-xs text-muted-foreground mb-4">Average per student</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={deptData} barGap={4}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
                <Bar dataKey="avgSolved" fill="hsl(152,60%,50%)" radius={[4, 4, 0, 0]} name="Avg Solved" />
                <Bar dataKey="avgCommits" fill="hsl(210,80%,55%)" radius={[4, 4, 0, 0]} name="Avg Commits" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CPI Distribution */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">CPI Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Score ranges</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cpiRanges}>
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={25} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
                <Bar dataKey="count" fill="hsl(280,65%,60%)" radius={[4, 4, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scatter */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Performance Scatter</h3>
          <p className="text-xs text-muted-foreground mb-4">LeetCode solved vs GitHub commits (colored by cluster)</p>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,14%,14%)" />
              <XAxis dataKey="x" name="LeetCode Solved" tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="y" name="GitHub Commits" tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={45} />
              <Tooltip
                contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }}
                formatter={(value: number, name: string) => [value, name]}
                labelFormatter={() => ""}
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-border bg-popover p-3 text-xs shadow-lg">
                      <p className="font-semibold text-foreground">{d.name}</p>
                      <p className="text-muted-foreground">LC: {d.x} · Commits: {d.y} · CPI: {d.cpi}</p>
                    </div>
                  );
                }}
              />
              <Scatter data={scatterData}>
                {scatterData.map((entry, i) => (
                  <Cell key={i} fill={clusterColors[entry.cluster]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-3">
            {clusterSummaries.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                <span className="text-xs text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
