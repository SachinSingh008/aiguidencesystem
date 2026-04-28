import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, Users, Clock, Play, Bookmark, ExternalLink, CheckCircle2, Search, Loader2, RefreshCw } from "lucide-react";
import { useGeneratedContent, type GenCourse } from "@/hooks/useGeneratedContent";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

const COLORS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-yellow-500 to-orange-500",
  "from-green-500 to-teal-500",
  "from-indigo-500 to-purple-500",
  "from-orange-500 to-red-500",
];

export default function Courses() {
  const { content, loading, generating, regenerate } = useGeneratedContent();
  const courses = content.courses;
  const [platform, setPlatform] = useState("All");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const { items, upsert } = useProgress();

  const platforms = useMemo(() => ["All", ...Array.from(new Set(courses.map((c) => c.platform)))], [courses]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(courses.map((c) => c.category)))], [courses]);

  const completedIds = new Set(items.filter((i) => i.item_type === "course" && i.completed).map((i) => i.item_id));
  const startedIds = new Set(items.filter((i) => i.item_type === "course").map((i) => i.item_id));

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const p = platform === "All" || c.platform === platform;
      const cat = category === "All" || c.category === category;
      const q = !query || `${c.title} ${c.instructor}`.toLowerCase().includes(query.toLowerCase());
      return p && cat && q;
    });
  }, [courses, platform, category, query]);

  const toggleSave = (id: number) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    toast.success(saved.includes(id) ? "Removed from saved" : "Saved for later");
  };

  const start = async (c: GenCourse) => {
    window.open(c.url, "_blank", "noopener,noreferrer");
    await upsert({
      item_type: "course",
      item_id: String(c.id),
      item_name: c.title,
      progress: completedIds.has(String(c.id)) ? 100 : 25,
      completed: completedIds.has(String(c.id)),
      metadata: { platform: c.platform, category: c.category, url: c.url },
    });
  };

  const markComplete = async (c: GenCourse) => {
    await upsert({
      item_type: "course",
      item_id: String(c.id),
      item_name: c.title,
      progress: 100,
      completed: true,
      metadata: { platform: c.platform, category: c.category, url: c.url },
    });
    toast.success(`Marked '${c.title}' as completed!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Recommended Courses</h1>
          <p className="text-muted-foreground mt-1">Curated for your branch and goals — links open in a new tab</p>
        </div>
        <Button onClick={regenerate} disabled={generating} variant="outline">
          {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          Regenerate
        </Button>
      </div>

      {(loading || generating) && courses.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p>Finding the best courses for you…</p>
        </Card>
      ) : courses.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center text-muted-foreground">
          No courses yet. Click Regenerate to create your personalised list.
        </Card>
      ) : (
        <>
          <Card className="glass-card p-4 border-border/50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search courses..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Platform:</span>
              {platforms.map((p) => (
                <Button key={p} size="sm" variant={platform === p ? "default" : "outline"} onClick={() => setPlatform(p)} className={platform === p ? "bg-gradient-primary" : ""}>
                  {p}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Topic:</span>
              {categories.map((c) => (
                <Button key={c} size="sm" variant={category === c ? "default" : "outline"} onClick={() => setCategory(c)} className={category === c ? "bg-gradient-accent" : ""}>
                  {c}
                </Button>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => {
              const completed = completedIds.has(String(c.id));
              const started = startedIds.has(String(c.id));
              const color = COLORS[i % COLORS.length];
              return (
                <Card key={c.id} className="glass-card border-border/50 overflow-hidden glow-hover animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className={`h-32 bg-gradient-to-br ${color} relative flex items-end p-4`}>
                    <Badge className="absolute top-3 right-3 bg-background/80 text-foreground border-0">{c.platform}</Badge>
                    {completed && (
                      <Badge className="absolute top-3 left-3 bg-success text-success-foreground border-0 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </Badge>
                    )}
                    <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold line-clamp-2 min-h-[3rem]">{c.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">by {c.instructor}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-warning text-warning" /> {c.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.students}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.duration}</span>
                    </div>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      <Badge variant="outline" className="text-xs">{c.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs">{c.category}</Badge>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-gradient-primary hover:opacity-90" size="sm" onClick={() => start(c)}>
                        {started ? "Continue" : "Start"} <ExternalLink className="w-3 h-3 ml-1.5" />
                      </Button>
                      {!completed && (
                        <Button size="sm" variant="outline" onClick={() => markComplete(c)} title="Mark complete">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="icon" variant="outline" onClick={() => toggleSave(c.id)} className={saved.includes(c.id) ? "text-primary border-primary" : ""}>
                        <Bookmark className={`w-4 h-4 ${saved.includes(c.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          {!filtered.length && <Card className="glass-card p-12 text-center text-muted-foreground">No courses match your filters.</Card>}
        </>
      )}
    </div>
  );
}
