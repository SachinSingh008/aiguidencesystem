import { useEffect, useMemo, useState, KeyboardEvent } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, ArrowRight, Loader2, Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/hooks/useProgress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const BRANCHES = ["Computer Engineering", "Information Technology", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics & Communication", "Chemical Engineering", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Recent Graduate"];

// Branch-specific suggested skills — students can also add custom ones
const SKILLS_BY_BRANCH: Record<string, string[]> = {
  "Computer Engineering": ["Python", "JavaScript", "Java", "C++", "React", "Node.js", "SQL", "MySQL", "PostgreSQL", "Git", "AWS", "Docker", "Linux", "DSA", "REST APIs", "Postman", "Selenium", "Software Testing", "JIRA", "Jest"],
  "Information Technology": ["Python", "JavaScript", "SQL", "MySQL", "Networking", "Linux", "AWS", "Cybersecurity", "Git", "React", "DevOps", "REST APIs", "Postman", "Selenium", "JIRA", "Software Testing", "DBMS"],
  "Mechanical Engineering": ["AutoCAD", "SolidWorks", "CATIA", "ANSYS", "MATLAB", "Thermodynamics", "CNC", "3D Printing", "GD&T", "Fusion 360"],
  "Civil Engineering": ["AutoCAD", "STAAD Pro", "Revit", "ETABS", "Primavera", "MS Project", "Surveying", "BIM", "GIS", "Estimation"],
  "Electrical Engineering": ["MATLAB", "Simulink", "PLC", "SCADA", "Power Systems", "AutoCAD Electrical", "ETAP", "Embedded C", "Arduino", "PCB Design"],
  "Electronics & Communication": ["VLSI", "Verilog", "MATLAB", "Embedded C", "Arduino", "Raspberry Pi", "PCB Design", "DSP", "IoT", "RF Design"],
  "Chemical Engineering": ["Aspen Plus", "MATLAB", "HYSYS", "Process Simulation", "AutoCAD", "Lab Techniques", "Six Sigma", "HAZOP"],
  "Other": ["Python", "MS Excel", "MATLAB", "AutoCAD", "Communication", "Project Management"],
};

