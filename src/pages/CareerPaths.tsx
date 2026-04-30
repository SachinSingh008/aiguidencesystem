import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAIContent } from "@/hooks/useAIContent";

export default function CareerPaths() {
  const { profile } = useAuth();
  const { content, loading, generating, generate } = useAIContent();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Career Paths</h1>
          <p className="text-muted-foreground mt-1">
            {profile?.branch
              ? <>Personalised for <span className="text-foreground font-medium">{profile.branch}</span> · {profile.year}</>
              : "Set your profile to see personalised paths."}
          </p>
        </div>
        <Button onClick={generate} disabled={generating || !profile?.branch} variant="outline">
          {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Regenerate
        </Button>
      </div>

      {(loading || generating) && content.careerPaths.length === 0 ? (
        <Card className="glass-card p-16 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p className="font-medium">Gemini is generating career paths for you…</p>
        </Card>
      ) : content.careerPaths.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center text-muted-foreground">
          No career paths yet. Click <span className="text-foreground">Regenerate</span> or complete your profile.
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {content.careerPaths.map((p, i) => (
            <Card key={i} className="glass-card border-border/50 p-6 flex flex-col gap-4 glow-hover animate-slide-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold leading-tight">{p.title}</h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">{p.salary}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 font-medium">{p.growth}</span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Key Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wide">Detailed Roadmap</p>
                <div className="space-y-4">
                  {p.modules?.map((mod, mi) => (
                    <div key={mi} className="bg-secondary/30 rounded-lg p-3 border border-border/40">
                      <h4 className="text-sm font-bold text-foreground mb-2">{mod.title}</h4>
                      <ol className="space-y-1.5 pl-1">
                        {mod.steps.map((step, si) => (
                          <li key={si} className="flex gap-2 items-start text-sm group">
                            <span className="w-4 h-4 rounded-full bg-gradient-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{si + 1}</span>
                            <a 
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(step)}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted-foreground leading-snug hover:text-primary hover:underline transition-colors cursor-pointer flex-1"
                            >
                              {step}
                            </a>
                            <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" />
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
