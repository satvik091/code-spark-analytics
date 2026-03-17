# ⚡ CodePulse – Smart Academic Analytics Platform

🔗 **Live Demo:** https://cheerful-treacle-6b6b63.netlify.app/

---

## 🧠 Overview

**CodePulse** is a smart academic analytics platform for colleges that tracks real-time student progress using their **LeetCode** and **GitHub** activity. Faculty can monitor learning patterns, evaluate performance, and make data-driven decisions. The system includes intelligent student clustering and a personalized AI chatbot.

---

## 🎯 Problem Statement

- Tracking coding progress manually is difficult for colleges
- Faculty lack objective metrics to evaluate student coding skills
- Skill gaps are identified too late in the semester
- No centralized system to compare student performance

---

## 💡 Solution

- ⚡ **Real-Time Progress Tracking** – Automated pipelines fetch LeetCode submissions and GitHub commits
- 🧠 **Skill-Based Student Clustering** – ML algorithms group students into Beginner, Intermediate, and Advanced clusters
- 📊 **Coding Performance Index (CPI)** – Combined score using problems solved, difficulty distribution, commit frequency, and consistency
- 🤖 **AI Chatbot** – Personalized chatbot answers student-specific queries based on coding profiles

---

## 🛠️ Tech Stack

| Category        | Technology |
|----------------|-----------|
| Frontend        | React, TypeScript, Vite |
| Styling         | Tailwind CSS, shadcn/ui |
| Charts          | Recharts |
| Routing         | React Router |
| State           | React Hooks |
| Icons           | Lucide React |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── dashboard/       # StatCard, CpiGauge, ClusterChart, ActivityHeatmap, TopStudentsTable
│   ├── layout/          # DashboardLayout, Sidebar
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── types.ts         # TypeScript interfaces
│   ├── mock-data.ts     # Sample student data
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Index.tsx         # Dashboard overview
│   ├── Students.tsx      # Student listing with search & filters
│   ├── StudentDetail.tsx # Individual student profile
│   ├── Analytics.tsx     # Department analytics & clustering
│   └── Chatbot.tsx       # AI chatbot interface
└── App.tsx               # Router configuration
```

---

## 🚀 Key Features

- 📊 **Dashboard** – Overview stats, activity heatmap, cluster distribution, top performers
- 👥 **Student Management** – Searchable/filterable student list with cluster badges
- 👤 **Student Profiles** – LeetCode difficulty breakdown, GitHub language distribution, activity timeline
- 📈 **Analytics** – Department comparisons, performance scatter plots, cluster analysis
- 🤖 **AI Chatbot** – Query student performance by name (e.g., "How is Aarav Sharma doing?")

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd code-spark-analytics

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔮 Future Enhancements

- 🔴 Live LeetCode & GitHub API integration
- 🔐 Faculty authentication & role-based access
- 🤖 AI-powered chatbot with LangChain / Gemini
- ☁️ Backend with database for persistent student data
- 📱 Mobile-responsive sidebar

---

## 👨‍💻 Author

**Satvik Gupta**  
🎓 B.Tech CSE (AI/ML)  
🔗 GitHub: https://github.com/satvik091

---

## ⭐ Show Your Support

If you found this project useful, please ⭐ the repository!
