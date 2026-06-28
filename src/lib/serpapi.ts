// ─── SerpAPI Course Link Resolver ────────────────────────────────────────────
// Calls SerpAPI through the Vite dev proxy (/api/serpapi → serpapi.com).
// The proxy runs server-side so CORS never blocks it.
// Configured in vite.config.ts under server.proxy.

const SERP_API_KEY = import.meta.env.VITE_SERP_API_KEY || "";

// Builds the proxied SerpAPI URL — goes through Vite proxy, never direct to serpapi.com
function buildSerpUrl(query: string, num = 5): string {
  return `/api/serpapi/search.json?api_key=${SERP_API_KEY}&engine=google&q=${encodeURIComponent(query)}&num=${num}&gl=in&hl=en`;
}

// Platform-specific search query builders
const PLATFORM_QUERY: Record<string, (title: string, instructor?: string) => string> = {
  coursera:   (t, i) => `site:coursera.org "${t}" ${i ? `"${i}"` : ""} course`.trim(),
  udemy:      (t, i) => `site:udemy.com/course "${t}" ${i ?? ""}`.trim(),
  youtube:    (t)    => `site:youtube.com/watch "${t}"`,
  nptel:      (t)    => `site:nptel.ac.in "${t}"`,
  edx:        (t, i) => `site:edx.org "${t}" ${i ?? ""}`.trim(),
  linkedin:   (t)    => `site:linkedin.com/learning "${t}"`,
  mit:        (t)    => `site:ocw.mit.edu "${t}"`,
  freecodecamp: (t)  => `site:freecodecamp.org "${t}"`,
};

// Platform domain validators — URL must contain one of these to be "exact"
const PLATFORM_DOMAINS: Record<string, string[]> = {
  coursera:   ["coursera.org/learn/", "coursera.org/specializations/", "coursera.org/professional-certificates/"],
  udemy:      ["udemy.com/course/"],
  youtube:    ["youtube.com/watch", "youtube.com/playlist"],
  nptel:      ["nptel.ac.in/courses/", "nptel.ac.in/noc/courses/"],
  edx:        ["edx.org/learn/", "edx.org/course/"],
  linkedin:   ["linkedin.com/learning/"],
  mit:        ["ocw.mit.edu/courses/"],
  freecodecamp: ["freecodecamp.org/learn/"],
};

function detectPlatform(platform: string): string {
  const p = (platform || "").toLowerCase();
  if (p.includes("coursera"))        return "coursera";
  if (p.includes("udemy"))           return "udemy";
  if (p.includes("youtube") || p.includes("nptel")) return "youtube";
  if (p.includes("edx"))             return "edx";
  if (p.includes("linkedin"))        return "linkedin";
  if (p.includes("mit") || p.includes("ocw")) return "mit";
  if (p.includes("freecodecamp"))    return "freecodecamp";
  return "coursera"; // default
}

function buildSearchQuery(platform: string, title: string, instructor?: string): string {
  const p = detectPlatform(platform);
  const builder = PLATFORM_QUERY[p];
  return builder ? builder(title, instructor) : `${title} ${instructor ?? ""} course ${p}`.trim();
}

// Pick the best URL from organic search results
function pickBestUrl(results: any[], platform: string): string | null {
  const p = detectPlatform(platform);
  const domains = PLATFORM_DOMAINS[p] || [];

  if (!Array.isArray(results)) return null;

  // First pass: exact platform URL
  for (const r of results) {
    const link: string = r.link || "";
    if (domains.some(d => link.includes(d))) return link;
  }
  // Second pass: any result on the platform's main domain
  const rootDomain = p === "mit" ? "ocw.mit.edu" : `${p}.com`;
  for (const r of results) {
    const link: string = r.link || "";
    if (link.includes(rootDomain)) return link;
  }
  return null;
}

// Fallback search URL (always works, takes user to search page)
function fallbackSearchUrl(platform: string, title: string, instructor?: string): string {
  const p = detectPlatform(platform);
  const q = encodeURIComponent(`${title} ${instructor ?? ""}`.trim());
  switch (p) {
    case "coursera":     return `https://www.coursera.org/search?query=${q}`;
    case "udemy":        return `https://www.udemy.com/courses/search/?q=${q}`;
    case "youtube":      return `https://www.youtube.com/results?search_query=${q}`;
    case "nptel":        return `https://www.youtube.com/results?search_query=NPTEL+${q}`;
    case "edx":          return `https://www.edx.org/search?q=${q}`;
    case "linkedin":     return `https://www.linkedin.com/learning/search?keywords=${q}`;
    case "mit":          return `https://ocw.mit.edu/search/?q=${q}`;
    case "freecodecamp": return `https://www.freecodecamp.org/news/search/?query=${q}`;
    default:             return `https://www.coursera.org/search?query=${q}`;
  }
}

