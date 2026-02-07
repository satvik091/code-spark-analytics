import { Student, ClusterSummary } from "./types";


const generateCommitHistory = (base: number) => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split("T")[0],
      count: Math.max(0, Math.floor(base + Math.random() * 6 - 2)),
    });
  }
  return data;
};

const generateSubmissions = (base: number) => {
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

export const students: Student[] = [
  {
    id: "1", name: "Aarav Sharma", email: "aarav@college.edu", avatarUrl: "",
    githubUsername: "aarav-dev", leetcodeUsername: "aarav_lc", department: "CSE", year: 3,
    cluster: "Advanced", cpi: 92,
    leetcode: { totalSolved: 487, easy: 150, medium: 260, hard: 77, streak: 45, ranking: 12400, recentSubmissions: generateSubmissions(4) },
    github: { totalCommits: 1240, totalRepos: 28, totalPRs: 65, totalStars: 142, languages: [{ name: "TypeScript", percentage: 40 }, { name: "Python", percentage: 35 }, { name: "Go", percentage: 15 }, { name: "Other", percentage: 10 }], commitHistory: generateCommitHistory(5) },
  },
  {
    id: "2", name: "Priya Patel", email: "priya@college.edu", avatarUrl: "",
    githubUsername: "priya-codes", leetcodeUsername: "priya_p", department: "CSE", year: 3,
    cluster: "Advanced", cpi: 88,
    leetcode: { totalSolved: 412, easy: 130, medium: 220, hard: 62, streak: 30, ranking: 18900, recentSubmissions: generateSubmissions(3) },
    github: { totalCommits: 980, totalRepos: 22, totalPRs: 48, totalStars: 89, languages: [{ name: "Python", percentage: 50 }, { name: "JavaScript", percentage: 30 }, { name: "C++", percentage: 20 }], commitHistory: generateCommitHistory(4) },
  },
  {
    id: "3", name: "Rohan Gupta", email: "rohan@college.edu", avatarUrl: "",
    githubUsername: "rohan-g", leetcodeUsername: "rohan_g", department: "IT", year: 2,
    cluster: "Intermediate", cpi: 68,
    leetcode: { totalSolved: 215, easy: 100, medium: 95, hard: 20, streak: 12, ranking: 56000, recentSubmissions: generateSubmissions(2) },
    github: { totalCommits: 420, totalRepos: 12, totalPRs: 15, totalStars: 18, languages: [{ name: "Java", percentage: 55 }, { name: "Python", percentage: 30 }, { name: "HTML", percentage: 15 }], commitHistory: generateCommitHistory(2) },
  },
  {
    id: "4", name: "Sneha Reddy", email: "sneha@college.edu", avatarUrl: "",
    githubUsername: "sneha-r", leetcodeUsername: "sneha_r", department: "CSE", year: 4,
    cluster: "Advanced", cpi: 85,
    leetcode: { totalSolved: 380, easy: 120, medium: 200, hard: 60, streak: 22, ranking: 22000, recentSubmissions: generateSubmissions(3) },
    github: { totalCommits: 870, totalRepos: 19, totalPRs: 42, totalStars: 76, languages: [{ name: "Python", percentage: 45 }, { name: "TypeScript", percentage: 35 }, { name: "Rust", percentage: 20 }], commitHistory: generateCommitHistory(4) },
  },
  {
    id: "5", name: "Vikram Singh", email: "vikram@college.edu", avatarUrl: "",
    githubUsername: "vikram-s", leetcodeUsername: "vikram_s", department: "IT", year: 2,
    cluster: "Intermediate", cpi: 62,
    leetcode: { totalSolved: 178, easy: 90, medium: 72, hard: 16, streak: 8, ranking: 72000, recentSubmissions: generateSubmissions(2) },
    github: { totalCommits: 310, totalRepos: 9, totalPRs: 10, totalStars: 8, languages: [{ name: "JavaScript", percentage: 60 }, { name: "Python", percentage: 25 }, { name: "CSS", percentage: 15 }], commitHistory: generateCommitHistory(2) },
  },
  {
    id: "6", name: "Ananya Joshi", email: "ananya@college.edu", avatarUrl: "",
    githubUsername: "ananya-j", leetcodeUsername: "ananya_j", department: "CSE", year: 1,
    cluster: "Beginner", cpi: 35,
    leetcode: { totalSolved: 52, easy: 40, medium: 10, hard: 2, streak: 3, ranking: 180000, recentSubmissions: generateSubmissions(1) },
    github: { totalCommits: 85, totalRepos: 4, totalPRs: 2, totalStars: 1, languages: [{ name: "Python", percentage: 70 }, { name: "C", percentage: 30 }], commitHistory: generateCommitHistory(1) },
  },
  {
    id: "7", name: "Karan Mehta", email: "karan@college.edu", avatarUrl: "",
    githubUsername: "karan-m", leetcodeUsername: "karan_m", department: "ECE", year: 3,
    cluster: "Intermediate", cpi: 71,
    leetcode: { totalSolved: 245, easy: 110, medium: 110, hard: 25, streak: 15, ranking: 48000, recentSubmissions: generateSubmissions(2) },
    github: { totalCommits: 520, totalRepos: 14, totalPRs: 22, totalStars: 28, languages: [{ name: "C++", percentage: 45 }, { name: "Python", percentage: 35 }, { name: "VHDL", percentage: 20 }], commitHistory: generateCommitHistory(3) },
  },
  {
    id: "8", name: "Divya Nair", email: "divya@college.edu", avatarUrl: "",
    githubUsername: "divya-n", leetcodeUsername: "divya_n", department: "CSE", year: 1,
    cluster: "Beginner", cpi: 28,
    leetcode: { totalSolved: 34, easy: 28, medium: 5, hard: 1, streak: 2, ranking: 220000, recentSubmissions: generateSubmissions(1) },
    github: { totalCommits: 45, totalRepos: 3, totalPRs: 1, totalStars: 0, languages: [{ name: "Python", percentage: 80 }, { name: "HTML", percentage: 20 }], commitHistory: generateCommitHistory(1) },
  },
  {
    id: "9", name: "Arjun Verma", email: "arjun@college.edu", avatarUrl: "",
    githubUsername: "arjun-v", leetcodeUsername: "arjun_v", department: "IT", year: 4,
    cluster: "Advanced", cpi: 82,
    leetcode: { totalSolved: 356, easy: 115, medium: 185, hard: 56, streak: 18, ranking: 26000, recentSubmissions: generateSubmissions(3) },
    github: { totalCommits: 780, totalRepos: 20, totalPRs: 38, totalStars: 55, languages: [{ name: "Go", percentage: 40 }, { name: "TypeScript", percentage: 35 }, { name: "Python", percentage: 25 }], commitHistory: generateCommitHistory(3) },
  },
  {
    id: "10", name: "Meera Iyer", email: "meera@college.edu", avatarUrl: "",
    githubUsername: "meera-i", leetcodeUsername: "meera_i", department: "CSE", year: 2,
    cluster: "Beginner", cpi: 42,
    leetcode: { totalSolved: 78, easy: 55, medium: 20, hard: 3, streak: 5, ranking: 145000, recentSubmissions: generateSubmissions(1) },
    github: { totalCommits: 130, totalRepos: 6, totalPRs: 4, totalStars: 3, languages: [{ name: "Java", percentage: 60 }, { name: "Python", percentage: 30 }, { name: "SQL", percentage: 10 }], commitHistory: generateCommitHistory(1) },
  },
];

export const clusterSummaries: ClusterSummary[] = [
  { name: "Advanced", count: students.filter(s => s.cluster === "Advanced").length, avgCpi: Math.round(students.filter(s => s.cluster === "Advanced").reduce((a, s) => a + s.cpi, 0) / students.filter(s => s.cluster === "Advanced").length), color: "hsl(152, 60%, 50%)" },
  { name: "Intermediate", count: students.filter(s => s.cluster === "Intermediate").length, avgCpi: Math.round(students.filter(s => s.cluster === "Intermediate").reduce((a, s) => a + s.cpi, 0) / students.filter(s => s.cluster === "Intermediate").length), color: "hsl(210, 80%, 55%)" },
  { name: "Beginner", count: students.filter(s => s.cluster === "Beginner").length, avgCpi: Math.round(students.filter(s => s.cluster === "Beginner").reduce((a, s) => a + s.cpi, 0) / students.filter(s => s.cluster === "Beginner").length), color: "hsl(38, 92%, 50%)" },
];
