import {
  createContext, useCallback, useContext, useEffect,
  useState, useRef, ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getFallbackContent } from "./aiFallback";

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
      model: "llama-3.3-70b-versatile",
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
      const backoff = err.message === "RATE_LIMIT" ? attempt * 5000 : attempt * 2000;
      console.warn(`[${name}] Attempt ${attempt} failed: ${err.message}.${isLast ? " Giving up." : ` Retry in ${backoff}ms…`}`);
      if (!isLast) await delay(backoff);
    }
  }
  console.error(`[${name}] All retries exhausted.`);
  return null;
}

// ─── PHASE 1: COURSES ─────────────────────────────────────────────────────────
async function generateCourses(p: Profile): Promise<AICourse[]> {
  const prompt = `Act as a Senior Career & Technical Advisor for Indian engineering students. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Return exactly 6 highly rated, industry-recognized courses from Coursera or Udemy only.
Organize them to cover Absolute Beginners, Advanced/Automation, and Bootcamps.

DO NOT include a url field. Only provide: title, platform (Coursera or Udemy), instructor, duration, difficulty, description, careerRelevance.

{"courses":[{"title":"","platform":"Coursera|Udemy","instructor":"","duration":"","difficulty":"Beginner|Intermediate|Advanced","description":"","careerRelevance":""}]}`;

  const raw = await smartRequest(prompt, 1500);
  const obj = JSON.parse(raw);
  const arr: any[] = obj?.courses ?? (Array.isArray(obj) ? obj : []);
  if (arr.length < 3) throw new Error("Too few courses");
  
  return arr.slice(0, 8).map(c => {
    // Always build a guaranteed search URL — never trust AI-generated links
    const query = encodeURIComponent(`${c.title} ${c.instructor}`.trim());
    const url = (c.platform || "").toLowerCase().includes("coursera")
      ? `https://www.coursera.org/search?query=${query}`
      : `https://www.udemy.com/courses/search/?q=${query}`;
    return { ...c, url };
  });
}

// ─── KNOWN DOCUMENTATION URLS (100% verified, never 404) ────────────────────
const KNOWN_DOCS: Record<string, { url: string; type: string }> = {
  // Web & JS
  "javascript":       { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "Documentation" },
  "html":             { url: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "Documentation" },
  "css":              { url: "https://developer.mozilla.org/en-US/docs/Web/CSS", type: "Documentation" },
  "typescript":       { url: "https://www.typescriptlang.org/docs/", type: "Documentation" },
  "react":            { url: "https://react.dev", type: "Documentation" },
  "nodejs":           { url: "https://nodejs.org/en/docs", type: "Documentation" },
  "expressjs":        { url: "https://expressjs.com/en/4x/api.html", type: "Documentation" },
  "vuejs":            { url: "https://vuejs.org/guide/introduction", type: "Documentation" },
  "angular":          { url: "https://angular.io/docs", type: "Documentation" },
  "nextjs":           { url: "https://nextjs.org/docs", type: "Documentation" },
  "tailwindcss":      { url: "https://tailwindcss.com/docs", type: "Documentation" },
  "bootstrap":        { url: "https://getbootstrap.com/docs/", type: "Documentation" },
  "graphql":          { url: "https://graphql.org/learn/", type: "Documentation" },
  // Python
  "python":           { url: "https://docs.python.org/3/", type: "Documentation" },
  "django":           { url: "https://docs.djangoproject.com/en/stable/", type: "Documentation" },
  "flask":            { url: "https://flask.palletsprojects.com/", type: "Documentation" },
  "fastapi":          { url: "https://fastapi.tiangolo.com/", type: "Documentation" },
  "numpy":            { url: "https://numpy.org/doc/stable/", type: "Documentation" },
  "pandas":           { url: "https://pandas.pydata.org/docs/", type: "Documentation" },
  "matplotlib":       { url: "https://matplotlib.org/stable/contents.html", type: "Documentation" },
  "scikit-learn":     { url: "https://scikit-learn.org/stable/documentation.html", type: "Documentation" },
  "tensorflow":       { url: "https://www.tensorflow.org/api_docs", type: "Documentation" },
  "pytorch":          { url: "https://pytorch.org/docs/stable/index.html", type: "Documentation" },
  // Databases
  "sql":              { url: "https://dev.mysql.com/doc/refman/8.0/en/", type: "Documentation" },
  "mysql":            { url: "https://dev.mysql.com/doc/refman/8.0/en/", type: "Documentation" },
  "postgresql":       { url: "https://www.postgresql.org/docs/current/", type: "Documentation" },
  "mongodb":          { url: "https://www.mongodb.com/docs/manual/", type: "Documentation" },
  "redis":            { url: "https://redis.io/docs/", type: "Documentation" },
  // DevOps & Cloud
  "docker":           { url: "https://docs.docker.com/", type: "Documentation" },
  "kubernetes":       { url: "https://kubernetes.io/docs/home/", type: "Documentation" },
  "git":              { url: "https://git-scm.com/doc", type: "Documentation" },
  "github":           { url: "https://docs.github.com/en", type: "Documentation" },
  "aws":              { url: "https://docs.aws.amazon.com/", type: "Documentation" },
  "linux":            { url: "https://man7.org/linux/man-pages/", type: "Documentation" },
  "bash":             { url: "https://www.gnu.org/software/bash/manual/", type: "Documentation" },
  // Java / JVM
  "java":             { url: "https://docs.oracle.com/en/java/", type: "Documentation" },
  "spring":           { url: "https://spring.io/projects/spring-boot", type: "Documentation" },
  "kotlin":           { url: "https://kotlinlang.org/docs/", type: "Documentation" },
  // Systems & other languages
  "c":                { url: "https://en.cppreference.com/w/c", type: "Documentation" },
  "cpp":              { url: "https://en.cppreference.com/w/", type: "Documentation" },
  "c++":              { url: "https://en.cppreference.com/w/", type: "Documentation" },
  "go":               { url: "https://go.dev/doc/", type: "Documentation" },
  "rust":             { url: "https://doc.rust-lang.org/book/", type: "Documentation" },
  "php":              { url: "https://www.php.net/docs.php", type: "Documentation" },
  // Mobile
  "android":          { url: "https://developer.android.com/docs", type: "Documentation" },
  "swift":            { url: "https://developer.apple.com/documentation/", type: "Documentation" },
  // Engineering tools
  "matlab":           { url: "https://www.mathworks.com/help/matlab/", type: "Documentation" },
  "autocad":          { url: "https://help.autodesk.com/view/ACD/2024/ENU/", type: "Documentation" },
  // Interview & placement
  "dsa":              { url: "https://www.geeksforgeeks.org/data-structures/", type: "Notes" },
  "geeksforgeeks":    { url: "https://www.geeksforgeeks.org/", type: "Notes" },
  "leetcode":         { url: "https://leetcode.com/problemset/", type: "Notes" },
  "techinterviewhandbook": { url: "https://www.techinterviewhandbook.org/", type: "eBook" },
};

