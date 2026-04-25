import { Link, Navigate } from "react-router-dom";
import { Sparkles, Compass, Target, BookOpen, FileText, ClipboardCheck, TrendingUp, Brain, Rocket, Star, Check, ArrowRight, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const features = [
  { icon: Compass, title: "AI Career Matching", desc: "Get personalized career recommendations based on your branch, skills & interests with 90%+ accuracy." },
  { icon: Target, title: "Skill Gap Analysis", desc: "Visualize exactly what you need to learn. Compare your skills against industry-ready benchmarks." },
  { icon: BookOpen, title: "Curated Learning Paths", desc: "Top courses from Coursera, Udemy & YouTube — handpicked for your goals." },
  { icon: ClipboardCheck, title: "Mock Tests & Interviews", desc: "Practice with real-world questions, instant scoring, and AI feedback." },
  { icon: FileText, title: "ATS Resume Builder", desc: "Build recruiter-friendly resumes in minutes with live preview and templates." },
  { icon: Brain, title: "24/7 AI Mentor", desc: "Chat with your personal mentor who knows your profile, goals, and progress." },
];

const differentiators = [
  { icon: Zap, title: "Built for Indian Engineers", desc: "Tailored for Computer, Mechanical, Civil, Electrical & Electronics branches." },
  { icon: Shield, title: "Personalized, Not Generic", desc: "Every recommendation uses your branch, year, and skills — not one-size-fits-all." },
  { icon: Users, title: "Free Forever Core", desc: "No paywalls on essentials. Learn, practice, and grow without spending a rupee." },
];

const reviews = [
  { name: "Priya S.", role: "CSE, IIT Delhi", text: "CareerPilot showed me exactly what AI Engineer roles need. Landed a Microsoft internship in 4 months!", rating: 5 },
  { name: "Rahul M.", role: "Mechanical, NIT Trichy", text: "The roadmap feature is gold. I went from confused to clear in one session.", rating: 5 },
  { name: "Ananya K.", role: "ECE, BITS Pilani", text: "AI mentor feels like a senior who actually cares. Replaced 5 different apps for me.", rating: 5 },
  { name: "Vikram J.", role: "Civil, VIT Vellore", text: "Mock tests + resume builder + free courses... unreal value. Got 3 interview calls.", rating: 5 },
];

const stats = [
  { v: "50K+", l: "Students" },
  { v: "200+", l: "Career Paths" },
  { v: "1000+", l: "Curated Courses" },
  { v: "94%", l: "Match Accuracy" },
];

export default function Landing() {
  const { user, loading } = useAuth();
  const { theme, toggle } = useTheme();

  if (!loading && user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-none gradient-text">CareerPilot AI</h1>
              <p className="text-[10px] text-muted-foreground mt-1">Your Career Mentor</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link to="/auth"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/auth?mode=signup"><Button size="sm" className="bg-gradient-primary">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">AI-powered career guidance for engineers</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-6 animate-slide-up">
            Your AI Career Mentor.<br />
            <span className="gradient-text">Built for Engineers.</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up">
            Discover ideal career paths, close skill gaps, and follow personalized roadmaps to become industry-ready — all powered by AI that knows you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-gradient-primary text-base h-12 px-8 shadow-elegant glow-hover">
                Start Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-base h-12 px-8">Login</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.l} className="glass-card p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      </section>

      {/* Features */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need, <span className="gradient-text">In One Place</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From career discovery to landing offers — your complete journey, intelligently guided.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={f.title} className="glass-card p-6 glow-hover animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="py-20 px-4 md:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why <span className="gradient-text">CareerPilot</span> is Different</h2>
            <p className="text-muted-foreground">We're not another job board or course aggregator.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="glass-card p-7 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-accent mx-auto mb-4 flex items-center justify-center shadow-md">
                  <d.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How It <span className="gradient-text">Works</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Tell us about you", d: "Branch, year, skills, and interests — takes 2 minutes." },
              { n: "2", t: "Get your AI plan", d: "Personalized career matches, skill gaps, and a roadmap." },
              { n: "3", t: "Learn & track", d: "Follow courses, take tests, build resume, hit milestones." },
            ].map((s) => (
              <div key={s.n} className="glass-card p-6 text-center relative">
                <div className="w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-xl font-bold text-primary-foreground shadow-elegant">
                  {s.n}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-4 md:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by <span className="gradient-text">Engineers</span></h2>
            <p className="text-muted-foreground">Real stories from students who took control of their careers.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-warning text-warning" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative">
            <Rocket className="w-12 h-12 mx-auto mb-5 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to take off?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of engineers building careers that fit. Free to start.</p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="bg-gradient-primary text-base h-12 px-10 shadow-elegant">
                Create Your Free Account <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-5 mt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> 2-min setup</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 px-4 md:px-6 text-center text-sm text-muted-foreground">
        <p>© 2026 CareerPilot AI · Built with ❤️ for engineering students</p>
      </footer>
    </div>
  );
}
