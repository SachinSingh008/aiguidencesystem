import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, ClipboardCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { skillGaps } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

export default function SkillGap() {
  const navigate = useNavigate();
  const missing = skillGaps.filter(s => s.status === "missing").length;
  const inProgress = skillGaps.filter(s => s.status === "in-progress").length;
  const complete = skillGaps.filter(s => s.status === "complete").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Skill Gap Analyzer</h1>
        <p className="text-muted-foreground mt-1">Compare your current skills with industry requirements</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card p-5 border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{missing}</p>
              <p className="text-xs text-muted-foreground">Missing</p>
            </div>
          </div>
        </Card>
        <Card className="glass-card p-5 border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </div>
        </Card>
        <Card className="glass-card p-5 border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{complete}</p>
              <p className="text-xs text-muted-foreground">Mastered</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="text-xl font-bold mb-5">Detailed Skill Analysis</h2>
        <div className="space-y-5">
          {skillGaps.map((s, i) => (
            <div key={s.skill} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{s.skill}</span>
                  {s.status === "complete" && <CheckCircle2 className="w-4 h-4 text-success" />}
                  {s.status === "missing" && <AlertCircle className="w-4 h-4 text-destructive" />}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{s.current}% / {s.required}%</span>
                  {s.status !== "complete" && (
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate("/courses")}>
                        <BookOpen className="w-3 h-3 mr-1" /> Learn
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-gradient-primary" onClick={() => navigate("/mock-tests")}>
                        <ClipboardCheck className="w-3 h-3 mr-1" /> Test
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-border" style={{ width: `${s.required}%` }} />
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                    s.status === "complete" ? "bg-gradient-to-r from-success to-success" :
                    s.status === "in-progress" ? "bg-gradient-primary" :
                    "bg-gradient-to-r from-destructive to-warning"
                  }`}
                  style={{ width: `${s.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
