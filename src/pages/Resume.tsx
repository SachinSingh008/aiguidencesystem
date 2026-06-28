import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, FileText, Save, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { smartRequest } from "@/hooks/useAIContent";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { supabase } from "@/integrations/supabase/client";

const formatText = (text: string) => {
  return text.split('\n').map((line, i) => {
    const l = line.trim();
    if (!l) return <div key={i} className="h-1"></div>;
    
    if (l.startsWith('- ') || l.startsWith('• ') || l.startsWith('* ')) {
      return (
        <div key={i} className="flex gap-2 mb-1 pl-2 text-slate-700">
          <span className="text-slate-400">•</span>
          <span className="flex-1 leading-relaxed">{l.substring(2)}</span>
        </div>
      );
    }
    
    if (l.includes(" | ")) {
      const parts = l.split(" | ");
      return (
        <div key={i} className="font-semibold text-slate-900 mt-3 mb-1.5 text-base">
          {parts[0]} <span className="font-normal text-slate-500 text-sm">| {parts.slice(1).join(" | ")}</span>
        </div>
      );
    }
    
    // Bold specific lines if they look like standalone titles without |
    if (l.length < 50 && !l.includes(".") && !l.includes(",")) {
       return <div key={i} className="font-semibold text-slate-900 mt-2 mb-1">{l}</div>;
    }
    
    return <div key={i} className="mb-1 leading-relaxed text-slate-700">{l}</div>;
  });
};

