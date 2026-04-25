import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { userProfile } from "@/lib/mockData";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
      </div>

      <Card className="glass-card p-6 border-border/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {userProfile.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-muted-foreground text-sm">{userProfile.branch} • {userProfile.year}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>Full Name</Label><Input defaultValue={userProfile.name} className="mt-1.5" /></div>
          <div><Label>Email</Label><Input defaultValue={userProfile.email} className="mt-1.5" /></div>
          <div><Label>Branch</Label><Input defaultValue={userProfile.branch} className="mt-1.5" /></div>
          <div><Label>Year</Label><Input defaultValue={userProfile.year} className="mt-1.5" /></div>
        </div>
        <div className="mt-4">
          <Label>Skills</Label>
          <Input defaultValue={userProfile.skills.join(", ")} className="mt-1.5" />
        </div>
        <div className="mt-4">
          <Label>Career Goals</Label>
          <Input defaultValue={userProfile.goals.join(", ")} className="mt-1.5" />
        </div>
        <Button className="mt-6 bg-gradient-primary">Save Changes</Button>
      </Card>

      <Card className="glass-card p-6 border-border/50">
        <h2 className="font-bold text-xl mb-4">Preferences</h2>
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
    </div>
  );
}
