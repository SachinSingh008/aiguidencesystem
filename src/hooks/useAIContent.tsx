import {
  createContext, useCallback, useContext, useEffect,
  useState, useRef, ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getFallbackContent } from "./aiFallback";
import { COURSE_CATALOG } from "@/lib/courseCatalog";
import { resolveExactStudyMaterialUrl } from "@/lib/serpapi";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type AICourse = {
  title: string; platform: string; instructor: string;
  duration: string; difficulty: string; url: string;
  description: string; careerRelevance: string; searchQuery?: string;
};
export type AIStudyMaterial = {
  title: string; type: string; subject: string; url: string; description: string; searchQuery?: string;
};
export type AICareerPath = {
  title: string; description: string; salary: string; growth: string;
  skills: string[]; modules: { title: string; steps: string[] }[];
};
export type AIMockTest = {
  id: number; title: string; topic: string; difficulty: string; duration: string;
  questions: { q: string; options: string[]; answer: number }[];
};
export type AIContent = {
  courses: AICourse[]; studyMaterials: AIStudyMaterial[];
  careerPaths: AICareerPath[]; mockTests: AIMockTest[]; partial?: boolean;
};

// ─── EMPTY ────────────────────────────────────────────────────────────────────
const EMPTY: AIContent = { courses: [], studyMaterials: [], careerPaths: [], mockTests: [], partial: false };

// ─── PROFILE ─────────────────────────────────────────────────────────────────
type Profile = { name: string; branch: string; year: string; skills: string[]; interests: string[] };

// ─── API CONFIG ───────────────────────────────────────────────────────────────
const GROQ_KEY  = import.meta.env.VITE_GROQ_API_KEY  || "";
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GROQ_URL  = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

// ─── CACHE ────────────────────────────────────────────────────────────────────
const CACHE_TTL = 10 * 60 * 1000; // 10 min



function cacheKey(p: Profile) {
  return `aiv3_${p.branch}_${p.year}_${[...p.skills].sort().join(",")}_${[...p.interests].sort().join(",")}`;
}
function readCache(key: string): AIContent | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, exp } = JSON.parse(raw);
    if (Date.now() > exp) { sessionStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}
function writeCache(key: string, data: AIContent) {
  try { sessionStorage.setItem(key, JSON.stringify({ data, exp: Date.now() + CACHE_TTL })); } catch {}
}

// ─── DELAY ───────────────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── GROQ REQUEST ─────────────────────────────────────────────────────────────
async function groqRequest(prompt: string, maxTokens: number): Promise<string> {
  if (!GROQ_KEY) throw new Error("NO_GROQ_KEY");
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) throw new Error(res.status === 429 ? "RATE_LIMIT" : `GROQ_${res.status}`);
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  if (!text) throw new Error("EMPTY_RESPONSE");
  return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

// ─── GEMINI REQUEST (FALLBACK) ────────────────────────────────────────────────
async function geminiRequest(prompt: string, maxTokens: number): Promise<string> {
  if (!GEMINI_KEY) throw new Error("NO_GEMINI_KEY");
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.5, maxOutputTokens: maxTokens, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) throw new Error(res.status === 429 ? "RATE_LIMIT" : `GEMINI_${res.status}`);
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!text) throw new Error("EMPTY_RESPONSE");
  return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
}

// ─── SMART REQUEST: Groq → Gemini ─────────────────────────────────────────────
async function smartRequest(prompt: string, maxTokens: number): Promise<string> {
  // Try Groq first
  if (GROQ_KEY) {
    try {
      return await groqRequest(prompt, maxTokens);
    } catch (e: any) {
      console.warn(`[Groq] failed (${e.message}), trying Gemini…`);
    }
  }
  // Fallback to Gemini
  if (GEMINI_KEY) {
    try {
      return await geminiRequest(prompt, maxTokens);
    } catch (e: any) {
      console.warn(`[Gemini] failed (${e.message})`);
    }
  }
  throw new Error("ALL_PROVIDERS_FAILED");
}

