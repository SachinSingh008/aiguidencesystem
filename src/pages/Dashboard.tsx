import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Award, Flame, ArrowRight, Sparkles, Target, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { stats, careerPaths, milestones, roadmap } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

const StatCard = ({ icon: Icon, label, value, accent }: any) => (
  <div className="glass-card p-5 glow-hover animate-slide-up">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { profile } = useAuth();
  const topCareer = careerPaths[0];
  const completedMilestones = milestones.filter(m => m.done).length;
  const progressPct = (completedMilestones / milestones.length) * 100;
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-gradient-hero">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow opacity-50" />
        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-primary mb-2">
            <Sparkles className="w-4 h-4" /> Welcome back
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hi, <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            You're <span className="text-primary font-semibold">{topCareer.match}%</span> matched for <span className="text-foreground font-semibold">{topCareer.title}</span>. Keep building your skills!
          </p>
          <Button asChild className="mt-5 bg-gradient-primary hover:opacity-90">
            <Link to="/career-paths">Explore Career Paths <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Courses Completed" value={stats.coursesCompleted} accent="bg-gradient-primary" />
        <StatCard icon={Target} label="Skills Mastered" value={stats.skillsLearned} accent="bg-gradient-accent" />
        <StatCard icon={Flame} label="Day Streak" value={stats.streak} accent="bg-gradient-to-br from-orange-500 to-red-500" />
        <StatCard icon={Award} label="Badges Earned" value={stats.badges} accent="bg-gradient-to-br from-amber-500 to-yellow-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Roadmap */}
        <Card className="lg:col-span-2 p-6 glass-card border-border/50">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Your Career Roadmap</h2>
              <p className="text-sm text-muted-foreground">Path to {topCareer.title}</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/career-paths">View all <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {roadmap.slice(0, 5).map((step) => (
              <div key={step.step} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                  step.status === "complete" ? "bg-success text-success-foreground" :
                  step.status === "in-progress" ? "bg-gradient-primary text-primary-foreground animate-pulse-glow" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {step.status === "complete" ? "✓" : step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{step.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  step.status === "complete" ? "bg-success/20 text-success" :
                  step.status === "in-progress" ? "bg-primary/20 text-primary" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Milestones */}
        <Card className="p-6 glass-card border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Milestones</h2>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{completedMilestones} of {milestones.length} done</span>
              <span className="font-semibold text-primary">{Math.round(progressPct)}%</span>
            </div>
            <Progress value={progressPct} className="h-2" />
          </div>
          <div className="space-y-2.5">
            {milestones.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                  m.done ? "bg-success" : "border-2 border-border"
                }`}>
                  {m.done && <span className="text-success-foreground text-xs">✓</span>}
                </div>
                <span className={`text-sm ${m.done ? "line-through text-muted-foreground" : ""}`}>{m.title}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
