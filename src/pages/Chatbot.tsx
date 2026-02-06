import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { students } from "@/lib/mock-data";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const findStudentInfo = (query: string): string => {
  const q = query.toLowerCase();

  // Find student by name
  const student = students.find((s) =>
    q.includes(s.name.toLowerCase()) || q.includes(s.githubUsername.toLowerCase()) || q.includes(s.leetcodeUsername.toLowerCase())
  );

  if (student) {
    if (q.includes("progress") || q.includes("overview") || q.includes("profile") || q.includes("how")) {
      return `**${student.name}** — ${student.department}, Year ${student.year}\n\n🎯 **CPI Score:** ${student.cpi}/100 (${student.cluster})\n\n**LeetCode:**\n- Total Solved: ${student.leetcode.totalSolved} (Easy: ${student.leetcode.easy}, Medium: ${student.leetcode.medium}, Hard: ${student.leetcode.hard})\n- Current Streak: ${student.leetcode.streak} days\n- Ranking: #${student.leetcode.ranking.toLocaleString()}\n\n**GitHub:**\n- ${student.github.totalCommits} commits across ${student.github.totalRepos} repositories\n- ${student.github.totalPRs} pull requests, ${student.github.totalStars} stars\n- Top languages: ${student.github.languages.map(l => `${l.name} (${l.percentage}%)`).join(", ")}`;
    }
    if (q.includes("leetcode") || q.includes("solved") || q.includes("problem")) {
      return `**${student.name}'s LeetCode Profile:**\n\n- **Total Solved:** ${student.leetcode.totalSolved}\n- Easy: ${student.leetcode.easy} | Medium: ${student.leetcode.medium} | Hard: ${student.leetcode.hard}\n- 🔥 Current Streak: ${student.leetcode.streak} days\n- Ranking: #${student.leetcode.ranking.toLocaleString()}`;
    }
    if (q.includes("github") || q.includes("commit") || q.includes("repo")) {
      return `**${student.name}'s GitHub Activity:**\n\n- **Total Commits:** ${student.github.totalCommits}\n- Repositories: ${student.github.totalRepos}\n- Pull Requests: ${student.github.totalPRs}\n- Stars: ${student.github.totalStars}\n- Languages: ${student.github.languages.map(l => `${l.name} (${l.percentage}%)`).join(", ")}`;
    }
    if (q.includes("compare") || q.includes("rank") || q.includes("vs")) {
      const sorted = [...students].sort((a, b) => b.cpi - a.cpi);
      const rank = sorted.findIndex(s => s.id === student.id) + 1;
      return `**${student.name}** is ranked **#${rank}** out of ${students.length} students with a CPI of **${student.cpi}**.\n\nCluster: **${student.cluster}**`;
    }
    return `**${student.name}** — CPI: ${student.cpi} | Cluster: ${student.cluster}\n\nLeetCode: ${student.leetcode.totalSolved} solved | GitHub: ${student.github.totalCommits} commits\n\nAsk about their LeetCode stats, GitHub activity, progress, or ranking for more details!`;
  }

  // General queries
  if (q.includes("top") || q.includes("best") || q.includes("leaderboard")) {
    const top3 = [...students].sort((a, b) => b.cpi - a.cpi).slice(0, 3);
    return `🏆 **Top 3 Students by CPI:**\n\n${top3.map((s, i) => `${i + 1}. **${s.name}** — CPI: ${s.cpi} | ${s.leetcode.totalSolved} problems | ${s.github.totalCommits} commits`).join("\n")}`;
  }

  if (q.includes("cluster") || q.includes("group")) {
    const adv = students.filter(s => s.cluster === "Advanced");
    const mid = students.filter(s => s.cluster === "Intermediate");
    const beg = students.filter(s => s.cluster === "Beginner");
    return `**Student Clusters:**\n\n🟢 **Advanced** (${adv.length}): ${adv.map(s => s.name).join(", ")}\n🔵 **Intermediate** (${mid.length}): ${mid.map(s => s.name).join(", ")}\n🟡 **Beginner** (${beg.length}): ${beg.map(s => s.name).join(", ")}`;
  }

  return `I can help you with student-specific queries! Try asking:\n\n- "How is **Aarav Sharma** doing?"\n- "Show me **Priya Patel**'s LeetCode stats"\n- "What are **Rohan Gupta**'s GitHub commits?"\n- "Who are the **top students**?"\n- "Show me the **cluster** breakdown"`;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm **CodePulse AI** 🤖\n\nI can answer questions about any student's coding profile — LeetCode stats, GitHub activity, CPI scores, rankings, and more.\n\nTry asking about a specific student or request the leaderboard!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = findStudentInfo(input);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-border px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Ask about any student's coding profile</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div className={`max-w-lg rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}>
                {msg.content.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary mt-0.5">
                  <User className="h-3.5 w-3.5 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="rounded-xl bg-card border border-border px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border px-8 py-4">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about a student... e.g. 'How is Aarav Sharma doing?'"
              className="flex-1 bg-card border-border"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
