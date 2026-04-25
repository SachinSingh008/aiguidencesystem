import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Flame, Target, Clock, TrendingUp, Star, Zap } from "lucide-react";
import { stats, milestones, testResults } from "@/lib/mockData";

const badges = [
  { name: "Quick Learner", icon: Zap, earned: true, color: "from-yellow-500 to-orange-500" },
  { name: "Code Warrior", icon: Award, earned: true, color: "from-purple-500 to-pink-500" },
  { name: "ML Pioneer", icon: Star, earned: true, color: "from-blue-500 to-cyan-500" },
  { name: "Streak Master", icon: Flame, earned: true, color: "from-red-500 to-orange-500" },
  { name: "Project Builder", icon: Target, earned: false, color: "from-green-500 to-teal-500" },
  { name: "AI Expert", icon: TrendingUp, earned: false, color: "from-indigo-500 to-purple-500" },
];

const weeklyGoals = [
  { goal: "Complete 5 hours of learning", current: 4.2, target: 5 },
  { goal: "Finish 2 modules", current: 1, target: 2 },
  { goal: "Take 1 mock test", current: 1, target: 1 },
  { goal: "Build a mini project", current: 0, target: 1 },
];

export default function ProgressPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="text-muted-foreground mt-1">Your learning journey at a glance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Courses", value: stats.coursesCompleted, color: "from-blue-500 to-cyan-500" },
          { icon: Target, label: "Skills", value: stats.skillsLearned, color: "from-purple-500 to-pink-500" },
          { icon: Clock, label: "Hours", value: stats.hoursLearned, color: "from-orange-500 to-red-500" },
          { icon: Flame, label: "Streak", value: `${stats.streak}d`, color: "from-amber-500 to-yellow-500" },
        ].map((s, i) => (
          <Card key={i} className="glass-card p-5 border-border/50">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6 border-border/50">
          <h2 className="font-bold text-xl mb-5">Weekly Goals</h2>
          <div className="space-y-4">
            {weeklyGoals.map((g, i) => {
              const pct = Math.min((g.current / g.target) * 100, 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{g.goal}</span>
                    <span className="text-muted-foreground">{g.current}/{g.target}</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="glass-card p-6 border-border/50">
          <h2 className="font-bold text-xl mb-5">Test History</h2>
          <div className="space-y-3">
            {testResults.map(r => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div>
                  <p className="font-medium text-sm">{r.topic}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className={`text-2xl font-bold ${r.score >= 80 ? "text-success" : r.score >= 60 ? "text-warning" : "text-destructive"}`}>
                  {r.score}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="font-bold text-xl mb-5">Achievements & Badges</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {badges.map((b, i) => (
            <div key={i} className={`text-center ${!b.earned && "opacity-30 grayscale"}`}>
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg ${b.earned && "animate-float"}`}>
                <b.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-xs mt-2 font-medium">{b.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
