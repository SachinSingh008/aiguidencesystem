import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Download, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function Resume() {
  const { profile } = useAuth();
  const { items: progressItems } = useProgress();
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
    if (profile) {
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

        return {
          ...d,
          name: d.name || profile.full_name || "",
          email: d.email || profile.email || "",
          phone: resumeData.phone || d.phone,
          skills: d.skills || (profile.current_skills || []).join(", "),
          education: d.education === "B.Tech, XYZ University (2022-2026), CGPA: 8.7" ? (defaultEdu || d.education) : d.education,
          summary: d.summary === "Aspiring engineer with strong fundamentals and a passion for building real-world solutions." 
            ? (profile.career_goal ? `Aspiring ${profile.career_goal}. ${d.summary}` : d.summary) 
            : d.summary,
          experience: resumeData.experience || "",
          projects: resumeData.projects || "",
        };
      });
    }
  }, [profile, progressItems]);

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = margin;

    const writeLine = (text: string, opts: { size?: number; bold?: boolean; gap?: number; color?: [number, number, number] } = {}) => {
      doc.setFont("helvetica", opts.bold ? "bold" : "normal");
      doc.setFontSize(opts.size ?? 11);
      doc.setTextColor(...(opts.color ?? [30, 30, 30]));
      const lines = doc.splitTextToSize(text, pageWidth - margin * 2) as string[];
      lines.forEach((ln) => {
        if (y > 800) {
          doc.addPage();
          y = margin;
        }
        doc.text(ln, margin, y);
        y += (opts.size ?? 11) * 1.25;
      });
      y += opts.gap ?? 0;
    };

    const sectionHeader = (title: string) => {
      y += 6;
      doc.setDrawColor(30, 30, 30);
      doc.setLineWidth(0.5);
      writeLine(title.toUpperCase(), { size: 11, bold: true, gap: 2 });
      doc.line(margin, y - 2, pageWidth - margin, y - 2);
      y += 6;
    };

    // Header
    writeLine(data.name || "Your Name", { size: 22, bold: true });
    writeLine(`${data.email}  •  ${data.phone}`, { size: 10, color: [90, 90, 90], gap: 4 });
    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    sectionHeader("Summary");
    writeLine(data.summary);

    sectionHeader("Education");
    writeLine(data.education);

    sectionHeader("Skills");
    writeLine(data.skills);

    if (data.experience) {
      sectionHeader("Experience");
      writeLine(data.experience);
    }

    if (data.projects) {
      sectionHeader("Projects");
      writeLine(data.projects);
    }

    const filename = `${(data.name || "resume").replace(/\s+/g, "_")}_resume.pdf`;
    doc.save(filename);
    toast.success("Resume downloaded as PDF");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">AI Resume Builder</h1>
          <p className="text-muted-foreground mt-1">ATS-friendly resume tailored to your career path</p>
        </div>
        <div className="flex gap-2">
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
          <div><Label>Summary</Label><Textarea rows={3} value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} /></div>
          <div><Label>Skills (comma-separated)</Label><Input value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} /></div>
          <div><Label>Experience</Label><Textarea rows={4} value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} /></div>
          <div><Label>Projects</Label><Textarea rows={4} value={data.projects} onChange={(e) => setData({ ...data, projects: e.target.value })} /></div>
          <div><Label>Education</Label><Textarea rows={2} value={data.education} onChange={(e) => setData({ ...data, education: e.target.value })} /></div>
        </Card>

        <Card className="bg-white text-slate-900 p-8 border-border/50 shadow-elegant overflow-auto">
          <div className="border-b-2 border-slate-900 pb-3">
            <h1 className="text-3xl font-bold">{data.name || "Your Name"}</h1>
            <p className="text-sm text-slate-600 mt-1">{data.email} • {data.phone}</p>
          </div>
          <section className="mt-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Summary</h2>
            <p className="text-sm">{data.summary}</p>
          </section>
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Education</h2>
            <p className="text-sm whitespace-pre-line">{data.education}</p>
          </section>
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((s, i) => s.trim() && (
                <span key={i} className="text-xs px-2 py-0.5 bg-slate-200 rounded">{s.trim()}</span>
              ))}
            </div>
          </section>
          {data.experience && (
            <section className="mt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Experience</h2>
              <p className="text-sm whitespace-pre-line">{data.experience}</p>
            </section>
          )}
          {data.projects && (
            <section className="mt-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1 mb-2">Projects</h2>
              <p className="text-sm whitespace-pre-line">{data.projects}</p>
            </section>
          )}
        </Card>
      </div>
    </div>
  );
}
