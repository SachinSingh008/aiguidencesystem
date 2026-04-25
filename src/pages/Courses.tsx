import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, Play, Bookmark, ExternalLink } from "lucide-react";
import { courses } from "@/lib/mockData";
import { toast } from "sonner";

const platforms = ["All", "Coursera", "Udemy", "YouTube", "LinkedIn Learning"];

export default function Courses() {
  const [filter, setFilter] = useState("All");
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = filter === "All" ? courses : courses.filter(c => c.platform === filter);

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast.success(saved.includes(id) ? "Removed from saved" : "Saved for later");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Recommended Courses</h1>
        <p className="text-muted-foreground mt-1">Curated learning resources from top platforms</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map(p => (
          <Button
            key={p}
            size="sm"
            variant={filter === p ? "default" : "outline"}
            onClick={() => setFilter(p)}
            className={filter === p ? "bg-gradient-primary" : ""}
          >
            {p}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <Card key={c.id} className="glass-card border-border/50 overflow-hidden glow-hover animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`h-32 bg-gradient-to-br ${c.color} relative flex items-end p-4`}>
              <Badge className="absolute top-3 right-3 bg-background/80 text-foreground border-0">{c.platform}</Badge>
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

              <div className="mt-3">
                <Badge variant="outline" className="text-xs">{c.difficulty}</Badge>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1 bg-gradient-primary hover:opacity-90" size="sm">
                  Start <ExternalLink className="w-3 h-3 ml-1.5" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => toggleSave(c.id)} className={saved.includes(c.id) ? "text-primary border-primary" : ""}>
                  <Bookmark className={`w-4 h-4 ${saved.includes(c.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
