import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { students } from "@/lib/mock-data";

const ActivityHeatmap = () => {
  // Aggregate daily activity across all students
  const aggregated: Record<string, { date: string; commits: number; submissions: number }> = {};
  students.forEach((s) => {
    s.github.commitHistory.forEach(({ date, count }) => {
      if (!aggregated[date]) aggregated[date] = { date, commits: 0, submissions: 0 };
      aggregated[date].commits += count;
    });
    s.leetcode.recentSubmissions.forEach(({ date, count }) => {
      if (!aggregated[date]) aggregated[date] = { date, commits: 0, submissions: 0 };
      aggregated[date].submissions += count;
    });
  });
  const data = Object.values(aggregated).sort((a, b) => a.date.localeCompare(b.date)).slice(-14);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">Campus Activity</h3>
      <p className="text-xs text-muted-foreground mb-4">Combined commits & submissions (14 days)</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gCommits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(152,60%,50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(152,60%,50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gSubs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(210,80%,55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(210,80%,55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} tickFormatter={(v) => v.slice(5)} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(215,12%,50%)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
          <Area type="monotone" dataKey="commits" stroke="hsl(152,60%,50%)" fill="url(#gCommits)" strokeWidth={2} />
          <Area type="monotone" dataKey="submissions" stroke="hsl(210,80%,55%)" fill="url(#gSubs)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityHeatmap;
