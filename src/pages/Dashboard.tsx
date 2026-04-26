import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Award, Flame, ArrowRight, Sparkles, Target, Clock, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { careerPaths } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";

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
  const { items, stats } = useProgress();
  const topCareer = careerPaths[0];
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  const recent = items.slice(0, 5);
  const totalTracked = items.length || 1;
  const completed = items.filter((i) => i.completed).length;
  const overallPct = Math.round((completed / totalTracked) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Courses Done" value={stats.coursesCompleted} accent="bg-gradient-primary" />
        <StatCard icon={Target} label="In Progress" value={stats.coursesInProgress} accent="bg-gradient-accent" />
        <StatCard icon={ClipboardCheck} label="Tests Taken" value={stats.testsAttempted} accent="bg-gradient-to-br from-orange-500 to-red-500" />
        <StatCard icon={Award} label="Avg Test Score" value={`${stats.avgTestScore}%`} accent="bg-gradient-to-br from-amber-500 to-yellow-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
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
            {topCareer.roadmap.slice(0, 5).map((step) => (
              <div key={step.step} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 ${
                  step.status === "complete" ? "bg-success text-success-foreground" :
                  step.status === "in-progress" ? "bg-gradient-primary text-primary-foreground" :
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

        <Card className="p-6 glass-card border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Live Progress</h2>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{completed} of {items.length} items done</span>
              <span className="font-semibold text-primary">{overallPct}%</span>
            </div>
            <Progress value={overallPct} className="h-2" />
          </div>
          <div className="space-y-2">
            {recent.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Start a course or test to see live progress here.
              </p>
            )}
            {recent.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary/50">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${m.completed ? "bg-success" : "bg-warning"}`} />
                <span className="text-sm flex-1 truncate">{m.item_name || m.item_id}</span>
                <Badge type={m.item_type} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Badge({ type }: { type: string }) {
  const map: Record<string, string> = {
    course: "bg-primary/15 text-primary",
    test: "bg-success/15 text-success",
    material: "bg-accent/15 text-accent-foreground",
  };
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${map[type] ?? "bg-secondary"}`}>{type}</span>;
}
