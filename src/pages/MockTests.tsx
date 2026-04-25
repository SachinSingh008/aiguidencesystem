import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileQuestion, Trophy, Play, CheckCircle2, XCircle } from "lucide-react";
import { mockTests, sampleQuestions, testResults } from "@/lib/mockData";

export default function MockTests() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (activeTest !== null && !done && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0 && activeTest !== null && !done) setDone(true);
  }, [timeLeft, activeTest, done]);

  const startTest = (id: number) => {
    setActiveTest(id);
    setQIdx(0);
    setAnswers([]);
    setDone(false);
    setTimeLeft(300);
  };

  const answer = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (qIdx < sampleQuestions.length - 1) setQIdx(qIdx + 1);
    else setDone(true);
  };

  const score = answers.filter((a, i) => a === sampleQuestions[i]?.answer).length;

  if (activeTest !== null) {
    const test = mockTests.find(t => t.id === activeTest)!;
    if (done) {
      const pct = Math.round((score / sampleQuestions.length) * 100);
      return (
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8 border-border/50 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
              <Trophy className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mt-4">Test Complete!</h2>
            <p className="text-muted-foreground">{test.title}</p>
            <p className="text-6xl font-bold gradient-text mt-6">{pct}%</p>
            <p className="text-muted-foreground mt-1">{score} out of {sampleQuestions.length} correct</p>

            <div className="mt-6 space-y-2 text-left">
              {sampleQuestions.map((q, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50">
                  {answers[i] === q.answer ? <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
                  <div className="text-sm">
                    <p className="font-medium">{q.q}</p>
                    <p className="text-xs text-muted-foreground mt-1">Answer: {q.options[q.answer]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setActiveTest(null)}>Back to Tests</Button>
              <Button className="flex-1 bg-gradient-primary" onClick={() => startTest(activeTest)}>Retake</Button>
            </div>
          </Card>
        </div>
      );
    }

    const q = sampleQuestions[qIdx];
    const mins = Math.floor(timeLeft / 60), secs = timeLeft % 60;
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="glass-card p-6 border-border/50">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline">Question {qIdx + 1} / {sampleQuestions.length}</Badge>
            <div className="flex items-center gap-1.5 text-sm font-mono bg-secondary px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
              {mins}:{secs.toString().padStart(2, "0")}
            </div>
          </div>
          <Progress value={((qIdx) / sampleQuestions.length) * 100} className="mb-6 h-2" />

          <h3 className="text-lg font-semibold mb-5">{q.q}</h3>
          <div className="space-y-2.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answer(i)}
                className="w-full text-left p-4 rounded-xl bg-secondary/50 hover:bg-primary/20 hover:border-primary border border-border transition-all"
              >
                <span className="text-muted-foreground mr-3">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Mock Tests</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge and track your progress</p>
      </div>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-warning" /> Recent Results</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {testResults.map(r => (
            <div key={r.id} className="bg-secondary/50 rounded-xl p-4">
              <p className="text-sm font-medium truncate">{r.topic}</p>
              <p className="text-2xl font-bold gradient-text mt-1">{r.score}%</p>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockTests.map((t, i) => (
          <Card key={t.id} className="glass-card p-5 border-border/50 glow-hover animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <Badge variant="outline" className="mb-3">{t.difficulty}</Badge>
            <h3 className="font-bold text-lg">{t.title}</h3>
            <div className="flex gap-4 text-xs text-muted-foreground mt-3">
              <span className="flex items-center gap-1"><FileQuestion className="w-3 h-3" /> {t.questions} Qs</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.duration}</span>
            </div>
            <Button onClick={() => startTest(t.id)} className="w-full mt-4 bg-gradient-primary hover:opacity-90">
              <Play className="w-4 h-4 mr-2" /> Start Test
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
