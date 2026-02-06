export interface Student {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  githubUsername: string;
  leetcodeUsername: string;
  department: string;
  year: number;
  cluster: "Beginner" | "Intermediate" | "Advanced";
  cpi: number; // Coding Performance Index 0-100
  leetcode: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    streak: number;
    ranking: number;
    recentSubmissions: { date: string; count: number }[];
  };
  github: {
    totalCommits: number;
    totalRepos: number;
    totalPRs: number;
    totalStars: number;
    languages: { name: string; percentage: number }[];
    commitHistory: { date: string; count: number }[];
  };
}

export interface ClusterSummary {
  name: "Beginner" | "Intermediate" | "Advanced";
  count: number;
  avgCpi: number;
  color: string;
}
