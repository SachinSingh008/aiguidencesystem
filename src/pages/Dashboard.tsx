import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Award, ArrowRight, Sparkles, Target, Clock, ClipboardCheck, Settings as SettingsIcon, RefreshCw, Loader2, PlayCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { useGeneratedContent } from "@/hooks/useGeneratedContent";

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
  const { content, loading, generating, stale, regenerate } = useGeneratedContent();

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const topCareer = content.careerPaths[0];
  const recent = items.slice(0, 5);
  const totalTracked = items.length || 1;
  const completed = items.filter((i) => i.completed).length;
  const overallPct = Math.round((completed / totalTracked) * 100);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-gradient-hero">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow opacity-50" />
        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 text-sm text-primary mb-2">
              <Sparkles className="w-4 h-4" /> Welcome back
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/onboarding?reconfigure=1">
                  <SettingsIcon className="w-4 h-4 mr-2" /> Reconfigure profile
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={regenerate} disabled={generating || !profile?.branch}>
                {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Regenerate
              </Button>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hi, <span className="gradient-text">{firstName}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            {profile?.branch ? <>Your dashboard is personalised for <span className="text-foreground font-semibold">{profile.branch}</span>{profile.career_goal ? <> — goal: <span className="text-foreground font-semibold">{profile.career_goal}</span></> : null}.</> : "Set up your profile to get personalised recommendations."}
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <Link to="/career-paths">Explore Career Paths <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
          {stale && (
            <p className="mt-4 text-xs text-warning flex items-center gap-2">
              <RefreshCw className="w-3 h-3" /> Your profile changed — content will refresh automatically.
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Courses Done" value={stats.coursesCompleted} accent="bg-gradient-primary" />
        <StatCard icon={Target} label="In Progress" value={stats.coursesInProgress} accent="bg-gradient-accent" />
        <StatCard icon={ClipboardCheck} label="Tests Taken" value={stats.testsAttempted} accent="bg-gradient-to-br from-orange-500 to-red-500" />
        <StatCard icon={Award} label="Avg Test Score" value={`${stats.avgTestScore}%`} accent="bg-gradient-to-br from-amber-500 to-yellow-600" />
      </div>

      {(loading || generating) && content.careerPaths.length === 0 && (
        <Card className="glass-card p-12 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p className="font-medium">Generating personalised content for your profile…</p>
          <p className="text-sm text-muted-foreground mt-1">This usually takes 10–20 seconds.</p>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top recommended career path roadmap preview */}
        <Card className="lg:col-span-2 p-6 glass-card border-border/50">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">Your Top Career Match</h2>
              <p className="text-sm text-muted-foreground">{topCareer ? `Path to ${topCareer.title}` : "No recommendation yet"}</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/career-paths">View all <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          {topCareer ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">
                  {topCareer.icon?.includes("fa-") || topCareer.icon?.length > 4 ? "💼" : topCareer.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{topCareer.title} <span className="text-xs text-primary ml-2">{topCareer.match}% match</span></p>
                  <p className="text-xs text-muted-foreground">{topCareer.salary} • {topCareer.growth}</p>
                </div>
              </div>
              <div className="space-y-3">
                {topCareer.roadmap.slice(0, 5).map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm ${
                      step.status === "complete" ? "bg-success text-success-foreground" :
                      step.status === "in-progress" ? "bg-gradient-primary text-primary-foreground" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {step.status === "complete" ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{step.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3" /> {step.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            !loading && !generating && (
              <p className="text-sm text-muted-foreground py-8 text-center">Set your profile to see a personalised roadmap.</p>
            )
          )}
        </Card>

        {/* Live progress */}
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

      {/* Recommended Video Lectures */}
      {content.videoLectures.length > 0 && (
        <Card className="glass-card p-6 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2"><PlayCircle className="w-5 h-5 text-primary" /> Recommended Video Lectures</h2>
              <p className="text-sm text-muted-foreground">Hand-picked for your branch and skill gaps</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.videoLectures.slice(0, 6).map((v) => (
              <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" className="group">
                <div className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all h-full flex flex-col">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">{v.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{v.channel} • {v.duration}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  <span className="text-[10px] mt-3 px-2 py-0.5 rounded-full bg-primary/15 text-primary self-start">{v.topic}</span>
                </div>
              </a>
            ))}
          </div>
        </Card>
      )}
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
