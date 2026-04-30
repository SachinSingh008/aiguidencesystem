import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Compass, ExternalLink, RefreshCw, Loader2, Sparkles, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAIContent } from "@/hooks/useAIContent";

export default function Dashboard() {
  const { profile } = useAuth();
  const { content, loading, generating, generate } = useAIContent();

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* Hero */}
      <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-gradient-hero">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-glow opacity-40" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-primary mb-2">
              <Sparkles className="w-4 h-4" /> AI Career Guidance
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Hi, <span className="gradient-text">{firstName}</span> 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              {profile?.branch
                ? <>Your personalised recommendations for <span className="text-foreground font-semibold">{profile.branch}</span> · {profile.year}</>
                : "Set up your profile to get personalised recommendations."}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button asChild variant="outline" size="sm">
              <Link to="/onboarding?reconfigure=1">
                <SettingsIcon className="w-4 h-4 mr-2" /> Edit Profile
              </Link>
            </Button>
            <Button size="sm" variant="outline" onClick={generate} disabled={generating || !profile?.branch}>
              {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Regenerate
            </Button>
          </div>
        </div>

        {profile?.current_skills?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.current_skills.slice(0, 6).map(s => (
              <span key={s} className="text-xs px-3 py-1 rounded-full bg-primary/15 text-primary">{s}</span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Loading state */}
      {(loading || generating) && content.courses.length === 0 && (
        <Card className="glass-card p-16 text-center border-border/50">
          <Loader2 className="w-10 h-10 mx-auto mb-4 animate-spin text-primary" />
          <p className="font-semibold text-lg">Gemini is generating your personalised recommendations…</p>
          <p className="text-sm text-muted-foreground mt-1">This takes about 5–10 seconds.</p>
        </Card>
      )}

      {/* No profile yet */}
      {!profile?.branch && !loading && (
        <Card className="glass-card p-12 text-center border-border/50">
          <p className="text-muted-foreground mb-4">Complete your profile to get AI recommendations.</p>
          <Button asChild className="bg-gradient-primary">
            <Link to="/onboarding">Set Up Profile</Link>
          </Button>
        </Card>
      )}

      {/* Career Paths */}
      {content.careerPaths.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Career Paths</h2>
              <p className="text-xs text-muted-foreground">AI-matched career options for you</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {content.careerPaths.map((p, i) => (
              <Card key={i} className="glass-card border-border/50 p-5 flex flex-col gap-3 glow-hover animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">{p.salary}</span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400">{p.growth}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Key Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.skills.map(s => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-foreground">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">Roadmap Preview:</p>
                  <ol className="space-y-1">
                    {p.modules?.[0]?.steps?.slice(0, 4).map((step, si) => (
                      <li key={si} className="text-xs text-foreground/80 flex gap-2 group items-start">
                        <span className="text-primary font-bold flex-shrink-0">{si + 1}.</span>
                        <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(step)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline transition-colors cursor-pointer flex-1 leading-snug"
                        >
                          {step}
                        </a>
                      </li>
                    ))}
                    {p.modules?.length > 1 && (
                      <li className="text-xs text-muted-foreground italic mt-1">+ {p.modules.length - 1} more modules</li>
                    )}
                  </ol>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Study Materials */}
      {content.studyMaterials.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Study Materials</h2>
              <p className="text-xs text-muted-foreground">Free resources picked for your branch</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {content.studyMaterials.map((m, i) => (
              <Card key={i} className="glass-card border-border/50 p-5 flex flex-col gap-3 glow-hover animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 font-medium">{m.type}</span>
                  <span className="text-xs text-muted-foreground">{m.subject}</span>
                </div>
                <h3 className="font-bold text-base leading-snug">{m.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="sm">
                    Open Resource <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recommended Courses */}
      {content.courses.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Recommended Courses</h2>
              <p className="text-xs text-muted-foreground">Curated by Gemini AI for your profile</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {content.courses.map((c, i) => (
              <Card key={i} className="glass-card border-border/50 p-5 flex flex-col gap-3 glow-hover animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 font-medium">{c.platform}</span>
                  <span className="text-xs text-muted-foreground">{c.difficulty}</span>
                </div>
                <h3 className="font-bold text-base leading-snug">{c.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <div className="text-xs text-muted-foreground">by {c.instructor} · {c.duration}</div>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="sm">
                    Open Course <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