// ─── PHASE RUNNER (retry + backoff) ──────────────────────────────────────────
async function runPhase<T>(name: string, fn: () => Promise<T>, maxRetries = 2): Promise<T | null> {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      const isLast = attempt > maxRetries;
      // Exponential backoff for rate limits: 10s, then 20s
      const backoff = err.message === "RATE_LIMIT" ? attempt * 10000 : attempt * 3000;
      console.warn(`[${name}] Attempt ${attempt} failed: ${err.message}.${isLast ? " Giving up." : ` Retry in ${backoff}ms…`}`);
      if (!isLast) await delay(backoff);
    }
  }
  console.error(`[${name}] All retries exhausted.`);
  return null;
}

// ─── CATALOG MATCHER ──────────────────────────────────────────────────────────
function stringSimilarity(a: string, b: string): number {
  const s = a.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  const t = b.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
  if (s === t) return 1;
  if (!s || !t) return 0;
  const sw = new Set(s.split(" "));
  const tw = t.split(" ");
  const matches = tw.filter((w) => sw.has(w)).length;
  return (2 * matches) / (sw.size + tw.length);
}

// ≥98% match → real catalog URL; else → Coursera/Udemy search (always valid)
function resolveUrlFromCatalog(title: string, platform: string): string {
  let best = 0, bestUrl = "";
  for (const c of COURSE_CATALOG) {
    const sim = stringSimilarity(title, c.title);
    if (sim > best) { best = sim; bestUrl = c.url; }
  }
  if (best >= 0.98) {
    console.log(`[Catalog] ✅ ${Math.round(best * 100)}% match → "${title}"`);
    return bestUrl;
  }
  const q = encodeURIComponent(title);
  return (platform || "").toLowerCase().includes("udemy")
    ? `https://www.udemy.com/courses/search/?q=${q}`
    : `https://www.coursera.org/search?query=${q}`;
}

// ─── PHASE 1: COURSES (hybrid: AI titles + catalog/search URL) ────────────────
async function generateCourses(p: Profile): Promise<AICourse[]> {
  const prompt = `You are a Senior Career Advisor for Indian engineering students. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Return exactly 6 highly relevant courses from Coursera or Udemy only.
Cover: 2 Beginner, 2 Intermediate, 1 Advanced, 1 Bootcamp.
Provide ONLY: title, platform ("Coursera" or "Udemy"), instructor, duration, difficulty, description, careerRelevance.
DO NOT include a url field.

{"courses":[{"title":"","platform":"Coursera","instructor":"","duration":"","difficulty":"Beginner","description":"","careerRelevance":""}]}`;

  try {
    const raw = await smartRequest(prompt, 1500);
    const obj = JSON.parse(raw);
    const arr: any[] = obj?.courses ?? (Array.isArray(obj) ? obj : []);
    if (arr.length < 3) throw new Error("Too few courses");
    // ✅ Hybrid: ≥98% catalog match → direct URL, else Coursera/Udemy search URL
    return arr.slice(0, 6).map((c: any) => ({
      title: c.title, platform: c.platform, instructor: c.instructor,
      duration: c.duration, difficulty: c.difficulty,
      description: c.description, careerRelevance: c.careerRelevance,
      url: resolveUrlFromCatalog(c.title, c.platform),
    }));
  } catch {
    // AI failed — serve directly from catalog
    return COURSE_CATALOG
      .filter((c) => c.branch.some((tag) => p.branch.toLowerCase().includes(tag)))
      .sort(() => Math.random() - 0.5).slice(0, 6)
      .map((c) => ({ title: c.title, platform: c.platform, instructor: c.instructor,
        duration: c.duration, difficulty: c.difficulty, url: c.url,
        description: c.description, careerRelevance: c.careerRelevance }));
  }
}

