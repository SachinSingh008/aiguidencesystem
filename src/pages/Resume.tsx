import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, Sparkles, FileText } from "lucide-react";
import { userProfile } from "@/lib/mockData";
import { toast } from "sonner";

export default function Resume() {
  const [data, setData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: "+91 98765 43210",
    summary: "Aspiring AI Engineer with strong foundation in Python, ML, and full-stack development. Passionate about building intelligent systems that solve real-world problems.",
    skills: userProfile.skills.join(", "),
    experience: "AI Research Intern at TechCorp (2024)\n- Built ML models for predictive analytics\n- Improved model accuracy by 23%",
    projects: "1. Smart Resume Parser using NLP\n2. Real-time Object Detection App\n3. E-commerce Recommendation Engine",
    education: "B.Tech Computer Engineering, XYZ University (2022-2026), CGPA: 8.7",
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-muted-foreground mt-1">ATS-friendly resume tailored to your career path</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("AI suggestions applied!")}>
            <Sparkles className="w-4 h-4 mr-2" /> AI Enhance
          </Button>
          <Button onClick={() => toast.success("Resume downloaded!")} className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card className="glass-card p-6 border-border/50 space-y-4">
          <h2 className="font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> Edit Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Name</Label><Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} /></div>
          </div>
          <div><Label>Email</Label><Input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} /></div>
          <div><Label>Summary</Label><Textarea rows={3} value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} /></div>
          <div><Label>Skills (comma-separated)</Label><Input value={data.skills} onChange={e => setData({ ...data, skills: e.target.value })} /></div>
          <div><Label>Experience</Label><Textarea rows={4} value={data.experience} onChange={e => setData({ ...data, experience: e.target.value })} /></div>
          <div><Label>Projects</Label><Textarea rows={4} value={data.projects} onChange={e => setData({ ...data, projects: e.target.value })} /></div>
          <div><Label>Education</Label><Textarea rows={2} value={data.education} onChange={e => setData({ ...data, education: e.target.value })} /></div>
        </Card>

        {/* Preview */}
        <Card className="bg-white text-slate-900 p-8 border-border/50 shadow-elegant overflow-auto">
          <div className="border-b-2 border-slate-900 pb-3">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-sm text-slate-600 mt-1">{data.email} • {data.phone}</p>
          </div>

          <section className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Summary</h2>
            <p className="text-sm">{data.summary}</p>
          </section>

          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((s, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-slate-200 rounded">{s.trim()}</span>
              ))}
            </div>
          </section>

          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Experience</h2>
            <p className="text-sm whitespace-pre-line">{data.experience}</p>
          </section>

          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Projects</h2>
            <p className="text-sm whitespace-pre-line">{data.projects}</p>
          </section>

          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Education</h2>
            <p className="text-sm whitespace-pre-line">{data.education}</p>
          </section>
        </Card>
      </div>
    </div>
  );
}
