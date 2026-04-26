import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, IndianRupee, ArrowRight, CheckCircle2, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import { careerPaths, type CareerPath } from "@/lib/mockData";

export default function CareerPaths() {
  const [selected, setSelected] = useState<CareerPath | null>(null);

  if (selected) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <Button variant="ghost" onClick={() => setSelected(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all paths
        </Button>

        <Card className="glass-card p-6 md:p-8 border-border/50 bg-gradient-hero">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selected.icon}</div>
              <div>
                <h1 className="text-3xl font-bold">{selected.title}</h1>
                <p className="text-muted-foreground mt-1 max-w-2xl">{selected.description}</p>
              </div>
            </div>
            <Badge className="bg-gradient-primary border-0 text-base px-3 py-1">{selected.match}% match</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-background/50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><IndianRupee className="w-3 h-3" /> Salary</div>
              <p className="font-semibold mt-1">{selected.salary}</p>
            </div>
            <div className="bg-background/50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground"><TrendingUp className="w-3 h-3" /> Growth</div>
              <p className="font-semibold mt-1 text-success">{selected.growth}</p>
            </div>
            <div className="bg-background/50 rounded-xl p-3 col-span-2">
              <div className="text-xs text-muted-foreground">Best for branches</div>
              <p className="font-semibold mt-1">{selected.branches.join(", ")}</p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs text-muted-foreground mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground">{s}</span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 border-border/50">
          <h2 className="text-xl font-bold mb-1">Step-by-step Roadmap</h2>
          <p className="text-sm text-muted-foreground mb-6">Follow this path with curated resources at each stage</p>
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border" />
            <div className="space-y-4">
              {selected.roadmap.map((s) => (
                <div key={s.step} className="flex gap-4 items-start relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold flex-shrink-0 z-10 ${
                    s.status === "complete" ? "bg-success text-success-foreground" :
                    s.status === "in-progress" ? "bg-gradient-primary text-primary-foreground" :
                    "bg-secondary text-muted-foreground"
                  }`}>
                    {s.status === "complete" ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                  </div>
                  <div className="flex-1 glass-card p-4 -mt-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="font-semibold">{s.title}</p>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{s.duration}</span>
                    </div>
                    {s.resources?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {s.resources.map((r) => (
                          <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                              {r.label} <ExternalLink className="w-3 h-3 ml-1.5" />
                            </Button>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">AI-Recommended Career Paths</h1>
        <p className="text-muted-foreground mt-1">Click any path to explore its full roadmap</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {careerPaths.map((c, i) => (
          <Card
            key={c.id}
            className="glass-card p-6 glow-hover border-border/50 animate-slide-up cursor-pointer"
            style={{ animationDelay: `${i * 70}ms` }}
            onClick={() => setSelected(c)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{c.icon}</div>
              <Badge className="bg-gradient-primary border-0">{c.match}% match</Badge>
            </div>
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{c.description}</p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><IndianRupee className="w-3 h-3" /> Salary</div>
                <p className="font-semibold mt-1 text-sm">{c.salary}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><TrendingUp className="w-3 h-3" /> Growth</div>
                <p className="font-semibold mt-1 text-sm text-success">{c.growth}</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs text-muted-foreground mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.slice(0, 4).map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-foreground">{s}</span>
                ))}
              </div>
            </div>

            <Button className="w-full mt-5 bg-gradient-primary hover:opacity-90">
              Explore Path <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
