import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ClusterChart from "@/components/dashboard/ClusterChart";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import TopStudentsTable from "@/components/dashboard/TopStudentsTable";
import { useStudents, useRefreshStudents } from "@/hooks/useStudents";
import { Users, Code2, GitCommitHorizontal, Trophy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: students = [], isLoading } = useStudents();
  const refreshMutation = useRefreshStudents();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="px-8 py-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
          </div>
          <Skeleton className="h-64" />
        </div>
      </DashboardLayout>
    );
  }

  const totalSolved = students.reduce((a, s) => a + s.leetcode.totalSolved, 0);
  const totalCommits = students.reduce((a, s) => a + s.github.totalCommits, 0);
  const avgCpi = students.length ? Math.round(students.reduce((a, s) => a + s.cpi, 0) / students.length) : 0;

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72" style={{ background: "var(--gradient-glow)" }} />

        <div className="relative px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Real-time academic coding analytics</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshMutation.mutate()}
              disabled={refreshMutation.isPending}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshMutation.isPending ? "animate-spin" : ""}`} />
              {refreshMutation.isPending ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} title="Total Students" value={students.length} subtitle="Across all departments" trend={{ value: 12, positive: true }} />
            <StatCard icon={Code2} title="Problems Solved" value={totalSolved.toLocaleString()} subtitle="Combined LeetCode" trend={{ value: 8, positive: true }} />
            <StatCard icon={GitCommitHorizontal} title="Total Commits" value={totalCommits.toLocaleString()} subtitle="Combined GitHub" trend={{ value: 15, positive: true }} />
            <StatCard icon={Trophy} title="Average CPI" value={avgCpi} subtitle="Coding Performance Index" trend={{ value: 5, positive: true }} />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2">
              <ActivityHeatmap students={students} />
            </div>
            <ClusterChart students={students} />
          </div>

          <TopStudentsTable students={students} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
