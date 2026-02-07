import { Link } from "react-router-dom";
import { students } from "@/lib/mock-data";
import CpiGauge from "./CpiGauge";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";


const clusterVariant = (c: string) =>
  c === "Advanced" ? "default" : c === "Intermediate" ? "secondary" : "outline";

const TopStudentsTable = () => {
  const sorted = [...students].sort((a, b) => b.cpi - a.cpi);

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Student Leaderboard</h3>
          <p className="text-xs text-muted-foreground">Ranked by Coding Performance Index</p>
        </div>
        <Link to="/students" className="text-xs text-primary hover:underline flex items-center gap-1">
          View all <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border text-muted-foreground">
              <th className="px-5 py-2.5 text-left text-xs font-medium">#</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium">Student</th>
              <th className="px-5 py-2.5 text-left text-xs font-medium">Dept</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium">CPI</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium">LeetCode</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium">Commits</th>
              <th className="px-5 py-2.5 text-center text-xs font-medium">Cluster</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s, i) => (
              <tr key={s.id} className="border-t border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{i + 1}</td>
                <td className="px-5 py-3">
                  <Link to={`/students/${s.id}`} className="hover:text-primary transition-colors">
                    <p className="font-medium text-foreground text-sm">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">@{s.githubUsername}</p>
                  </Link>
                </td>
                <td className="px-5 py-3 text-xs text-muted-foreground">{s.department}</td>
                <td className="px-5 py-3 text-center"><CpiGauge value={s.cpi} size="sm" /></td>
                <td className="px-5 py-3 text-center font-mono text-xs text-foreground">{s.leetcode.totalSolved}</td>
                <td className="px-5 py-3 text-center font-mono text-xs text-foreground">{s.github.totalCommits}</td>
                <td className="px-5 py-3 text-center">
                  <Badge variant={clusterVariant(s.cluster)} className="text-[10px]">{s.cluster}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopStudentsTable;
