import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAIContent } from "@/hooks/useAIContent";

const CARD_COLORS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
];

export default function Courses() {
  const { profile } = useAuth();
  const { content, loading, generating, phase, generate } = useAIContent();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recommended Courses</h1>
          <p className="text-muted-foreground mt-1">3 courses picked by Gemini AI for your profile</p>
        </div>
        <Button onClick={generate} disabled={generating || !profile?.branch} variant="outline">
          {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Regenerate
        </Button>
      </div>

      {(loading || generating) && content.courses.length === 0 ? (
        <Card className="glass-card p-16 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p className="font-medium">{phase || "Finding the best courses for you…"}</p>
        </Card>
      ) : content.courses.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center text-muted-foreground">
          No courses yet. Click <span className="text-foreground">Regenerate</span> or complete your profile.
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {content.courses.map((c, i) => (
            <Card key={i} className="glass-card border-border/50 overflow-hidden glow-hover animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`h-28 bg-gradient-to-br ${CARD_COLORS[i % CARD_COLORS.length]} relative flex items-center justify-center`}>
                <BookOpen className="w-12 h-12 text-white opacity-70" />
                <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full bg-black/30 text-white">{c.platform}</span>
                <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-black/30 text-white">{c.difficulty}</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="font-bold text-base leading-snug">{c.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
                <p className="text-xs text-muted-foreground">by {c.instructor} · {c.duration}</p>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="sm">
                    Start Course <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
