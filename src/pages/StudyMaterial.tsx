import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BookMarked, Book, Video, Code2, ExternalLink, RefreshCw, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAIContent } from "@/hooks/useAIContent";

const typeIcon: Record<string, any> = {
  Notes: FileText,
  "Cheat Sheet": BookMarked,
  eBook: Book,
  "Video Series": Video,
  Documentation: Code2,
};

const typeColors = [
  "from-purple-500 to-violet-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
];

export default function StudyMaterial() {
  const { profile } = useAuth();
  const { content, loading, generating, generate } = useAIContent();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground mt-1">3 resources picked by Gemini AI for your branch</p>
        </div>
        <Button onClick={generate} disabled={generating || !profile?.branch} variant="outline">
          {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Regenerate
        </Button>
      </div>

      {(loading || generating) && content.studyMaterials.length === 0 ? (
        <Card className="glass-card p-16 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p className="font-medium">Building your study library…</p>
        </Card>
      ) : content.studyMaterials.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center text-muted-foreground">
          No study materials yet. Click <span className="text-foreground">Regenerate</span> or complete your profile.
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {content.studyMaterials.map((m, i) => {
            const Icon = typeIcon[m.type] ?? FileText;
            return (
              <Card key={i} className="glass-card border-border/50 p-5 flex flex-col gap-4 glow-hover animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${typeColors[i % typeColors.length]} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{m.type}</span>
                </div>
                <h3 className="font-bold text-base leading-snug">{m.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                <p className="text-xs text-muted-foreground font-medium">{m.subject}</p>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="sm">
                    Open Resource <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
