import { useEffect, useMemo, useState, KeyboardEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Loader2, Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const BRANCHES = ["Computer Engineering", "Information Technology", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics & Communication", "Chemical Engineering", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Recent Graduate"];

// Branch-specific suggested skills — students can also add custom ones
const SKILLS_BY_BRANCH: Record<string, string[]> = {
  "Computer Engineering": ["Python", "JavaScript", "Java", "C++", "React", "Node.js", "SQL", "Git", "AWS", "Docker", "Linux", "DSA"],
  "Information Technology": ["Python", "JavaScript", "SQL", "Networking", "Linux", "AWS", "Cybersecurity", "Git", "React", "DevOps"],
  "Mechanical Engineering": ["AutoCAD", "SolidWorks", "CATIA", "ANSYS", "MATLAB", "Thermodynamics", "CNC", "3D Printing", "GD&T", "Fusion 360"],
  "Civil Engineering": ["AutoCAD", "STAAD Pro", "Revit", "ETABS", "Primavera", "MS Project", "Surveying", "BIM", "GIS", "Estimation"],
  "Electrical Engineering": ["MATLAB", "Simulink", "PLC", "SCADA", "Power Systems", "AutoCAD Electrical", "ETAP", "Embedded C", "Arduino", "PCB Design"],
  "Electronics & Communication": ["VLSI", "Verilog", "MATLAB", "Embedded C", "Arduino", "Raspberry Pi", "PCB Design", "DSP", "IoT", "RF Design"],
  "Chemical Engineering": ["Aspen Plus", "MATLAB", "HYSYS", "Process Simulation", "AutoCAD", "Lab Techniques", "Six Sigma", "HAZOP"],
  "Other": ["Python", "MS Excel", "MATLAB", "AutoCAD", "Communication", "Project Management"],
};

const INTERESTS_BY_BRANCH: Record<string, string[]> = {
  "Computer Engineering": ["AI/ML", "Web Development", "Mobile Apps", "Cloud Computing", "Cybersecurity", "Data Science", "Game Dev", "Blockchain", "DevOps"],
  "Information Technology": ["Cybersecurity", "Cloud Computing", "Data Science", "Networking", "Web Development", "DevOps", "AI/ML"],
  "Mechanical Engineering": ["Automotive Design", "Robotics", "CAD/CAM", "Manufacturing", "HVAC", "Aerospace", "Product Design", "Renewable Energy"],
  "Civil Engineering": ["Structural Design", "Construction Management", "Transportation", "Smart Cities", "BIM", "Geotechnical", "Environmental"],
  "Electrical Engineering": ["Power Systems", "Renewable Energy", "Embedded Systems", "Robotics", "EV Technology", "Smart Grid", "Industrial Automation"],
  "Electronics & Communication": ["VLSI Design", "IoT", "Embedded Systems", "Robotics", "5G/Telecom", "Signal Processing", "Robotics", "Wearable Tech"],
  "Chemical Engineering": ["Process Engineering", "Petrochemicals", "Pharmaceuticals", "Environmental", "Materials", "Food Tech", "Renewable Energy"],
  "Other": ["AI/ML", "Project Management", "Research", "Entrepreneurship", "Data Analysis"],
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "", branch: "", year: "", college: "",
    current_skills: [] as string[], interests: [] as string[],
    career_goal: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        branch: profile.branch || "",
        year: profile.year || "",
        college: profile.college || "",
        current_skills: profile.current_skills || [],
        interests: profile.interests || [],
        career_goal: profile.career_goal || "",
      });
    }
  }, [profile]);

  if (!loading && !user) return <Navigate to="/auth" replace />;
  if (!loading && profile?.onboarded) return <Navigate to="/dashboard" replace />;

  const toggle = (key: "current_skills" | "interests", val: string) => {
    setForm((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
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
      ...form,
      onboarded: true,
    }).eq("user_id", user.id);
    if (error) {
      toast.error("Failed to save profile");
      setSaving(false);
      return;
    }
    await refreshProfile();
    toast.success("You're all set! Welcome aboard 🚀");
    navigate("/dashboard");
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
            <div>
              <Label>Full Name *</Label>
              <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1.5 h-11" placeholder="Arjun Sharma" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Branch *</Label>
                <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select branch" /></SelectTrigger>
                  <SelectContent>{BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year *</Label>
                <Select value={form.year} onValueChange={(v) => setForm({ ...form, year: v })}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>College / University</Label>
              <Input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className="mt-1.5 h-11" placeholder="IIT Delhi" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">What skills do you already have?</h2>
            <p className="text-sm text-muted-foreground">Select all that apply. Don't worry, you can add more later.</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(s => (
                <button key={s} type="button" onClick={() => toggle("current_skills", s)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${form.current_skills.includes(s) ? "bg-gradient-primary text-primary-foreground border-transparent shadow-md" : "bg-secondary border-border hover:border-primary/50"}`}>
                  {form.current_skills.includes(s) && <Check className="w-3 h-3 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <h2 className="text-xl font-semibold">What are you interested in?</h2>
            <p className="text-sm text-muted-foreground">Pick areas you want to explore — we'll personalize your career matches.</p>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(s => (
                <button key={s} type="button" onClick={() => toggle("interests", s)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${form.interests.includes(s) ? "bg-gradient-primary text-primary-foreground border-transparent shadow-md" : "bg-secondary border-border hover:border-primary/50"}`}>
                  {form.interests.includes(s) && <Check className="w-3 h-3 inline mr-1" />}
                  {s}
                </button>
              ))}
            </div>
            <div>
              <Label>Career Goal (optional)</Label>
              <Input value={form.career_goal} onChange={(e) => setForm({ ...form, career_goal: e.target.value })} className="mt-1.5 h-11" placeholder="e.g. Become an AI Engineer at a top firm" />
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
