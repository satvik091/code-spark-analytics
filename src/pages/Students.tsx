import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students } from "@/lib/mock-data";
import CpiGauge from "@/components/dashboard/CpiGauge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const Students = () => {
  const [search, setSearch] = useState("");
  const [clusterFilter, setClusterFilter] = useState<string>("All");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.githubUsername.toLowerCase().includes(search.toLowerCase());
    const matchCluster = clusterFilter === "All" || s.cluster === clusterFilter;
    return matchSearch && matchCluster;
  });

  return (
    <DashboardLayout>
      <div className="px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Students</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse and filter all tracked students</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or GitHub..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
          </div>
          <div className="flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {["All", "Advanced", "Intermediate", "Beginner"].map((c) => (
              <button
                key={c}
                onClick={() => setClusterFilter(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  clusterFilter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Link key={s.id} to={`/students/${s.id}`} className="group rounded-xl border border-border bg-card p-5 hover:border-primary/20 hover:shadow-[var(--shadow-glow)] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">@{s.githubUsername} · Year {s.year}</p>
                </div>
                <CpiGauge value={s.cpi} size="sm" />
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold font-mono text-foreground">{s.leetcode.totalSolved}</p>
                  <p className="text-[10px] text-muted-foreground">LC Solved</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold font-mono text-foreground">{s.github.totalCommits}</p>
                  <p className="text-[10px] text-muted-foreground">Commits</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <p className="text-lg font-bold font-mono text-foreground">{s.leetcode.streak}</p>
                  <p className="text-[10px] text-muted-foreground">Streak</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant={s.cluster === "Advanced" ? "default" : s.cluster === "Intermediate" ? "secondary" : "outline"} className="text-[10px]">
                  {s.cluster}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{s.department}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Students;