export default function Resume() {
  const { profile, user, refreshProfile } = useAuth();
  const { upsert: upsertProgress, items: progressItems, loading: progressLoading } = useProgress();
  const [saving, setSaving] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "+91 98765 43210",
    summary: "Aspiring engineer with strong fundamentals and a passion for building real-world solutions.",
    skills: "",
    experience: "",
    projects: "",
    education: "B.Tech, XYZ University (2022-2026), CGPA: 8.7",
  });

  useEffect(() => {
    if (profile && !progressLoading && !initialized) {
      const resumeData = (progressItems.find(i => i.item_type === "resume_data")?.metadata as any) || {};
      
      setData((d) => {
        const branchYear = `${profile.branch ?? ""} ${profile.year ?? ""}`.trim();
        const collegeExt = profile.college ? `, ${profile.college}` : "";
        const durExt = resumeData.college_duration ? `, ${resumeData.college_duration}` : "";
        const collegePercent = resumeData.college_percent ? ` (CGPA/Percentage: ${resumeData.college_percent})` : "";
        let defaultEdu = `${branchYear}${collegeExt}${durExt}${collegePercent}`.trim();

        if (Array.isArray(resumeData.past_education)) {
          resumeData.past_education.forEach((edu: any) => {
            if (edu.type && edu.school) {
              defaultEdu += `\n${edu.type} - ${edu.school}${edu.percentage ? ` (${edu.percentage})` : ""}`;
            }
          });
        }

        const placeholderEdu = "B.Tech, XYZ University (2022-2026), CGPA: 8.7";
        const placeholderSummary = "Aspiring engineer with strong fundamentals and a passion for building real-world solutions.";
        
        const isCustomEduDefault = !resumeData.custom_education || resumeData.custom_education === placeholderEdu;
        const isCustomSummaryDefault = !resumeData.custom_summary || resumeData.custom_summary === placeholderSummary;

        return {
          ...d,
          name: d.name || profile.full_name || "",
          email: d.email || profile.email || "",
          phone: resumeData.phone || d.phone,
          skills: d.skills || (profile.current_skills || []).join(", "),
          education: isCustomEduDefault ? (defaultEdu || d.education) : resumeData.custom_education,
          summary: isCustomSummaryDefault
            ? (profile.career_goal ? `Aspiring ${profile.career_goal}. ${placeholderSummary}` : placeholderSummary) 
            : resumeData.custom_summary,
          experience: resumeData.experience || "",
          projects: resumeData.projects || "",
        };
      });
      setInitialized(true);
    }
  }, [profile, progressItems, progressLoading, initialized]);


  const generateSummary = async () => {
    setGeneratingSummary(true);
    try {
      const prompt = `You are an expert resume writer. Write a short, professional, and impactful 2-3 sentence resume summary for this person:
Name: ${data.name}
Goal: ${profile?.career_goal || "Aspiring engineer"}
Skills: ${data.skills}
Experience: ${data.experience || "Entry-level"}
Focus strictly on their strengths.
Return ONLY valid JSON like this: {"summary": "your generated summary here"}`;

      const raw = await smartRequest(prompt, 300);
      const obj = JSON.parse(raw);
      if (obj.summary) {
        setData(d => ({ ...d, summary: obj.summary }));
        toast.success("AI Summary generated successfully!");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err: any) {
      toast.error("Failed to generate summary: " + err.message);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const saveResume = async () => {
    if (!user) return;
    setSaving(true);
    await upsertProgress({
      item_type: "resume_data",
      item_id: "user_resume_details",
      metadata: {
        phone: data.phone,
        experience: data.experience,
        projects: data.projects,
        custom_education: data.education,
        custom_summary: data.summary,
      }
    });

    const { error } = await supabase.from("profiles").update({
      current_skills: data.skills.split(",").map(s => s.trim()).filter(Boolean),
    }).eq("user_id", user.id);

    if (!error) {
      await refreshProfile();
      toast.success("Resume details saved successfully");
    } else {
      toast.error("Failed to save resume details");
    }
    setSaving(false);
  };

  const downloadPdf = async () => {
    const originalEl = document.getElementById("resume-preview");
    if (!originalEl) return;
    
    try {
      // Clone the element to render it properly without screen constraints
      const clone = originalEl.cloneNode(true) as HTMLElement;
      clone.style.position = "absolute";
      clone.style.left = "-9999px";
      clone.style.top = "0";
      clone.style.width = "800px"; // Fixed A4-like width
      clone.style.height = "auto";
      clone.style.overflow = "visible";
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: 800,
      });
      
      document.body.removeChild(clone);
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      
      const filename = `${(data.name || "resume").replace(/\s+/g, "_")}_resume.pdf`;
      pdf.save(filename);
      toast.success("Resume downloaded as PDF");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-muted-foreground mt-1">ATS-friendly resume tailored to your career path</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveResume} disabled={saving} variant="outline" className="border-primary text-primary hover:bg-primary/10">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
          <Button onClick={downloadPdf} className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6 border-border/50 space-y-4">
          <h2 className="font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> Edit Details</h2>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Name</Label><Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} /></div>
          </div>
          <div><Label>Email</Label><Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} /></div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label>Summary</Label>
              <Button type="button" variant="ghost" size="sm" onClick={generateSummary} disabled={generatingSummary} className="h-6 text-xs text-primary hover:text-primary">
                {generatingSummary ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                Generate with AI
              </Button>
            </div>
            <Textarea rows={3} value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
          </div>
          <div><Label>Skills (comma-separated)</Label><Input value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} /></div>
          <div><Label>Experience</Label><Textarea rows={4} value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} /></div>
          <div><Label>Projects</Label><Textarea rows={4} value={data.projects} onChange={(e) => setData({ ...data, projects: e.target.value })} /></div>
          <div><Label>Education</Label><Textarea rows={2} value={data.education} onChange={(e) => setData({ ...data, education: e.target.value })} /></div>
        </Card>

        <Card id="resume-preview" className="bg-white text-slate-900 p-8 border-border/50 shadow-elegant overflow-visible h-max">
          <div className="border-b-2 border-slate-900 pb-3">
            <h1 className="text-3xl font-bold tracking-tight">{data.name || "Your Name"}</h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">{data.email} • {data.phone}</p>
          </div>
          <section className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-3">Summary</h2>
            <div className="text-sm text-slate-700 leading-relaxed">{formatText(data.summary)}</div>
          </section>
          <section className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((s, i) => s.trim() && (
                <span key={i} className="text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-md font-medium">{s.trim()}</span>
              ))}
            </div>
          </section>
          {data.experience && (
            <section className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Experience</h2>
              <div className="text-sm">{formatText(data.experience)}</div>
            </section>
          )}
          {data.projects && (
            <section className="mt-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Projects</h2>
              <div className="text-sm">{formatText(data.projects)}</div>
            </section>
          )}
          <section className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Education</h2>
            <div className="text-sm">{formatText(data.education)}</div>
          </section>
        </Card>
      </div>
    </div>
  );
}
