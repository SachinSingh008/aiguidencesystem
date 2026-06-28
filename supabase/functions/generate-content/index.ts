// CareerPilot AI content generator — 3-part generation for progressive loading.
// Part 1: careerPaths + skillGaps
// Part 2: courses + studyMaterials + videoLectures
// Part 3: mockTests
import { VERIFIED_CATALOG } from "./catalog.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM = `You are an AI that generates personalised career guidance JSON for Indian engineering students.
Rules: (1) ALL content must match the student's branch exactly.
(2) Use INR salary in LPA. 
(3) Provide high-quality course or topic titles. We will automatically generate search URLs for them.
(4) skillGaps: Evaluate heavily on recent test scores. Topics < 50% = missing, 50-80% = in-progress, > 80% = complete.
(5) Roadmap: first 1-2 steps=complete if student has those skills/scores, then in-progress, rest=upcoming.
(6) Return ONLY raw JSON — no markdown.`;

function studentContext(profile: any, testHistory: { topic: string, score: number }[]) {
  const testsStr = testHistory?.length > 0
    ? `Recent Test Scores: ${testHistory.map(t => `${t.topic} (${t.score}%)`).join(", ")}.`
    : "Recent Test Scores: None yet.";

  // Filter the massive catalog strictly to courses relevant to this student's branch to save tokens
  const relevantCatalog = VERIFIED_CATALOG.filter(c => 
    !profile.branch || c.branch.some(b => profile.branch.toLowerCase().includes(b.toLowerCase()))
  );

  return `Branch: ${profile.branch}, Year: ${profile.year || "?"}, ` +
    `Skills: ${(profile.current_skills || []).join(", ") || "none"}, ` +
    `Interests: ${(profile.interests || []).join(", ") || "none"}, ` +
    testsStr;
}

// Build a guaranteed-working search URL for a given platform and query.
// Always redirects to a real site search — never Google generic search.
function platformSearchUrl(platform: string, query: string): string {
  const q = encodeURIComponent(query);
  const p = (platform || "").toLowerCase();
  if (p.includes("coursera"))        return `https://www.coursera.org/search?query=${q}`;
  if (p.includes("udemy"))           return `https://www.udemy.com/courses/search/?q=${q}`;
  if (p.includes("nptel"))           return `https://www.youtube.com/results?search_query=NPTEL+${q}`;
  if (p.includes("youtube"))         return `https://www.youtube.com/results?search_query=${q}`;
  if (p.includes("mit") || p.includes("ocw")) return `https://ocw.mit.edu/search/?q=${q}`;
  if (p.includes("edx"))             return `https://www.edx.org/search?q=${q}`;
  if (p.includes("linkedin"))        return `https://www.linkedin.com/learning/search?keywords=${q}`;
  if (p.includes("khan"))            return `https://www.khanacademy.org/search?page_search_query=${q}`;
  if (p.includes("freecodecamp"))    return `https://www.freecodecamp.org/news/search/?query=${q}`;
  // Default: Coursera search — better than Google for educational content
  return `https://www.coursera.org/search?query=${q}`;
}

