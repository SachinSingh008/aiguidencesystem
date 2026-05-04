# CareerPilot AI 🚀

Your AI Career Mentor. Built for Engineers. Discover ideal career paths, close skill gaps, and follow personalized roadmaps to become industry-ready — all powered by AI that knows you.

## 🌟 Features

- **🧭 AI Career Matching:** Get personalized career recommendations based on your branch, skills & interests with 90%+ accuracy.
- **🎯 Skill Gap Analysis:** Visualize exactly what you need to learn. Compare your skills against industry-ready benchmarks.
- **📖 Curated Learning Paths:** Top courses from Coursera, Udemy & YouTube — handpicked for your goals.
- **✅ Mock Tests & Interviews:** Practice with real-world questions, instant scoring, and AI feedback.
- **📄 ATS Resume Builder:** Build recruiter-friendly resumes in minutes with live preview and templates.
- **🧠 24/7 AI Mentor:** Chat with your personal mentor who knows your profile, goals, and progress.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide React)
- **Routing:** React Router DOM
- **State Management:** TanStack React Query
- **Forms & Validation:** React Hook Form + Zod
- **Backend & Auth:** Supabase
- **Charts:** Recharts
- **PDF Generation:** jsPDF

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Ensure you have a `.env` file in the root directory with the necessary Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/`

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (including shadcn/ui)
│   ├── contexts/        # React Context providers (Auth, Theme)
│   ├── hooks/           # Custom React hooks (useAIContent, etc.)
│   ├── pages/           # Application pages/routes
│   ├── App.tsx          # Main application component & routing
│   └── main.tsx         # Entry point
├── supabase/            # Supabase edge functions/configurations
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

---
*Built with ❤️ for engineering students.*
