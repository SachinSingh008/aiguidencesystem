import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Flame, Target, Clock, TrendingUp, Star, Zap, ClipboardCheck, Library } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

const badgeDefs = [
  { name: "First Steps", icon: Zap, color: "from-yellow-500 to-orange-500", earn: (s: any) => s.coursesCompleted + s.testsAttempted + s.materialsRead >= 1 },
  { name: "Code Warrior", icon: Award, color: "from-purple-500 to-pink-500", earn: (s: any) => s.coursesCompleted >= 3 },
  { name: "Test Ace", icon: ClipboardCheck, color: "from-blue-500 to-cyan-500", earn: (s: any) => s.avgTestScore >= 75 },
  { name: "Bookworm", icon: Library, color: "from-emerald-500 to-teal-500", earn: (s: any) => s.materialsRead >= 5 },
  { name: "Streak Master", icon: Flame, color: "from-red-500 to-orange-500", earn: (s: any) => s.coursesCompleted + s.testsAttempted >= 5 },
  { name: "AI Expert", icon: TrendingUp, color: "from-indigo-500 to-purple-500", earn: (s: any) => s.coursesCompleted >= 8 },
];

export default function ProgressPage() {
  const { items, stats } = useProgress();

  const weeklyGoals = [
    { goal: "Complete 3 courses", current: stats.coursesCompleted, target: 3 },
    { goal: "Take 3 mock tests", current: stats.testsAttempted, target: 3 },
    { goal: "Read 5 study materials", current: stats.materialsRead, target: 5 },
    { goal: "Maintain 70%+ avg score", current: Math.min(stats.avgTestScore, 70), target: 70 },
  ];

  const testHistory = items
    .filter((i) => i.item_type === "test")
    .slice(0, 8)
    .map((i) => ({ id: i.id, topic: i.item_name || "Test", score: i.metadata?.score ?? 0, date: new Date(i.updated_at).toLocaleDateString() }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="text-muted-foreground mt-1">Real-time view of your learning journey</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: "Courses Done", value: stats.coursesCompleted, color: "from-blue-500 to-cyan-500" },
          { icon: Target, label: "In Progress", value: stats.coursesInProgress, color: "from-purple-500 to-pink-500" },
          { icon: ClipboardCheck, label: "Tests Taken", value: stats.testsAttempted, color: "from-orange-500 to-red-500" },
          { icon: Award, label: "Avg Score", value: `${stats.avgTestScore}%`, color: "from-amber-500 to-yellow-500" },
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
          {testHistory.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">Take a mock test to see results here.</p>}
          <div className="space-y-3">
            {testHistory.map((r) => (
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
          {badgeDefs.map((b, i) => {
            const earned = b.earn(stats);
            const Icon = b.icon;
            return (
              <div key={i} className={`text-center ${!earned && "opacity-30 grayscale"}`}>
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center shadow-lg ${earned && "animate-float"}`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-xs mt-2 font-medium">{b.name}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
