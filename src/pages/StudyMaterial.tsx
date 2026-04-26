import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ExternalLink, Search, BookMarked, FileText, Video, Book, Code2 } from "lucide-react";
import { studyMaterials, studyBranches, type StudyMaterial } from "@/lib/mockData";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

const typeIcon: Record<string, any> = {
  Notes: FileText,
  "Cheat Sheet": BookMarked,
  eBook: Book,
  "Video Series": Video,
  Documentation: Code2,
};

export default function StudyMaterial() {
  const [branch, setBranch] = useState("All");
  const [query, setQuery] = useState("");
  const { items, upsert } = useProgress();

  const readIds = new Set(items.filter((i) => i.item_type === "material").map((i) => i.item_id));

  const filtered = useMemo(() => {
    return studyMaterials.filter((m) => {
      const matchBranch = branch === "All" || m.branch === branch;
      const matchQuery = !query || `${m.title} ${m.subject}`.toLowerCase().includes(query.toLowerCase());
      return matchBranch && matchQuery;
    });
  }, [branch, query]);

  const open = async (m: StudyMaterial) => {
    window.open(m.url, "_blank", "noopener,noreferrer");
    await upsert({
      item_type: "material",
      item_id: String(m.id),
      item_name: m.title,
      progress: 100,
      completed: true,
      metadata: { type: m.type, subject: m.subject, branch: m.branch },
    });
    toast.success("Marked as opened");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Study Material Library</h1>
        <p className="text-muted-foreground mt-1">Notes, eBooks, video lectures and documentation curated for engineers</p>
      </div>

      <Card className="glass-card p-4 border-border/50 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by topic, subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {studyBranches.map((b) => (
            <Button
              key={b}
              size="sm"
              variant={branch === b ? "default" : "outline"}
              onClick={() => setBranch(b)}
              className={branch === b ? "bg-gradient-primary" : ""}
            >
              {b}
            </Button>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((m, i) => {
          const Icon = typeIcon[m.type] ?? FileText;
          const read = readIds.has(String(m.id));
          return (
            <Card
              key={m.id}
              className="glass-card p-5 border-border/50 glow-hover animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <Badge variant="outline">{m.type}</Badge>
              </div>
              <h3 className="font-bold mt-4 line-clamp-2 min-h-[3rem]">{m.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{m.subject}</span>
                <span>•</span>
                <span>{m.branch}</span>
              </div>
              <Button onClick={() => open(m)} className="w-full mt-4 bg-gradient-primary hover:opacity-90">
                {read ? "Open Again" : "Open"} <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </Card>
          );
        })}
      </div>

      {!filtered.length && (
        <Card className="glass-card p-12 border-border/50 text-center text-muted-foreground">
          No materials match your filters.
        </Card>
      )}
    </div>
  );
}
