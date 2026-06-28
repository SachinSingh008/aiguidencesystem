import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Moon, Sun, LogOut, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAIContent } from "@/hooks/useAIContent";
import { useProgress } from "@/hooks/useProgress";
import { Textarea } from "@/components/ui/textarea";

const BRANCHES = ["Computer Engineering", "Information Technology", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics & Communication", "Chemical Engineering", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Recent Graduate"];

export default function Settings() {
  const { profile, user, refreshProfile, signOut } = useAuth();
  const { clearCache } = useAIContent();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "", branch: "", year: "", college: "",
    current_skills: "", interests: "", career_goal: "",
    phone: "", college_duration: "", experience: "", projects: "",
    college_percent: "", past_education: [] as { type: string; school: string; percentage: string }[]
  });
  const { upsert: upsertProgress, items: progressItems } = useProgress();

  useEffect(() => {
    if (profile) {
      const resumeData = (progressItems.find(i => i.item_type === "resume_data")?.metadata as any) || {};
      setForm({
        full_name: profile.full_name || "",
        branch: profile.branch || "",
        year: profile.year || "",
        college: profile.college || "",
        current_skills: (profile.current_skills || []).join(", "),
        interests: (profile.interests || []).join(", "),
        career_goal: profile.career_goal || "",
        phone: resumeData.phone || "",
        college_duration: resumeData.college_duration || "",
        experience: resumeData.experience || "",
        projects: resumeData.projects || "",
        college_percent: resumeData.college_percent || "",
        past_education: resumeData.past_education || []
      });
    }
  }, [profile, progressItems]);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      branch: form.branch,
      year: form.year,
      college: form.college,
      current_skills: form.current_skills.split(",").map(s => s.trim()).filter(Boolean),
      interests: form.interests.split(",").map(s => s.trim()).filter(Boolean),
      career_goal: form.career_goal,
    }).eq("user_id", user.id);
    if (error) {
      toast.error("Save failed");
    } else {
      // Save resume details to user_progress
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

      // Reset all personalised data so everything regenerates for the new profile
      clearCache();
      await Promise.all([
        supabase.from("user_progress").delete().eq("user_id", user.id),
        supabase.from("chat_history").delete().eq("user_id", user.id),
      ]);
      await refreshProfile();
      toast.success("Profile saved — regenerating personalised content…");
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = (profile?.full_name || profile?.email || "U").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
      </div>

      <Card className="glass-card p-6 border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile?.full_name || "User"}</h2>
            <p className="text-muted-foreground text-sm">{profile?.branch} {profile?.year && `• ${profile.year}`}</p>
            <p className="text-xs text-muted-foreground mt-1">{profile?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} className="mt-1.5" /></div>
          <div><Label>Phone Number</Label><Input placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="mt-1.5" /></div>
          <div><Label>College / University Name</Label><Input value={form.college} onChange={e => setForm({...form, college: e.target.value})} className="mt-1.5" /></div>
          <div>
            <Label>Branch</Label>
            <Select value={form.branch} onValueChange={v => setForm({...form, branch: v})}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{BRANCHES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Year</Label>
            <Select value={form.year} onValueChange={v => setForm({...form, year: v})}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>College Duration</Label><Input placeholder="e.g. 2022-2026" value={form.college_duration} onChange={e => setForm({...form, college_duration: e.target.value})} className="mt-1.5" /></div>
          <div><Label>College Percentage/CGPA</Label><Input placeholder="e.g. 8.5 CGPA" value={form.college_percent} onChange={e => setForm({...form, college_percent: e.target.value})} className="mt-1.5" /></div>
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
          <Button type="button" variant="outline" size="sm" className="mt-4"
            onClick={() => setForm({ ...form, past_education: [...form.past_education, { type: "", school: "", percentage: "" }] })}>
            <Plus className="w-4 h-4 mr-2 inline" /> Add Past Education
          </Button>
        )}
        <div className="mt-4">
          <Label>Skills (comma-separated)</Label>
          <Input value={form.current_skills} onChange={e => setForm({...form, current_skills: e.target.value})} className="mt-1.5" />
        </div>
        <div className="mt-4">
          <Label>Interests (comma-separated)</Label>
          <Input value={form.interests} onChange={e => setForm({...form, interests: e.target.value})} className="mt-1.5" />
        </div>
        <div className="mt-4">
          <Label>Career Goal</Label>
          <Input value={form.career_goal} onChange={e => setForm({...form, career_goal: e.target.value})} className="mt-1.5" />
        </div>
        
        <div className="mt-6 border-t border-border/50 pt-6">
          <h3 className="font-semibold text-lg mb-4">Resume Details (Optional)</h3>
          <div className="space-y-4">
            <div>
              <Label>Experience</Label>
              <Textarea placeholder="E.g., Intern at TechCorp (2024)..." rows={3} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} className="mt-1.5" />
            </div>
            <div>
              <Label>Projects</Label>
              <Textarea placeholder="E.g., 1. Smart Resume Parser using NLP..." rows={3} value={form.projects} onChange={e => setForm({...form, projects: e.target.value})} className="mt-1.5" />
            </div>
          </div>
        </div>
        <Button onClick={save} disabled={saving} className="mt-6 bg-gradient-primary">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
        </Button>
      </Card>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="font-bold text-xl mb-4">Appearance</h2>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setTheme("dark")}
            className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${theme === "dark" ? "border-primary bg-primary/10" : "border-border"}`}>
            <Moon className="w-5 h-5" />
            <span className="font-medium">Dark</span>
          </button>
          <button onClick={() => setTheme("light")}
            className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${theme === "light" ? "border-primary bg-primary/10" : "border-border"}`}>
            <Sun className="w-5 h-5" />
            <span className="font-medium">Light</span>
          </button>
        </div>
      </Card>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="font-bold text-xl mb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            { label: "Email Notifications", desc: "Get updates on new courses and milestones" },
            { label: "Weekly Progress Report", desc: "Receive a weekly summary of your learning" },
            { label: "Learning Reminders", desc: "Daily streak reminders" },
            { label: "AI Mentor Tips", desc: "Personalized tips from CareerPilot AI" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">{p.label}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
              <Switch defaultChecked={i < 3} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="glass-card p-6 border-destructive/30">
        <h2 className="font-bold text-xl mb-2">Account</h2>
        <p className="text-sm text-muted-foreground mb-4">Sign out of CareerPilot on this device.</p>
        <Button onClick={handleSignOut} variant="destructive">
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </Button>
      </Card>
    </div>
  );
}
