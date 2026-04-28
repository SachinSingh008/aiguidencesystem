import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type GenCareerPath = {
  id: string;
  title: string;
  icon: string;
  match: number;
  description: string;
  salary: string;
  growth: string;
  skills: string[];
  roadmap: { step: number; title: string; status: "complete" | "in-progress" | "upcoming"; duration: string; resources: { label: string; url: string }[] }[];
};
export type GenCourse = {
  id: number; title: string; platform: string; instructor: string; duration: string;
  difficulty: string; rating: number; students: string; url: string; category: string;
};
export type GenVideoLecture = { id: number; title: string; channel: string; duration: string; url: string; topic: string };
export type GenStudyMaterial = { id: number; title: string; type: "Notes" | "Cheat Sheet" | "eBook" | "Video Series" | "Documentation"; subject: string; branch: string; url: string };
export type GenMockTest = { id: number; title: string; topic: string; difficulty: string; duration: string; questions: { q: string; options: string[]; answer: number }[] };
export type GenSkillGap = { skill: string; current: number; required: number; status: "missing" | "in-progress" | "complete" };

export type GeneratedContent = {
  careerPaths: GenCareerPath[];
  courses: GenCourse[];
  videoLectures: GenVideoLecture[];
  studyMaterials: GenStudyMaterial[];
  mockTests: GenMockTest[];
  skillGaps: GenSkillGap[];
};

const EMPTY: GeneratedContent = { careerPaths: [], courses: [], videoLectures: [], studyMaterials: [], mockTests: [], skillGaps: [] };

function fingerprintOf(p: { branch?: string | null; year?: string | null; current_skills?: string[] | null; interests?: string[] | null; career_goal?: string | null }) {
  return JSON.stringify({
    b: p.branch || "",
    y: p.year || "",
    s: [...(p.current_skills || [])].sort(),
    i: [...(p.interests || [])].sort(),
    g: p.career_goal || "",
  });
}

type Ctx = {
  content: GeneratedContent;
  loading: boolean;
  generating: boolean;
  stale: boolean;
  regenerate: () => Promise<void>;
};

const GeneratedContentContext = createContext<Ctx>({
  content: EMPTY, loading: true, generating: false, stale: false, regenerate: async () => {},
});

export function GeneratedContentProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();
  const [content, setContent] = useState<GeneratedContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [storedFingerprint, setStoredFingerprint] = useState<string | null>(null);
  const triedAuto = useRef<string | null>(null);

  const currentFingerprint = useMemo(
    () => (profile ? fingerprintOf(profile) : ""),
    [profile?.branch, profile?.year, profile?.current_skills, profile?.interests, profile?.career_goal]
  );

  const stale = !!profile?.onboarded && !!storedFingerprint && storedFingerprint !== currentFingerprint;

  const load = useCallback(async () => {
    if (!user) {
      setContent(EMPTY); setLoading(false); return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("generated_content")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    if (data?.content) {
      setContent({ ...EMPTY, ...(data.content as any) });
      setStoredFingerprint(data.fingerprint);
    } else {
      setContent(EMPTY);
      setStoredFingerprint(null);
    }
    setLoading(false);
  }, [user]);

  const regenerate = useCallback(async () => {
    if (!user || !profile?.branch) return;
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-content", {
        body: { profile },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const fresh = (data as any).content as GeneratedContent;
      const fp = fingerprintOf(profile);
      const { error: upErr } = await supabase
        .from("generated_content")
        .upsert({
          user_id: user.id,
          fingerprint: fp,
          branch: profile.branch,
          year: profile.year,
          skills: profile.current_skills,
          interests: profile.interests,
          career_goal: profile.career_goal,
          content: fresh as any,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      if (upErr) throw upErr;
      setContent({ ...EMPTY, ...fresh });
      setStoredFingerprint(fp);
      toast.success("Personalised content updated for your profile");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to generate content");
    } finally {
      setGenerating(false);
    }
  }, [user, profile]);

  useEffect(() => { load(); }, [load]);

  // Auto-generate first time after onboarding (or when profile changes), only once per fingerprint
  useEffect(() => {
    if (loading || generating || !user || !profile?.onboarded) return;
    const needsGen = !storedFingerprint || storedFingerprint !== currentFingerprint;
    if (needsGen && triedAuto.current !== currentFingerprint) {
      triedAuto.current = currentFingerprint;
      regenerate();
    }
  }, [loading, generating, user, profile?.onboarded, storedFingerprint, currentFingerprint, regenerate]);

  return (
    <GeneratedContentContext.Provider value={{ content, loading, generating, stale, regenerate }}>
      {children}
    </GeneratedContentContext.Provider>
  );
}

export const useGeneratedContent = () => useContext(GeneratedContentContext);