function resolveDocUrl(title: string, subject: string): { url: string; type: string } {
  const needle = `${title} ${subject}`.toLowerCase().replace(/[^a-z0-9+]/g, "");
  for (const [key, val] of Object.entries(KNOWN_DOCS)) {
    if (needle.includes(key.replace(/[^a-z0-9]/g, ""))) return val;
  }
  // Safe fallback: MDN search (always works)
  return { url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(title)}`, type: "Documentation" };
}

// ─── PHASE 2: STUDY MATERIALS ────────────────────────────────────────────────
async function generateStudyMaterials(p: Profile): Promise<AIStudyMaterial[]> {
  const knownTopics = Object.keys(KNOWN_DOCS).join(", ");
  const prompt = `Act as a Senior Career & Technical Advisor for Indian engineering students. Return ONLY valid JSON.

Student: ${p.branch}, Year ${p.year}, Skills: ${p.skills.join(", ") || "None"}, Interests: ${p.interests.join(", ") || "None"}

Return exactly 5 study resources. DO NOT include a url field — we resolve URLs automatically.
Choose topics relevant to the student. Prefer topics from this list: ${knownTopics}.
Only provide: title, type (Documentation|Notes|eBook|Cheat Sheet), subject, description.

{"studyMaterials":[{"title":"","type":"Documentation|Notes|eBook|Cheat Sheet","subject":"","description":""}]}`;

  const raw = await smartRequest(prompt, 1000);
  const obj = JSON.parse(raw);
  const arr: any[] = obj?.studyMaterials ?? (Array.isArray(obj) ? obj : []);
  if (arr.length < 2) throw new Error("Too few materials");

  return arr.slice(0, 6).map(m => {
    // Always resolve URL from our verified map — AI never sets the URL
    const resolved = resolveDocUrl(m.title || "", m.subject || "");
    return { ...m, url: resolved.url, type: m.type || resolved.type };
  });
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
      // Phase 1 — Courses
      setPhase("Generating Courses...");
      const courses = await runPhase("Courses", () => generateCourses(p));
      if (!courses) partial = true;
      await delay(2000);

      // Phase 2 — Study Materials
      setPhase("Generating Study Materials...");
      const studyMaterials = await runPhase("StudyMaterials", () => generateStudyMaterials(p));
      if (!studyMaterials) partial = true;
      await delay(2000);

      // Phase 3 — Career Paths
      setPhase("Generating Career Paths...");
      const careerPaths = await runPhase("CareerPaths", () => generateCareerPaths(p));
      if (!careerPaths) partial = true;
      await delay(2000);

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