// ─── PHASE 2: STUDY MATERIALS (API ONLY) ────────────────────────────────────
async function generateStudyMaterials(p: Profile): Promise<AIStudyMaterial[]> {
  const prompt = `You are a Senior Career Advisor for Indian engineering students. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Return exactly 5 study resources. DO NOT include a url field — we resolve URLs automatically.
Provide ONLY: title, type (Documentation|Notes|eBook|Cheat Sheet), subject, description.
Prioritise resources relevant to the student\'s branch and interests.

{"studyMaterials":[{"title":"","type":"Notes","subject":"","description":""}]}`;

  const raw = await smartRequest(prompt, 1000);
  const obj = JSON.parse(raw);
  const arr: any[] = obj?.studyMaterials ?? (Array.isArray(obj) ? obj : []);
  if (arr.length < 2) throw new Error("Too few materials");

  // 🔍 Use SerpAPI to resolve exact resource URLs.
  const resolved = await Promise.all(
    arr.slice(0, 6).map(async (m) => {
      const serpUrl = await resolveExactStudyMaterialUrl(m.title, m.subject, m.type);
      return { ...m, url: serpUrl };
    })
  );

  return resolved;
}





// ─── PHASE 3: CAREER PATHS ───────────────────────────────────────────────────
async function generateCareerPaths(p: Profile): Promise<AICareerPath[]> {
  const prompt = `Act as an Expert Career Architect for Indian engineering students. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Generate exactly 3 tailored career paths based on the student's profile.
Make them realistic, highly demanded in the current market, and actionable.
Each path must have exactly 4 modules (e.g., Fundamentals, Core, Advanced, Projects), each module exactly 4 actionable steps.

{"careerPaths":[{"title":"","description":"","salary":"₹X LPA - ₹Y LPA","growth":"High|Medium|Very High","skills":["skill1","skill2"],"modules":[{"title":"","steps":["step 1","step 2","step 3","step 4"]}]}]}`;

  const raw = await smartRequest(prompt, 3000);
  const obj = JSON.parse(raw);
  const arr: AICareerPath[] = obj?.careerPaths ?? (Array.isArray(obj) ? obj : []);
  if (arr.length < 1) throw new Error("No career paths");
  return arr.slice(0, 3);
}

// ─── PHASE 4: MOCK TESTS ─────────────────────────────────────────────────────
async function generateMockTests(p: Profile): Promise<AIMockTest[]> {
  const prompt = `Act as a Technical Interview Coach at top tech companies. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Generate exactly 3 mock tests tailored to the student's skills and branch.
Make the questions realistic for technical interviews or university exams.
Each test must have exactly 15 questions. Each question has 4 options, answer is the correct index (0-3).

{"mockTests":[{"id":1,"title":"","topic":"","difficulty":"Beginner|Intermediate|Advanced","duration":"15","questions":[{"q":"Question text?","options":["A","B","C","D"],"answer":0}]}]}`;

  const raw = await smartRequest(prompt, 4000);
  const obj = JSON.parse(raw);
  const arr: AIMockTest[] = obj?.mockTests ?? (Array.isArray(obj) ? obj : []);
  const valid = arr.filter((t) => Array.isArray(t.questions) && t.questions.length >= 8);
  if (valid.length < 1) throw new Error("No valid mock tests");
  return valid.slice(0, 3);
}

// ─── CACHE CLEAR (wipe all aiv3_* keys from sessionStorage) ─────────────────
export function clearAICache() {
  try {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith("aiv3_"))
      .forEach((k) => sessionStorage.removeItem(k));
  } catch {}
}

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
type Ctx = { content: AIContent; loading: boolean; generating: boolean; phase: string; generate: () => Promise<void>; clearCache: () => void };

const AIContentContext = createContext<Ctx>({ content: EMPTY, loading: true, generating: false, phase: "", generate: async () => {}, clearCache: () => {} });

