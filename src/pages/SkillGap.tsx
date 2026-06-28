import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, ClipboardCheck, AlertCircle, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const REQUIRED = 80; // target proficiency for all skills

export default function SkillGap() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { skillScores, loading } = useProgress();

  const skillGaps = [
    ...(profile?.current_skills || []).map((skill) => {
      const current = skillScores[skill] !== undefined ? skillScores[skill] : 35;
      const status = current >= REQUIRED ? "complete" : current > 0 ? "in-progress" : "missing";
      return { skill, current, required: REQUIRED, status, type: "Skill" };
    }),
    ...(profile?.interests || []).map((interest) => {
      const current = skillScores[interest] !== undefined ? skillScores[interest] : 0;
      const status = current >= REQUIRED ? "complete" : current > 0 ? "in-progress" : "missing";
      return { skill: interest, current, required: REQUIRED, status, type: "Interest" };
    })
  ];

  const missing    = skillGaps.filter((s) => s.status === "missing").length;
  const inProgress = skillGaps.filter((s) => s.status === "in-progress").length;
  const complete   = skillGaps.filter((s) => s.status === "complete").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Skill Gap Analyzer</h1>
          <p className="text-muted-foreground mt-1">Your current skills vs what your target career requires</p>
        </div>
        <Button onClick={() => navigate("/mock-tests")} variant="outline">
          <ClipboardCheck className="w-4 h-4 mr-2" />
          Take a Test to Update Scores
        </Button>
      </div>

      {loading ? (
        <Card className="glass-card p-12 border-border/50 text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
          <p>Loading skill data…</p>
        </Card>
      ) : skillGaps.length === 0 ? (
        <Card className="glass-card p-12 border-border/50 text-center">
          <p className="text-muted-foreground">No skills or interests in your profile yet. Add them in Settings to see your gap analysis.</p>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="glass-card p-5 border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{missing}</p>
                  <p className="text-xs text-muted-foreground">Not Started</p>
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

          {/* Tip banner */}
          <Card className="glass-card p-4 border-primary/30 bg-primary/5 flex items-center gap-3 mb-6">
            <ClipboardCheck className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm">Give a mock test to increase your score! Each test result automatically updates the relevant skills.</p>
          </Card>

          {/* Chart */}
          <Card className="glass-card p-6 border-border/50">
            <h2 className="text-xl font-bold mb-1">Skill Gap Overview</h2>
            <p className="text-sm text-muted-foreground mb-4">Your current proficiency vs. required level (80%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={skillGaps.slice(0, 8)} margin={{ top: 4, right: 8, left: -10, bottom: 40 }}>
                <XAxis dataKey="skill" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 8 }}
                  formatter={(val: number, name: string) => [`${val}%`, name === "current" ? "You" : "Required"]}
                />
                <Bar dataKey="current" name="current" radius={[4, 4, 0, 0]}>
                  {skillGaps.slice(0, 8).map((s, i) => (
                    <Cell
                      key={i}
                      fill={s.status === "complete" ? "#22c55e" : s.status === "in-progress" ? "#f59e0b" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 mt-2 text-xs text-muted-foreground justify-center">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#22c55e] inline-block" /> Mastered (≥80%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block" /> In Progress</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#ef4444] inline-block" /> Not Started</span>
            </div>
          </Card>

          {/* Detailed list */}
          <Card className="glass-card p-6 border-border/50">
            <h2 className="text-xl font-bold mb-5">Detailed Skill Analysis</h2>
            <div className="space-y-5">
              {skillGaps.map((s, i) => (
                <div key={`${s.skill}-${s.type}`} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{s.skill}</span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{s.type}</span>
                      {s.status === "complete"   && <CheckCircle2 className="w-4 h-4 text-success" />}
                      {s.status === "missing"    && <AlertCircle  className="w-4 h-4 text-destructive" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-foreground">{s.current}%</span>
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
                    <div
                      className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                        s.status === "complete"   ? "bg-gradient-to-r from-success to-success" :
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
        </>
      )}
    </div>
  );
}