const INTERESTS_BY_BRANCH: Record<string, string[]> = {
  "Computer Engineering": ["AI/ML", "Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity", "Data Science", "Game Dev", "Blockchain", "DevOps", "QA & Testing", "API Development", "Database Design", "Full Stack Dev"],
  "Information Technology": ["Cybersecurity", "Cloud Computing", "Data Science", "Networking", "Web Development", "DevOps", "AI/ML", "QA & Testing", "API Development", "Database Design"],
  "Mechanical Engineering": ["Automotive Design", "Robotics", "CAD/CAM", "Manufacturing", "HVAC", "Aerospace", "Product Design", "Renewable Energy"],
  "Civil Engineering": ["Structural Design", "Construction Management", "Transportation", "Smart Cities", "BIM", "Geotechnical", "Environmental"],
  "Electrical Engineering": ["Power Systems", "Renewable Energy", "Embedded Systems", "Robotics", "EV Technology", "Smart Grid", "Industrial Automation"],
  "Electronics & Communication": ["VLSI Design", "IoT", "Embedded Systems", "Robotics", "5G/Telecom", "Signal Processing", "Robotics", "Wearable Tech"],
  "Chemical Engineering": ["Process Engineering", "Petrochemicals", "Pharmaceuticals", "Environmental", "Materials", "Food Tech", "Renewable Energy"],
  "Other": ["AI/ML", "Project Management", "Research", "Entrepreneurship", "Data Analysis"],
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isReconfigure = searchParams.get("reconfigure") === "1";
  const { user, profile, loading, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "", branch: "", year: "", college: "",
    current_skills: [] as string[], interests: [] as string[],
    career_goal: "",
    phone: "", college_duration: "", experience: "", projects: "",
    college_percent: "", past_education: [] as { type: string; school: string; percentage: string }[]
  });
  const { upsert: upsertProgress, items: progressItems, loading: progressLoading } = useProgress();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (profile && !progressLoading && !initialized) {
      const resumeData = (progressItems.find(i => i.item_type === "resume_data")?.metadata as any) || {};
      setForm({
        full_name: profile.full_name || "",
        branch: profile.branch || "",
        year: profile.year || "",
        college: profile.college || "",
        current_skills: profile.current_skills || [],
        interests: profile.interests || [],
        career_goal: profile.career_goal || "",
        phone: resumeData.phone || "",
        college_duration: resumeData.college_duration || "",
        experience: resumeData.experience || "",
        projects: resumeData.projects || "",
        college_percent: resumeData.college_percent || "",
        past_education: resumeData.past_education || []
      });
      setInitialized(true);
    }
  }, [profile, progressItems, progressLoading, initialized]);


  if (!loading && !user) return <Navigate to="/auth" replace />;
  if (!loading && profile?.onboarded && !isReconfigure) return <Navigate to="/dashboard" replace />;

  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const suggestedSkills = useMemo(() => SKILLS_BY_BRANCH[form.branch] || SKILLS_BY_BRANCH["Other"], [form.branch]);
  const suggestedInterests = useMemo(() => INTERESTS_BY_BRANCH[form.branch] || INTERESTS_BY_BRANCH["Other"], [form.branch]);

  const toggle = (key: "current_skills" | "interests", val: string) => {
    setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  };

  const addCustom = (key: "current_skills" | "interests", val: string, reset: () => void) => {
    const v = val.trim();
    if (!v) return;
    setForm((f) => f[key].includes(v) ? f : { ...f, [key]: [...f[key], v] });
    reset();
  };

  const onCustomKey = (e: KeyboardEvent<HTMLInputElement>, key: "current_skills" | "interests", val: string, reset: () => void) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCustom(key, val.replace(",", ""), reset);
    }
  };

  const next = () => {
    if (step === 1 && (!form.full_name.trim() || !form.branch || !form.year)) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(step + 1);
  };

  const finish = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      branch: form.branch,
      year: form.year,
      college: form.college,
      current_skills: form.current_skills,
      interests: form.interests,
      career_goal: form.career_goal,
      onboarded: true,
    }).eq("user_id", user.id);
    if (error) {
      toast.error(`Failed to save profile: ${error.message}`);
      console.error("Profile update error:", error);
      setSaving(false);
      return;
    }

    await upsertProgress({
      item_type: "resume_data",
      item_id: "user_resume_details",
      metadata: {
        phone: form.phone,
        college_duration: form.college_duration,
        experience: form.experience,
        projects: form.projects,
        college_percent: form.college_percent,
        past_education: form.past_education
      }
    });

    // On reconfigure, wipe old AI content AND old progress data so everything
    // reflects the new profile cleanly (no stale test scores / course completions).
    if (isReconfigure) {
      await Promise.all([
        supabase.from("generated_content").delete().eq("user_id", user.id),
        supabase.from("user_progress").delete().eq("user_id", user.id).neq("item_type", "resume_data"),
      ]);
    }
    await refreshProfile();
    toast.success(isReconfigure ? "Profile updated — regenerating personalised content…" : "You're all set! Welcome aboard 🚀");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <div className="w-full max-w-2xl glass-card p-6 md:p-10 relative z-10 animate-scale-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Let's personalize CareerPilot</h1>
            <p className="text-xs text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-gradient-primary" : "bg-secondary"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold">Tell us about yourself</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5 h-11" placeholder="Arjun Sharma" />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 h-11" placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>College / University Name</Label>
                <Input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className="mt-1.5 h-11" placeholder="IIT Delhi" />
              </div>
              <div>
                <Label>Branch *</Label>
                <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select branch" /></SelectTrigger>
                  <SelectContent>{BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Year *</Label>
                <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>College Duration</Label>
                <Input value={form.college_duration} onChange={(e) => setForm({ ...form, college_duration: e.target.value })} className="mt-1.5 h-11" placeholder="e.g. 2022-2026" />
              </div>
              <div>
                <Label>College Percentage/CGPA</Label>
                <Input value={form.college_percent} onChange={(e) => setForm({ ...form, college_percent: e.target.value })} className="mt-1.5 h-11" placeholder="e.g. 8.5 CGPA" />
              </div>
            </div>

            {form.past_education.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="font-semibold text-md text-slate-800">Past Education</h3>
                {form.past_education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end p-3 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex-1 w-full">
                      <Label className="text-xs">Type</Label>
                      <Select value={edu.type} onValueChange={(v) => {
                        const next = [...form.past_education];
                        next[idx].type = v;
                        setForm({ ...form, past_education: next });
                      }}>
                        <SelectTrigger className="mt-1 h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Class 10">Class 10</SelectItem>
                          <SelectItem value="Class 12">Class 12</SelectItem>
                          <SelectItem value="Diploma">Diploma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-[2] w-full">
                      <Label className="text-xs">School / College Name</Label>
                      <Input value={edu.school} onChange={(e) => {
                        const next = [...form.past_education];
                        next[idx].school = e.target.value;
                        setForm({ ...form, past_education: next });
                      }} className="mt-1 h-9 text-sm" placeholder="School Name" />
                    </div>
                    <div className="flex-1 w-full">
                      <Label className="text-xs">Percentage</Label>
                      <Input value={edu.percentage} onChange={(e) => {
                        const next = [...form.past_education];
                        next[idx].percentage = e.target.value;
                        setForm({ ...form, past_education: next });
                      }} className="mt-1 h-9 text-sm" placeholder="e.g. 90%" />
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:bg-destructive/10"
                      onClick={() => setForm({ ...form, past_education: form.past_education.filter((_, i) => i !== idx) })}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {form.past_education.length < 3 && (
              <Button type="button" variant="outline" size="sm" className="mt-2"
                onClick={() => setForm({ ...form, past_education: [...form.past_education, { type: "", school: "", percentage: "" }] })}>
                <Plus className="w-4 h-4 mr-2" /> Add Past Education
              </Button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">What skills do you already have?</h2>
            <p className="text-sm text-muted-foreground">
              Suggestions tailored for <span className="font-medium text-foreground">{form.branch || "your branch"}</span>. Tap to select, or add your own custom skill below.
            </p>

            {form.current_skills.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-secondary/40 border border-border">
                {form.current_skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gradient-primary text-primary-foreground">
                    {s}
                    <button type="button" onClick={() => toggle("current_skills", s)} aria-label={`Remove ${s}`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map((s) => (
                <button key={s} type="button" onClick={() => toggle("current_skills", s)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${form.current_skills.includes(s) ? "bg-gradient-primary text-primary-foreground border-transparent shadow-md" : "bg-secondary border-border hover:border-primary/50"}`}>
                  {form.current_skills.includes(s) && <Check className="w-3 h-3 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>

            <div>
              <Label>Add a custom skill</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => onCustomKey(e, "current_skills", skillInput, () => setSkillInput(""))}
                  placeholder="e.g. CATIA, Revit, NX CAD, System Testing…"
                  className="h-11"
                />
                <Button type="button" variant="outline" onClick={() => addCustom("current_skills", skillInput, () => setSkillInput(""))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">Press Enter or comma to add. Add as many as you want.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">What are you interested in?</h2>
            <p className="text-sm text-muted-foreground">Pick areas you want to explore — we'll personalize your career matches and recommendations.</p>

            {form.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-secondary/40 border border-border">
                {form.interests.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gradient-primary text-primary-foreground">
                    {s}
                    <button type="button" onClick={() => toggle("interests", s)} aria-label={`Remove ${s}`}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {suggestedInterests.map((s) => (
                <button key={s} type="button" onClick={() => toggle("interests", s)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${form.interests.includes(s) ? "bg-gradient-primary text-primary-foreground border-transparent shadow-md" : "bg-secondary border-border hover:border-primary/50"}`}>
                  {form.interests.includes(s) && <Check className="w-3 h-3 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>

            <div>
              <Label>Add a custom interest</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => onCustomKey(e, "interests", interestInput, () => setInterestInput(""))}
                  placeholder="e.g. Aerospace, Smart Grid, Quality Assurance…"
                  className="h-11"
                />
                <Button type="button" variant="outline" onClick={() => addCustom("interests", interestInput, () => setInterestInput(""))}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>

            <div>
              <Label>Career Goal (optional)</Label>
              <Input value={form.career_goal} onChange={(e) => setForm({ ...form, career_goal: e.target.value })} className="mt-1.5 h-11" placeholder="e.g. Become an AI Engineer / Site Engineer at L&T / Design Engineer at Tata Motors" />
            </div>

            <div className="border-t border-border/50 pt-5 mt-5">
              <h3 className="font-semibold text-lg mb-4">Resume Details (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Experience</Label>
                  <Textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="mt-1.5" rows={3} placeholder="E.g., Intern at TechCorp (2024)..." />
                </div>
                <div>
                  <Label>Projects</Label>
                  <Textarea value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} className="mt-1.5" rows={3} placeholder="E.g., 1. Smart Resume Parser using NLP..." />
                </div>
              </div>
            </div>
          </div>
        )}


        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</Button>
          {step < 3 ? (
            <Button onClick={next} className="bg-gradient-primary">Next <ArrowRight className="w-4 h-4 ml-2" /></Button>
          ) : (
            <Button onClick={finish} disabled={saving} className="bg-gradient-primary shadow-elegant">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Finish <Check className="w-4 h-4 ml-2" /></>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