// ─── PROVIDER ─────────────────────────────────────────────────────────────────
export function AIContentProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [content, setContent] = useState<AIContent>(EMPTY);
  const [loading, setLoading]     = useState(true);
  const [generating, setGenerating] = useState(false);
  const [phase, setPhase]         = useState("");
  const generatedFor = useRef<string | null>(null);

  // Exposed so Settings/Onboarding can call after a profile edit
  const clearCache = useCallback(() => {
    clearAICache();
    generatedFor.current = null;
    setContent(EMPTY);
  }, []);

  const generate = useCallback(async () => {
    if (!profile?.branch) return;

    const p: Profile = {
      name: profile.full_name || "Student",
      branch: profile.branch || "",
      year: profile.year || "",
      skills: profile.current_skills || [],
      interests: profile.interests || [],
    };
    const key = cacheKey(p);

    // Cache hit
    const cached = readCache(key);
    if (cached) { setContent(cached); generatedFor.current = key; setLoading(false); return; }

    setGenerating(true);
    setContent(EMPTY);
    let partial = false;

    try {
      // Phase 1 — Courses (AI titles + hybrid catalog/search URL resolution)
      setPhase("Generating Courses...");
      const courses = await runPhase("Courses", () => generateCourses(p));
      if (!courses || courses.length === 0) partial = true;

      // Phase 2 — Study Materials
      setPhase("Generating Study Materials...");
      const studyMaterials = await runPhase("StudyMaterials", () => generateStudyMaterials(p));
      if (!studyMaterials) partial = true;
      await delay(4000); // Increased delay between phases

      // Phase 3 — Career Paths
      setPhase("Generating Career Paths...");
      const careerPaths = await runPhase("CareerPaths", () => generateCareerPaths(p));
      if (!careerPaths) partial = true;
      await delay(4000); // Increased delay between phases

      // Phase 4 — Mock Tests
      setPhase("Generating Mock Tests...");
      const mockTests = await runPhase("MockTests", () => generateMockTests(p));
      if (!mockTests) partial = true;

      // If ALL phases failed, use static fallback
      const totalFailed = [courses, studyMaterials, careerPaths, mockTests].filter(Boolean).length === 0;
      if (totalFailed) {
        const fallback = getFallbackContent(p.branch);
        toast.info("Using curated offline content (API unavailable). Results are still relevant!", { duration: 7000 });
        setContent(fallback);
        generatedFor.current = key;
        writeCache(key, fallback);
        return;
      }

      const result: AIContent = {
        courses: courses ?? [],
        studyMaterials: studyMaterials ?? [],
        careerPaths: careerPaths ?? [],
        mockTests: mockTests ?? [],
        partial,
      };

      setContent(result);
      generatedFor.current = key;
      if (!partial) {
        writeCache(key, result);
        toast.success("Your personalised content is ready!");
      } else {
        toast.warning("Some phases couldn't load. Showing partial results — click Regenerate to retry.", { duration: 7000 });
      }
    } catch (e: any) {
      console.error("[AIContent] Pipeline error:", e);
      const fallback = getFallbackContent(p.branch);
      toast.info("Using curated offline content (API unavailable).", { duration: 7000 });
      setContent(fallback);
      generatedFor.current = key;
    } finally {
      setPhase("");
      setGenerating(false);
      setLoading(false);
    }
  }, [profile]);

  // Auto-load
  useEffect(() => {
    if (!profile?.branch) { setLoading(false); return; }

    const p: Profile = {
      name: profile.full_name || "Student",
      branch: profile.branch || "",
      year: profile.year || "",
      skills: profile.current_skills || [],
      interests: profile.interests || [],
    };
    const key = cacheKey(p);
    if (generatedFor.current === key) { setLoading(false); return; }

    const cached = readCache(key);
    if (cached) {
      setContent(cached);
      generatedFor.current = key;
      setLoading(false);
      return;
    }

    generatedFor.current = key;
    generate();
  }, [profile?.branch, profile?.year, profile?.current_skills, profile?.interests, generate]);

  return (
    <AIContentContext.Provider value={{ content, loading, generating, phase, generate, clearCache }}>
      {children}
    </AIContentContext.Provider>
  );
}

export const useAIContent = () => useContext(AIContentContext);