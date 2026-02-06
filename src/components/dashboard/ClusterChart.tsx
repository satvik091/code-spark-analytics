import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { clusterSummaries } from "@/lib/mock-data";

const ClusterChart = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="text-sm font-semibold text-foreground mb-1">Student Clusters</h3>
    <p className="text-xs text-muted-foreground mb-4">ML-based skill grouping</p>
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={clusterSummaries} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} strokeWidth={2} stroke="hsl(220,18%,7%)">
            {clusterSummaries.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "hsl(220,18%,9%)", border: "1px solid hsl(220,14%,14%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210,20%,92%)" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-3 flex-1">
        {clusterSummaries.map((c) => (
          <div key={c.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
              <span className="text-xs text-foreground">{c.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-foreground">{c.count}</span>
              <span className="text-[10px] text-muted-foreground ml-1">avg {c.avgCpi}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ClusterChart;
