import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ClusterChart from "@/components/dashboard/ClusterChart";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import TopStudentsTable from "@/components/dashboard/TopStudentsTable";
import { students } from "@/lib/mock-data";
import { Users, Code2, GitCommitHorizontal, Trophy } from "lucide-react";


const Index = () => {
  const totalSolved = students.reduce((a, s) => a + s.leetcode.totalSolved, 0);
  const totalCommits = students.reduce((a, s) => a + s.github.totalCommits, 0);
  const avgCpi = Math.round(students.reduce((a, s) => a + s.cpi, 0) / students.length);

  return (
    <DashboardLayout>
      <div className="relative">
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={{ background: "var(--gradient-glow)" }} />

        <div className="relative px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time academic coding analytics</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} title="Total Students" value={students.length} subtitle="Across all departments" trend={{ value: 12, positive: true }} />
            <StatCard icon={Code2} title="Problems Solved" value={totalSolved.toLocaleString()} subtitle="Combined LeetCode" trend={{ value: 8, positive: true }} />
            <StatCard icon={GitCommitHorizontal} title="Total Commits" value={totalCommits.toLocaleString()} subtitle="Combined GitHub" trend={{ value: 15, positive: true }} />
            <StatCard icon={Trophy} title="Average CPI" value={avgCpi} subtitle="Coding Performance Index" trend={{ value: 5, positive: true }} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2">
              <ActivityHeatmap />
            </div>
            <ClusterChart />
          </div>

          {/* Table */}
          <TopStudentsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