// Replace AI-generated URLs with search-based URLs that always work.
function sanitizeUrls(parsed: any): any {
  // Courses
  if (Array.isArray(parsed.courses)) {
    parsed.courses = parsed.courses.map((c: any) => c.isExact ? c : ({
      ...c, url: platformSearchUrl(c.platform || "Youtube", c.title || ""),
    }));
  }

  // Video Lectures
  if (Array.isArray(parsed.videoLectures)) {
    parsed.videoLectures = parsed.videoLectures.map((v: any) => v.isExact ? v : ({
      ...v,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(
        (v.channel?.toLowerCase().includes("nptel") ? "NPTEL " : "") + (v.title || v.topic || "")
      )}`,
    }));
  }

  // Study Materials
  if (Array.isArray(parsed.studyMaterials)) {
    // Official documentation lookup — maps keywords  to their real doc URLs
    const OFFICIAL_DOCS: Record<string, string> = {
      // Programming Languages
      python:       "https://docs.python.org/3/",
      javascript:   "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      typescript:   "https://www.typescriptlang.org/docs/",
      java:         "https://docs.oracle.com/en/java/",
      "c++":        "https://cppreference.com/",
      cpp:          "https://cppreference.com/",
      "c#":         "https://learn.microsoft.com/en-us/dotnet/csharp/",
      csharp:       "https://learn.microsoft.com/en-us/dotnet/csharp/",
      go:           "https://go.dev/doc/",
      golang:       "https://go.dev/doc/",
      rust:         "https://doc.rust-lang.org/book/",
      kotlin:       "https://kotlinlang.org/docs/home.html",
      swift:        "https://swift.org/documentation/",
      php:          "https://www.php.net/manual/en/",
      ruby:         "https://ruby-doc.org/",
      scala:        "https://docs.scala-lang.org/",
      dart:         "https://dart.dev/guides",
      r:            "https://cran.r-project.org/doc/manuals/r-release/R-lang.html",
      matlab:       "https://in.mathworks.com/help/matlab/",
      sql:          "https://www.w3schools.com/sql/",
      // Frameworks & Libraries
      react:        "https://react.dev/learn",
      "react native": "https://reactnative.dev/docs/getting-started",
      "next.js":    "https://nextjs.org/docs",
      nextjs:       "https://nextjs.org/docs",
      angular:      "https://angular.io/docs",
      vue:          "https://vuejs.org/guide/introduction.html",
      "node.js":    "https://nodejs.org/en/docs/",
      nodejs:       "https://nodejs.org/en/docs/",
      express:      "https://expressjs.com/en/api.html",
      django:       "https://docs.djangoproject.com/en/stable/",
      flask:        "https://flask.palletsprojects.com/",
      spring:       "https://spring.io/projects/spring-framework",
      laravel:      "https://laravel.com/docs/",
      flutter:      "https://docs.flutter.dev/",
      tensorflow:   "https://www.tensorflow.org/api_docs",
      pytorch:      "https://pytorch.org/docs/stable/index.html",
      "scikit-learn": "https://scikit-learn.org/stable/documentation.html",
      pandas:       "https://pandas.pydata.org/docs/",
      numpy:        "https://numpy.org/doc/",
      opencv:       "https://docs.opencv.org/",
      // Databases
      mysql:        "https://dev.mysql.com/doc/",
      postgresql:   "https://www.postgresql.org/docs/",
      mongodb:      "https://www.mongodb.com/docs/",
      redis:        "https://redis.io/docs/",
      sqlite:       "https://www.sqlite.org/docs.html",
      // Cloud & DevOps
      aws:          "https://docs.aws.amazon.com/",
      azure:        "https://learn.microsoft.com/en-us/azure/",
      gcp:          "https://cloud.google.com/docs",
      docker:       "https://docs.docker.com/",
      kubernetes:   "https://kubernetes.io/docs/home/",
      git:          "https://git-scm.com/doc",
      linux:        "https://www.kernel.org/doc/html/latest/",
      // Web
      html:         "https://developer.mozilla.org/en-US/docs/Web/HTML",
      css:          "https://developer.mozilla.org/en-US/docs/Web/CSS",
      // Engineering-specific
      autocad:      "https://help.autodesk.com/view/ACDLT/ENU/",
      solidworks:   "https://help.solidworks.com/",
      ansys:        "https://www.ansys.com/training-center",
      labview:      "https://www.ni.com/en/support/documentation/supplemental/06/introduction-to-labview.html",
    };

    parsed.studyMaterials = parsed.studyMaterials.map((m: any) => {
      if (m.isExact) return m;
      const query = `${m.subject || m.title || ""}`.trim();
      const queryLower = query.toLowerCase();
      const type = (m.type || "").toLowerCase();
      let url: string;

      if (type.includes("doc")) {
        // Try to find the official docs URL by matching keywords in the title
        const match = Object.entries(OFFICIAL_DOCS).find(([key]) => queryLower.includes(key));
        url = match ? match[1] : `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(query)}`;
      } else if (type.includes("video") || type.includes("series")) {
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      } else if (type.includes("ebook") || type.includes("notes") || type.includes("cheat")) {
        url = `https://nptel.ac.in/course.html?search=${encodeURIComponent(query)}`;
      } else {
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      }
      return { ...m, url };
    });
  }

  // Career path roadmap resources — pick best platform from label
  if (Array.isArray(parsed.careerPaths)) {
    parsed.careerPaths = parsed.careerPaths.map((cp: any) => ({
      ...cp,
      roadmap: Array.isArray(cp.roadmap) ? cp.roadmap.map((step: any) => ({
        ...step,
        resources: Array.isArray(step.resources) ? step.resources.map((r: any) => {
          const label = (r.label || "").toLowerCase();
          const topic = r.label || step.title || "";
          let url: string;
          if (label.includes("nptel"))           url = `https://www.youtube.com/results?search_query=NPTEL+${encodeURIComponent(topic)}`;
          else if (label.includes("youtube") || label.includes("video")) url = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
          else if (label.includes("coursera"))   url = `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`;
          else if (label.includes("udemy"))      url = `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}`;
          else if (label.includes("mit"))        url = `https://ocw.mit.edu/search/?q=${encodeURIComponent(topic)}`;
          else if (label.includes("edx"))        url = `https://www.edx.org/search?q=${encodeURIComponent(topic)}`;
          else url = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic)}`;
          return { ...r, url };
        }) : [],
      })) : cp.roadmap,
    }));
  }
  return parsed;
}

// ── Instant Part 2 generator — NO AI call needed ─────────────────────────────
// Courses come from the verified catalog; study materials + videos from templates.
function buildPart2Instantly(profile: any) {
  const branch = (profile.branch || "").toLowerCase();

  // Map onboarding branch names → catalog branch tags
  const BRANCH_ALIASES: Record<string, string[]> = {
    "computer engineering":      ["computer science", "it", "software"],
    "information technology":    ["computer science", "it", "software"],
    "mechanical engineering":    ["mechanical"],
    "civil engineering":         ["civil"],
    "electrical engineering":    ["electrical"],
    "electronics & communication": ["electronics", "electrical"],
    "electronics and communication": ["electronics", "electrical"],
    "chemical engineering":      ["chemical"],
    "other":                     ["computer science"],
  };
  const aliases = BRANCH_ALIASES[branch] || [branch.split(" ")[0]]; // fallback: first word

  // ── Courses from catalog ──────────────────────────────────────────────────
  const relevantCatalog = VERIFIED_CATALOG.filter(c =>
    c.branch.some((b: string) =>
      aliases.some(alias =>
        b.toLowerCase().includes(alias) || alias.includes(b.toLowerCase())
      )
    )
  );
  // Hard fallback: if no match, use entire catalog shuffled
  const pool = relevantCatalog.length > 0 ? relevantCatalog : VERIFIED_CATALOG;
  const allCatalogCourses = pool.map((c, i) => ({
    id: 99000 + i,
    title: c.title,
    platform: c.platform,
    instructor: "Top Official Course",
    duration: "4–6 Weeks",
    difficulty: "Beginner/Intermediate",
    rating: 4.8,
    students: "100K+",
    url: c.url,
    category: c.branch[0] || "Engineering",
  }));
  const courses = allCatalogCourses.sort(() => 0.5 - Math.random()).slice(0, 24);

  // ── Template key selection using aliases ──────────────────────────────
  const TEMPLATE_KEY_MAP: Record<string, string> = {
    "computer engineering": "computer",
    "information technology": "computer",
    "mechanical engineering": "mechanical",
    "civil engineering": "civil",
    "electrical engineering": "electrical",
    "electronics & communication": "electronics",
    "electronics and communication": "electronics",
    "chemical engineering": "computer", // fallback
    "other": "computer",
  };
  const tmplKey = TEMPLATE_KEY_MAP[branch] || "computer";

  // ── Study materials — branch-specific templates ──────────────────────────
  const STUDY_TEMPLATES: Record<string, any[]> = {
    "computer": [
      { id: 1, title: "Data Structures & Algorithms Notes", type: "Notes", subject: "DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
      { id: 2, title: "Operating Systems Cheat Sheet", type: "Cheat Sheet", subject: "OS", url: "https://www.geeksforgeeks.org/operating-systems/" },
      { id: 3, title: "Python Documentation", type: "Documentation", subject: "Python", url: "https://docs.python.org/3/" },
      { id: 4, title: "NPTEL Programming in Java", type: "Video Series", subject: "Java", url: "https://www.youtube.com/results?search_query=NPTEL+Programming+in+Java" },
      { id: 5, title: "Computer Networks eBook (Forouzan)", type: "eBook", subject: "Networks", url: "https://nptel.ac.in/course.html?search=computer+networks" },
      { id: 6, title: "DBMS Notes — SQL & Normalization", type: "Notes", subject: "DBMS", url: "https://www.geeksforgeeks.org/dbms/" },
    ],
    "electronics": [
      { id: 1, title: "Circuit Theory Notes", type: "Notes", subject: "Circuits", url: "https://www.allaboutcircuits.com/" },
      { id: 2, title: "Signals & Systems Cheat Sheet", type: "Cheat Sheet", subject: "Signals", url: "https://nptel.ac.in/course.html?search=signals+and+systems" },
      { id: 3, title: "NPTEL Analog Electronics", type: "Video Series", subject: "Analog", url: "https://www.youtube.com/results?search_query=NPTEL+Analog+Electronics" },
      { id: 4, title: "Microcontrollers & Embedded Systems", type: "eBook", subject: "Embedded", url: "https://nptel.ac.in/course.html?search=microcontrollers" },
      { id: 5, title: "VLSI Design Documentation", type: "Documentation", subject: "VLSI", url: "https://www.vlsisystemdesign.com/" },
      { id: 6, title: "Digital Electronics Notes", type: "Notes", subject: "Digital", url: "https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/" },
    ],
    "mechanical": [
      { id: 1, title: "Thermodynamics Notes", type: "Notes", subject: "Thermo", url: "https://nptel.ac.in/course.html?search=thermodynamics" },
      { id: 2, title: "Fluid Mechanics Cheat Sheet", type: "Cheat Sheet", subject: "Fluids", url: "https://nptel.ac.in/course.html?search=fluid+mechanics" },
      { id: 3, title: "AutoCAD Documentation", type: "Documentation", subject: "CAD", url: "https://help.autodesk.com/view/ACDLT/ENU/" },
      { id: 4, title: "NPTEL Engineering Mechanics", type: "Video Series", subject: "Mechanics", url: "https://www.youtube.com/results?search_query=NPTEL+Engineering+Mechanics" },
      { id: 5, title: "SolidWorks eBook", type: "eBook", subject: "CAD", url: "https://help.solidworks.com/" },
      { id: 6, title: "Manufacturing Processes Notes", type: "Notes", subject: "Manufacturing", url: "https://nptel.ac.in/course.html?search=manufacturing+processes" },
    ],
    "civil": [
      { id: 1, title: "Structural Analysis Notes", type: "Notes", subject: "Structures", url: "https://nptel.ac.in/course.html?search=structural+analysis" },
      { id: 2, title: "Soil Mechanics Cheat Sheet", type: "Cheat Sheet", subject: "Geotechnical", url: "https://nptel.ac.in/course.html?search=soil+mechanics" },
      { id: 3, title: "AutoCAD Civil 3D Documentation", type: "Documentation", subject: "CAD", url: "https://help.autodesk.com/view/CIV3D/ENU/" },
      { id: 4, title: "NPTEL Concrete Technology", type: "Video Series", subject: "Concrete", url: "https://www.youtube.com/results?search_query=NPTEL+Concrete+Technology" },
      { id: 5, title: "Surveying eBook", type: "eBook", subject: "Surveying", url: "https://nptel.ac.in/course.html?search=surveying" },
      { id: 6, title: "Fluid Mechanics & Hydraulics Notes", type: "Notes", subject: "Hydraulics", url: "https://nptel.ac.in/course.html?search=hydraulics" },
    ],
    "electrical": [
      { id: 1, title: "Power Systems Notes", type: "Notes", subject: "Power", url: "https://nptel.ac.in/course.html?search=power+systems" },
      { id: 2, title: "Control Systems Cheat Sheet", type: "Cheat Sheet", subject: "Control", url: "https://nptel.ac.in/course.html?search=control+systems" },
      { id: 3, title: "MATLAB Documentation", type: "Documentation", subject: "MATLAB", url: "https://www.mathworks.com/help/matlab/" },
      { id: 4, title: "NPTEL Electrical Machines", type: "Video Series", subject: "Machines", url: "https://www.youtube.com/results?search_query=NPTEL+Electrical+Machines" },
      { id: 5, title: "Circuit Analysis eBook", type: "eBook", subject: "Circuits", url: "https://www.allaboutcircuits.com/" },
      { id: 6, title: "Power Electronics Notes", type: "Notes", subject: "Power Electronics", url: "https://nptel.ac.in/course.html?search=power+electronics" },
    ],
  };
  const studyMaterials = STUDY_TEMPLATES[tmplKey].map((m: any) => ({ ...m, branch: profile.branch }));

  // ── Video lectures — branch-specific YouTube searches ────────────────────
  const VIDEO_TEMPLATES: Record<string, any[]> = {
    "computer": [
      { id: 1, title: "Data Structures Full Course", channel: "freeCodeCamp", duration: "8h", topic: "DSA", url: "https://www.youtube.com/results?search_query=data+structures+full+course" },
      { id: 2, title: "Operating Systems by Gate Smashers", channel: "Gate Smashers", duration: "10h", topic: "OS", url: "https://www.youtube.com/results?search_query=operating+systems+gate+smashers" },
      { id: 3, title: "DBMS Complete Course", channel: "NPTEL", duration: "6h", topic: "DBMS", url: "https://www.youtube.com/results?search_query=NPTEL+DBMS+complete" },
      { id: 4, title: "Computer Networks Crash Course", channel: "Kunal Kushwaha", duration: "5h", topic: "Networks", url: "https://www.youtube.com/results?search_query=computer+networks+kunal+kushwaha" },
      { id: 5, title: "System Design Interview Guide", channel: "ByteByteGo", duration: "4h", topic: "System Design", url: "https://www.youtube.com/results?search_query=system+design+interview+bytebytego" },
    ],
    "electronics": [
      { id: 1, title: "Analog Electronics Full Course", channel: "NPTEL", duration: "10h", topic: "Analog", url: "https://www.youtube.com/results?search_query=NPTEL+Analog+Electronics+full" },
      { id: 2, title: "Digital Electronics Crash Course", channel: "Neso Academy", duration: "8h", topic: "Digital", url: "https://www.youtube.com/results?search_query=digital+electronics+neso+academy" },
      { id: 3, title: "Signals and Systems", channel: "NPTEL", duration: "12h", topic: "Signals", url: "https://www.youtube.com/results?search_query=NPTEL+signals+systems" },
      { id: 4, title: "Embedded Systems Programming", channel: "Fastbit EBA", duration: "6h", topic: "Embedded", url: "https://www.youtube.com/results?search_query=embedded+systems+programming" },
      { id: 5, title: "VLSI Design Basics", channel: "NPTEL", duration: "8h", topic: "VLSI", url: "https://www.youtube.com/results?search_query=NPTEL+VLSI+design" },
    ],
    "mechanical": [
      { id: 1, title: "Thermodynamics Full Course", channel: "NPTEL", duration: "10h", topic: "Thermo", url: "https://www.youtube.com/results?search_query=NPTEL+thermodynamics" },
      { id: 2, title: "Fluid Mechanics Lectures", channel: "NPTEL", duration: "8h", topic: "Fluids", url: "https://www.youtube.com/results?search_query=NPTEL+fluid+mechanics" },
      { id: 3, title: "CAD SolidWorks Tutorial", channel: "CAD CAM", duration: "5h", topic: "CAD", url: "https://www.youtube.com/results?search_query=solidworks+tutorial+complete" },
      { id: 4, title: "Engineering Mechanics", channel: "NPTEL", duration: "12h", topic: "Mechanics", url: "https://www.youtube.com/results?search_query=NPTEL+engineering+mechanics" },
      { id: 5, title: "Manufacturing Processes", channel: "NPTEL", duration: "6h", topic: "Manufacturing", url: "https://www.youtube.com/results?search_query=NPTEL+manufacturing+processes" },
    ],
    "civil": [
      { id: 1, title: "Structural Analysis Lectures", channel: "NPTEL", duration: "10h", topic: "Structures", url: "https://www.youtube.com/results?search_query=NPTEL+structural+analysis" },
      { id: 2, title: "Soil Mechanics Full Course", channel: "NPTEL", duration: "8h", topic: "Geotechnical", url: "https://www.youtube.com/results?search_query=NPTEL+soil+mechanics" },
      { id: 3, title: "Surveying Techniques", channel: "NPTEL", duration: "6h", topic: "Surveying", url: "https://www.youtube.com/results?search_query=NPTEL+surveying" },
      { id: 4, title: "Concrete Technology", channel: "NPTEL", duration: "5h", topic: "Concrete", url: "https://www.youtube.com/results?search_query=NPTEL+concrete+technology" },
      { id: 5, title: "Construction Management", channel: "NPTEL", duration: "7h", topic: "Management", url: "https://www.youtube.com/results?search_query=NPTEL+construction+management" },
    ],
    "electrical": [
      { id: 1, title: "Power Systems Full Course", channel: "NPTEL", duration: "10h", topic: "Power", url: "https://www.youtube.com/results?search_query=NPTEL+power+systems" },
      { id: 2, title: "Control Systems Lectures", channel: "NPTEL", duration: "8h", topic: "Control", url: "https://www.youtube.com/results?search_query=NPTEL+control+systems" },
      { id: 3, title: "Electrical Machines", channel: "NPTEL", duration: "12h", topic: "Machines", url: "https://www.youtube.com/results?search_query=NPTEL+electrical+machines" },
      { id: 4, title: "Power Electronics", channel: "NPTEL", duration: "8h", topic: "Power Electronics", url: "https://www.youtube.com/results?search_query=NPTEL+power+electronics" },
      { id: 5, title: "Circuit Analysis", channel: "Neso Academy", duration: "6h", topic: "Circuits", url: "https://www.youtube.com/results?search_query=circuit+analysis+neso+academy" },
    ],
  };
  const videoLectures = VIDEO_TEMPLATES[tmplKey] || VIDEO_TEMPLATES["computer"];

  return { courses, studyMaterials, videoLectures };
}

const PART_PROMPTS: Record<number, (ctx: string) => string> = {
  1: (ctx) =>
    `Student: ${ctx}\n\n` +
    `Return JSON with:\n` +
    `skillGaps (6): [{skill,current(0-100),required(50-100),status(missing|in-progress|complete)}]\n` +
    `careerPaths (4): [{id,title,icon(SINGLE EMOJI ONLY),match(50-99),description,salary(₹X-Y LPA),growth(+X%),skills[4-5],roadmap(5 steps):[{step,title,status(complete|in-progress|upcoming),duration,resources:[{label,url}]}]}]`,

  2: (ctx) =>
    `Student: ${ctx}\n\n` +
    `Return JSON with:\n` +
    `courses (6): [{id,title,platform,instructor,duration,difficulty(Beginner|Intermediate|Advanced),rating,students,url,category}]\n` +
    `studyMaterials (5): [{id,title,type(Notes|Cheat Sheet|eBook|Video Series|Documentation),subject,branch,url}]\n` +
    `videoLectures (4): [{id,title,channel,duration,url,topic}]`,

  3: (ctx) =>
    `Student: ${ctx}\n\n` +
    `Return ONLY a JSON object containing exactly one key "mockTests".\n` +
    `"mockTests" must be an array of EXACTLY 10 mock tests. ENSURE that the mock tests specifically cover the student's listed "Skills" as well as their "Interests".\n` +
    `Each mock test must have EXACTLY 5 questions.\n` +
    `Vary difficulty: 3 Beginner, 4 Intermediate, 3 Advanced.\n` +
    `Example format:\n` +
    `{\n` +
    `  "mockTests": [\n` +
    `    {\n` +
    `      "id": 1,\n` +
    `      "title": "React Basics",\n` +
    `      "topic": "Frontend",\n` +
    `      "difficulty": "Beginner",\n` +
    `      "duration": "10",\n` +
    `      "questions": [\n` +
    `        { "q": "What is JSX?", "options": ["Array", "Syntax", "Function", "Hook"], "answer": 1 }\n` +
    `      ]\n` +
    `    }\n` +
    `  ]\n` +
    `}`,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function callGroq(apiKey: string, model: string, userPrompt: string) {
  const r = await fetch(GROQ_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3500,
    }),
  });
  if (r.ok) return { ok: true, status: r.status, data: await r.json(), errText: "" };
  const errText = await r.text();
  return { ok: false, status: r.status, data: null, errText };
}

async function fetchWithRetry(primaryKey: string, fallbackKey: string | undefined, userPrompt: string) {
  const attempts = [
    { key: primaryKey,   model: "llama-3.1-8b-instant",    wait: 0     },
    { key: primaryKey,   model: "llama-3.1-8b-instant",    wait: 8000  },
    { key: primaryKey,   model: "llama-3.3-70b-versatile", wait: 15000 },
    ...(fallbackKey ? [
      { key: fallbackKey, model: "llama-3.1-8b-instant",    wait: 5000  },
      { key: fallbackKey, model: "llama-3.3-70b-versatile", wait: 10000 },
    ] : [
      { key: primaryKey,  model: "llama-3.3-70b-versatile", wait: 20000 },
      { key: primaryKey,  model: "llama-3.1-8b-instant",    wait: 30000 },
    ]),
  ];

  let result = { ok: false, status: 0, data: null as any, errText: "" };

  for (let i = 0; i < attempts.length; i++) {
    const { key, model, wait } = attempts[i];
    if (wait > 0) {
      console.warn(`Attempt ${i + 1}: waiting ${wait / 1000}s before retry…`);
      await sleep(wait);
    }
    result = await callGroq(key, model, userPrompt);
    if (result.ok) break;
    console.warn(`Attempt ${i + 1} failed — status ${result.status}`);
    // Only retry on rate-limit (429) or server errors (5xx)
    if (result.status !== 429 && result.status < 500) break;
  }

  return result;
}

function normalizeKeys(parsed: any): any {
  const map: Record<string, string> = {
    career_paths: "careerPaths", careerpaths: "careerPaths",
    video_lectures: "videoLectures", videolectures: "videoLectures",
    study_materials: "studyMaterials", studymaterials: "studyMaterials",
    mock_tests: "mockTests", mocktests: "mockTests",
    skill_gaps: "skillGaps", skillgaps: "skillGaps",
  };
  for (const [alias, canon] of Object.entries(map)) {
    if (parsed[alias] !== undefined && parsed[canon] === undefined) {
      parsed[canon] = parsed[alias];
      delete parsed[alias];
    }
  }
  return parsed;
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { profile, part, testHistory = [] } = body;

    if (!profile?.branch) {
      return new Response(JSON.stringify({ error: "Profile branch is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const partNum = Number(part) || 0; // 0 = legacy all-in-one
    if (partNum !== 0 && ![1, 2, 3].includes(partNum)) {
      return new Response(JSON.stringify({ error: "part must be 1, 2, or 3" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const PRIMARY_KEY = Deno.env.get("GROQ_API_KEY");
    const FALLBACK_KEY = Deno.env.get("GROQ_API_KEY_FALLBACK");
    if (!PRIMARY_KEY) throw new Error("GROQ_API_KEY not set.");

    const ctx = studentContext(profile, testHistory);

    if (partNum >= 1 && partNum <= 3) {
      // ── Part 2: fully catalog-based, NO AI call — instant response ──────────
      if (partNum === 2) {
        const part2 = buildPart2Instantly(profile);
        return new Response(JSON.stringify({ part: 2, content: part2 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // ── Parts 1 & 3: AI-generated ────────────────────────────────────────────
      const userPrompt = PART_PROMPTS[partNum](ctx);
      const result = await fetchWithRetry(PRIMARY_KEY, FALLBACK_KEY, userPrompt);

      if (!result.ok) {
        const msg = result.status === 429
          ? "AI service is busy. Please wait 30 seconds and try again."
          : `AI error (${result.status}). Please try again.`;
        return new Response(JSON.stringify({ error: msg }), {
          status: result.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const rawContent = result.data?.choices?.[0]?.message?.content;
      if (!rawContent) {
        return new Response(JSON.stringify({ error: "Model returned empty response" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let parsed: any;
      try { parsed = JSON.parse(rawContent); }
      catch {
        return new Response(JSON.stringify({ error: "Model returned invalid JSON" }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      parsed = normalizeKeys(parsed);
      parsed = sanitizeUrls(parsed);

      // Extract ONLY expected keys to prevent hallucinated empty arrays from overwriting UI state
      const expectedKeys: Record<number, string[]> = {
        1: ["careerPaths", "skillGaps"],
        3: ["mockTests"],
      };

      const cleanContent: any = {};
      for (const k of expectedKeys[partNum] || []) {
        cleanContent[k] = Array.isArray(parsed[k]) ? parsed[k] : [];
      }

      return new Response(JSON.stringify({ part: partNum, content: cleanContent }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Legacy: all-in-one (part=0 / not provided) ──
    const allPrompt =
      `Student: ${ctx}\n\n` +
      `Return JSON with all of: skillGaps(6), careerPaths(4), courses(5), studyMaterials(4), videoLectures(4), mockTests(2 with 5 questions each).`;
    const result = await fetchWithRetry(PRIMARY_KEY, FALLBACK_KEY, allPrompt);

    if (!result.ok) {
      const msg = result.status === 429 ? "AI service busy." : `AI error (${result.status})`;
      return new Response(JSON.stringify({ error: msg }), {
        status: result.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawContent = result.data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      return new Response(JSON.stringify({ error: "Empty response" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: any;
    try { parsed = JSON.parse(rawContent); } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    parsed = normalizeKeys(parsed);
    
    const relevantCatalog = VERIFIED_CATALOG.filter(c => 
      !profile.branch || c.branch.some(b => profile.branch.toLowerCase().includes(b.toLowerCase()))
    );
    if (!Array.isArray(parsed.courses)) parsed.courses = [];
    const exactCourses = relevantCatalog.map((c, i) => ({
      id: 99000 + i, title: c.title, platform: c.platform, instructor: "Top Official Course", duration: "4 Weeks",
      difficulty: "Beginner/Intermediate", rating: 4.8, students: "100K+", url: c.url, category: c.branch[0] || "Engineering", isExact: true
    }));
    parsed.courses = [...exactCourses, ...parsed.courses].slice(0, 8);

    parsed = sanitizeUrls(parsed);
    
    const allKeys = ["careerPaths", "courses", "videoLectures", "studyMaterials", "mockTests", "skillGaps"];
    for (const k of allKeys) { if (!Array.isArray(parsed[k])) parsed[k] = []; }

    return new Response(JSON.stringify({ content: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
