import {
  createContext, useCallback, useContext, useEffect,
  useMemo, useRef, useState, ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
export type GenCareerPath = {
  id: string; title: string; icon: string; match: number;
  description: string; salary: string; growth: string; skills: string[];
  roadmap: {
    step: number; title: string;
    status: "complete" | "in-progress" | "upcoming";
    duration: string; resources: { label: string; url: string }[];
  }[];
};
export type GenCourse = {
  id: number; title: string; platform: string; instructor: string;
  duration: string; difficulty: string; rating: number;
  students: string; url: string; category: string;
};
export type GenVideoLecture = {
  id: number; title: string; channel: string; duration: string; url: string; topic: string;
};
export type GenStudyMaterial = {
  id: number; title: string;
  type: "Notes" | "Cheat Sheet" | "eBook" | "Video Series" | "Documentation";
  subject: string; branch: string; url: string;
};
export type GenMockTest = {
  id: number; title: string; topic: string; difficulty: string; duration: string;
  questions: { q: string; options: string[]; answer: number }[];
};
export type GenSkillGap = {
  skill: string; current: number; required: number;
  status: "missing" | "in-progress" | "complete";
};
export type GeneratedContent = {
  careerPaths: GenCareerPath[];
  courses: GenCourse[];
  videoLectures: GenVideoLecture[];
  studyMaterials: GenStudyMaterial[];
  mockTests: GenMockTest[];
  skillGaps: GenSkillGap[];
};

const EMPTY: GeneratedContent = {
  careerPaths: [], courses: [], videoLectures: [],
  studyMaterials: [], mockTests: [], skillGaps: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
/** True only if at least one array in the content object has items */
function hasRealContent(c: any): boolean {
  if (!c || typeof c !== "object") return false;
  return Object.values(c).some((v: any) => Array.isArray(v) && v.length > 0);
}

/** Which parts (1/2/3) are completely missing from loaded content */
function findMissingParts(c: GeneratedContent): Array<1 | 2 | 3> {
  const missing: Array<1 | 2 | 3> = [];
  if (!c.careerPaths.length && !c.skillGaps.length) missing.push(1);
  if (!c.courses.length) missing.push(2);  // courses alone determines if Part 2 needs refill
  if (!c.mockTests.length) missing.push(3);
  return missing;
}

function fingerprintOf(p: {
  branch?: string | null; year?: string | null;
  current_skills?: string[] | null; interests?: string[] | null;
  career_goal?: string | null;
}) {
  return JSON.stringify({
    b: p.branch || "", y: p.year || "",
    s: [...(p.current_skills || [])].sort(),
    i: [...(p.interests || [])].sort(),
    g: p.career_goal || "",
  });
}

// ─── Network ──────────────────────────────────────────────────────────────────
const AI_FUNCTION_URL =
  "https://llwcgntzjzwlksnfknsj.supabase.co/functions/v1/generate-content";
const AI_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsd2NnbnR6anp3bGtzbmZrbnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzI3OTksImV4cCI6MjA5MjkwODc5OX0.xNPK8J4oPEJn97bf9wK3IqJudzpYjOP55wgFk_b75oI";

async function fetchPart(
  profile: any, part: 1 | 2 | 3,
  testHistory?: { topic: string; score: number }[],
): Promise<Partial<GeneratedContent>> {
  const res = await fetch(AI_FUNCTION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AI_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile, part, testHistory }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
  if (data?.error) throw new Error(data.error);
  return (data.content ?? {}) as Partial<GeneratedContent>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
type Ctx = {
  content: GeneratedContent;
  loading: boolean;
  generating: boolean;
  generatingParts: number[];
  stale: boolean;
  regenerate: () => Promise<void>;
  regeneratePart: (part: 1 | 2 | 3) => Promise<void>;
};

const GeneratedContentContext = createContext<Ctx>({
  content: EMPTY, loading: true, generating: false,
  generatingParts: [], stale: false,
  regenerate: async () => {}, regeneratePart: async () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function GeneratedContentProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();

  const [content, setContent] = useState<GeneratedContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [generatingParts, setGeneratingParts] = useState<number[]>([]);
  const [storedFingerprint, setStoredFingerprint] = useState<string | null>(null);
  // Parts that need to be silently back-filled after a partial DB load
  const [refillQueue, setRefillQueue] = useState<Array<1 | 2 | 3>>([]);

  const triedAuto = useRef<string | null>(null);

  const currentFingerprint = useMemo(
    () => (profile ? fingerprintOf(profile) : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile?.branch, profile?.year, profile?.current_skills, profile?.interests, profile?.career_goal],
  );

  const profileMismatch =
    !!profile?.branch && !!storedFingerprint && storedFingerprint !== currentFingerprint;
  const stale = profileMismatch && triedAuto.current !== currentFingerprint;
  const generating = generatingParts.length > 0;

  // ── Helper: test history ──────────────────────────────────────────────────
  const getTestHistory = useCallback(async () => {
    if (!user) return [];
    try {
      const { data } = await supabase
        .from("user_progress")
        .select("item_name, metadata")
        .eq("user_id", user.id)
        .eq("item_type", "test");
      return (data || []).map((d: any) => ({
        topic: d.item_name || "Test",
        score: d.metadata?.score ?? 0,
      }));
    } catch {
      return [];
    }
  }, [user]);

  // ── DB save helper ────────────────────────────────────────────────────────
  const saveContent = useCallback(async (c: GeneratedContent, fp: string) => {
    if (!user || !profile) return;
    const { error } = await supabase.from("generated_content").upsert(
      {
        user_id: user.id,
        fingerprint: fp,
        branch: profile.branch,
        year: profile.year,
        skills: profile.current_skills,
        interests: profile.interests,
        career_goal: profile.career_goal,
        content: c as any,
      },
      { onConflict: "user_id" },
    );
    if (error) {
      console.error("DB save error:", error.message, error.code);
      toast.error(`Save failed: ${error.message}`);
    } else {
      setStoredFingerprint(fp);
    }
  }, [user, profile]);

  // ── regeneratePart ────────────────────────────────────────────────────────
  const regeneratePart = useCallback(async (part: 1 | 2 | 3) => {
    if (!user || !profile?.branch) return;
    setGeneratingParts(prev => [...prev, part]);
    try {
      const testHistory = await getTestHistory();
      const partData = await fetchPart(profile, part, testHistory);
      setContent(prev => {
        const next = { ...prev, ...partData };
        // Fire-and-forget DB update with latest merged content
        const fp = fingerprintOf(profile);
        saveContent(next, fp);
        return next;
      });
    } catch (e: any) {
      console.error(`regeneratePart(${part}) error:`, e);
    } finally {
      setGeneratingParts(prev => prev.filter(p => p !== part));
    }
  }, [user, profile, getTestHistory, saveContent]);

  // ── regenerate (all three parts) ─────────────────────────────────────────
  const regenerate = useCallback(async () => {
    if (!user || !profile?.branch) return;
    setGeneratingParts([1, 2, 3]);

    const testHistory = await getTestHistory();
    const partResults: Array<Partial<GeneratedContent>> = [];
    let anySuccess = false;

    const runPart = async (part: 1 | 2 | 3) => {
      try {
        const partData = await fetchPart(profile, part, testHistory);
        partResults.push(partData);
        anySuccess = true;
        setContent(Object.assign({}, EMPTY, ...partResults) as GeneratedContent);
      } catch (e: any) {
        console.error(`regenerate part ${part} error:`, e);
        toast.error(`Part ${part} failed: ${e?.message || "Unknown error"}`);
      } finally {
        setGeneratingParts(prev => prev.filter(p => p !== part));
      }
    };

    // Run sequentially with gaps to avoid Groq rate-limits (Part 2 is instant — no AI)
    await runPart(1);
    await new Promise(r => setTimeout(r, 1000));
    await runPart(2);
    await new Promise(r => setTimeout(r, 1000));
    await runPart(3);

    const finalContent = Object.assign({}, EMPTY, ...partResults) as GeneratedContent;
    setContent(finalContent);

    // Only persist if we actually got something — don't overwrite DB with empty on rate-limit failure
    if (anySuccess && hasRealContent(finalContent)) {
      const fp = fingerprintOf(profile);
      await saveContent(finalContent, fp);
      toast.success("Content updated! ✓");
    } else {
      // Reset triedAuto so next page load will retry automatically
      triedAuto.current = null;
      if (!anySuccess) toast.error("Generation failed — will retry automatically on next visit.");
    }
  }, [user, profile, getTestHistory, saveContent]);

  // ── load from DB ─────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    if (!user) { setContent(EMPTY); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from("generated_content")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data?.content && hasRealContent(data.content)) {
      const loaded = { ...EMPTY, ...(data.content as any) } as GeneratedContent;
      setContent(loaded);
      setStoredFingerprint(data.fingerprint);
      // Queue any sections that are missing from the DB row for silent back-fill
      const missing = findMissingParts(loaded);
      if (missing.length > 0) setRefillQueue(missing);
    } else {
      // Nothing useful in the DB — let the auto-generation effect handle it
      setContent(EMPTY);
      setStoredFingerprint(null);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  // ── Clear stale content when profile changes ─────────────────────────────
  useEffect(() => {
    if (profileMismatch) { setContent(EMPTY); setRefillQueue([]); }
  }, [profileMismatch]);

  // ── Main auto-generation: fires when there is NO stored content at all ───
  useEffect(() => {
    if (loading || generating || !user || !profile?.branch) return;
    const needsGen = !storedFingerprint || storedFingerprint !== currentFingerprint;
    if (needsGen && triedAuto.current !== currentFingerprint) {
      triedAuto.current = currentFingerprint;
      regenerate();
    }
  }, [loading, generating, user, profile?.branch, storedFingerprint, currentFingerprint, regenerate]);

  // ── Partial back-fill: fires when DB had SOME content but sections missing ─
  useEffect(() => {
    // Only run when fully loaded, not already generating, user & profile ready,
    // and there are queued parts that need filling
    if (loading || generating || !user || !profile?.branch || refillQueue.length === 0) return;
    const parts = [...refillQueue];
    setRefillQueue([]); // Clear queue immediately to prevent re-runs
    parts.forEach(part => regeneratePart(part));
  }, [loading, generating, user, profile?.branch, refillQueue, regeneratePart]);

  return (
    <GeneratedContentContext.Provider
      value={{ content, loading, generating, generatingParts, stale, regenerate, regeneratePart }}
    >
      {children}
    </GeneratedContentContext.Provider>
  );
}

export const useGeneratedContent = () => useContext(GeneratedContentContext);