// ─── Main resolver ────────────────────────────────────────────────────────────
export async function resolveExactCourseUrl(
  title: string,
  platform: string,
  instructor?: string
): Promise<string> {
  if (!SERP_API_KEY) {
    console.warn("[SerpAPI] No API key — using fallback search URL");
    return fallbackSearchUrl(platform, title, instructor);
  }

  try {
    const query = buildSearchQuery(platform, title, instructor);
    console.log(`[SerpAPI] Searching for "${title}" on ${platform}…`);

    // ✅ Vite proxy — /api/serpapi routes to serpapi.com server-side (no CORS)
    const res = await fetch(buildSerpUrl(query, 5), { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`SerpAPI ${res.status}`);

    const data = await res.json();
    const results = data?.organic_results ?? [];
    const exactUrl = pickBestUrl(results, platform);

    if (exactUrl) {
      console.log(`[SerpAPI] ✅ EXACT URL: ${exactUrl}`);
      return exactUrl;
    }
    console.warn(`[SerpAPI] No match for "${title}" — using fallback`);
    return fallbackSearchUrl(platform, title, instructor);

  } catch (err) {
    console.error("[SerpAPI] Failed:", err);
    return fallbackSearchUrl(platform, title, instructor);
  }
}

// ─── Study Material resolver ─────────────────────────────────────────────────
// For documentation, eBooks, notes — finds the most relevant direct page
const DOC_SITE_QUERIES: Record<string, string> = {
  "geeksforgeeks": "site:geeksforgeeks.org",
  "mdn":           "site:developer.mozilla.org",
  "docs.python":   "site:docs.python.org",
  "leetcode":      "site:leetcode.com",
  "npmjs":         "site:npmjs.com",
  "github":        "site:github.com",
  "w3schools":     "site:w3schools.com",
  "tutorialspoint":"site:tutorialspoint.com",
  "javatpoint":    "site:javatpoint.com",
  "nptel":         "site:nptel.ac.in",
};

export async function resolveExactStudyMaterialUrl(
  title: string,
  subject: string,
  type: string
): Promise<string> {
  // For "Documentation" type — try known doc sites
  const knownDocSites: Record<string, string> = {
    python:       "https://docs.python.org/3/",
    javascript:   "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    typescript:   "https://www.typescriptlang.org/docs/",
    java:         "https://docs.oracle.com/en/java/",
    react:        "https://react.dev/learn",
    nodejs:       "https://nodejs.org/en/docs",
    docker:       "https://docs.docker.com/",
    kubernetes:   "https://kubernetes.io/docs/home/",
    aws:          "https://docs.aws.amazon.com/",
    sql:          "https://dev.mysql.com/doc/",
    mysql:        "https://dev.mysql.com/doc/",
    mongodb:      "https://www.mongodb.com/docs/",
    git:          "https://git-scm.com/doc",
    cpp:          "https://en.cppreference.com/w/",
    "c++":        "https://en.cppreference.com/w/",
    django:       "https://docs.djangoproject.com/",
    flask:        "https://flask.palletsprojects.com/",
    angular:      "https://angular.io/docs",
    vue:          "https://vuejs.org/guide/",
    flutter:      "https://docs.flutter.dev/",
    matlab:       "https://www.mathworks.com/help/matlab/",
    autocad:      "https://help.autodesk.com/view/ACD/2024/ENU/",
    tensorflow:   "https://www.tensorflow.org/api_docs",
    pytorch:      "https://pytorch.org/docs/stable/",
    pandas:       "https://pandas.pydata.org/docs/",
    numpy:        "https://numpy.org/doc/stable/",
  };

  const subjectLower = subject.toLowerCase();
  const titleLower = title.toLowerCase();

  if (type.toLowerCase().includes("doc")) {
    for (const [key, url] of Object.entries(knownDocSites)) {
      if (subjectLower.includes(key) || titleLower.includes(key)) return url;
    }
  }

  // For Notes/eBooks — via Vite proxy
  if (!SERP_API_KEY) return resolveStudyFallback(title, subject, type);

  try {
    const sitePrefix = type.toLowerCase().includes("video") || type.toLowerCase().includes("series")
      ? "site:youtube.com"
      : type.toLowerCase().includes("ebook") || type.toLowerCase().includes("notes")
        ? "site:geeksforgeeks.org OR site:nptel.ac.in"
        : "site:geeksforgeeks.org";

    const query = `${sitePrefix} ${title} ${subject}`;
    // ✅ Vite proxy
    const res = await fetch(buildSerpUrl(query, 5), { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`SerpAPI ${res.status}`);
    const data = await res.json();
    const first = data?.organic_results?.[0]?.link;
    if (first) { console.log(`[SerpAPI] ✅ Study URL: ${first}`); return first; }
  } catch (err) {
    console.error("[SerpAPI] Study material failed:", err);
  }

  return resolveStudyFallback(title, subject, type);
}

function resolveStudyFallback(title: string, subject: string, type: string): string {
  const q = encodeURIComponent(`${title} ${subject}`.trim());
  const t = type.toLowerCase();
  if (t.includes("video") || t.includes("series")) return `https://www.youtube.com/results?search_query=${q}`;
  if (t.includes("ebook") || t.includes("notes")) return `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(`${title} ${subject}`)}`;
  if (t.includes("doc")) return `https://developer.mozilla.org/en-US/search?q=${q}`;
  return `https://www.geeksforgeeks.org/search/?q=${encodeURIComponent(`${title} ${subject}`)}`;
}

// ─── Batch resolver — resolves multiple URLs with rate-limit protection ───────
export async function batchResolveCourseUrls<T extends { title: string; platform: string; instructor?: string }>(
  items: T[],
  delayMs = 300
): Promise<(T & { url: string })[]> {
  const results: (T & { url: string })[] = [];
  for (const item of items) {
    const url = await resolveExactCourseUrl(item.title, item.platform, item.instructor);
    results.push({ ...item, url });
    if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));
  }
  return results;
}
