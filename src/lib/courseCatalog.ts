// ─── Verified Course Catalog ──────────────────────────────────────────────────
// Real, tested direct links to course pages. No SerpAPI needed.
// Organized by branch tag for easy filtering.

export type CatalogCourse = {
  title: string; platform: string; instructor: string;
  duration: string; difficulty: string; url: string;
  description: string; careerRelevance: string; branch: string[];
};

export const COURSE_CATALOG: CatalogCourse[] = [


  // ── Civil Engineering ────────────────────────────────────────────────────────
  { title: "AutoCAD Civil 3D Complete Course", platform: "Udemy", instructor: "Eng. Mohammed", duration: "14 hours", difficulty: "Beginner", url: "https://www.udemy.com/course/civil3d/", description: "Civil 3D for road design, grading and drainage from scratch.", careerRelevance: "Required tool for Civil Design and Infrastructure Engineering roles.", branch: ["civil"] },
  { title: "Structural Analysis", platform: "Coursera", instructor: "Georgia Tech", duration: "8 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/learn/structural-analysis", description: "Trusses, beams, frames and deflection analysis for structures.", careerRelevance: "Core knowledge for Structural and Civil Engineering roles.", branch: ["civil"] },
  { title: "Project Management Professional (PMP) Prep", platform: "Coursera", instructor: "Google", duration: "6 months", difficulty: "Intermediate", url: "https://www.coursera.org/professional-certificates/google-project-management", description: "Agile, Scrum and Waterfall project management with Google certificate.", careerRelevance: "Opens doors to PM roles across engineering and consulting sectors.", branch: ["civil", "mechanical", "computer"] },
  { title: "STAAD Pro Foundation Training", platform: "Udemy", instructor: "CE Passion", duration: "10 hours", difficulty: "Beginner", url: "https://www.udemy.com/course/staad-pro-for-beginners/", description: "Structural analysis and design using STAAD Pro from Bentley.", careerRelevance: "Industry-standard software for Structural Engineers in India.", branch: ["civil"] },

  // ── Electrical Engineering ───────────────────────────────────────────────────
  { title: "Electric Power Systems", platform: "Coursera", instructor: "University at Buffalo", duration: "4 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/learn/electric-power-systems", description: "Power flow, fault analysis, stability and grid operations.", careerRelevance: "Required for Power Systems and Grid Engineering roles.", branch: ["electrical"] },
  { title: "PLC Programming with Siemens S7-300", platform: "Udemy", instructor: "Laz Diaz", duration: "8 hours", difficulty: "Beginner", url: "https://www.udemy.com/course/step7-professional/", description: "Ladder logic, function blocks and automation with Siemens PLCs.", careerRelevance: "Core skill for Industrial Automation and Control Engineer roles.", branch: ["electrical", "electronics"] },
  { title: "Control Systems", platform: "Coursera", instructor: "Georgia Tech", duration: "8 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/learn/controlsystems", description: "Stability, Bode plots, root locus and PID controller design.", careerRelevance: "Essential for Control, Automation and Robotics Engineer roles.", branch: ["electrical", "electronics"] },
  { title: "Power Electronics", platform: "Coursera", instructor: "University of Colorado Boulder", duration: "4 months", difficulty: "Advanced", url: "https://www.coursera.org/specializations/power-electronics", description: "DC-DC converters, inverters and rectifiers with MATLAB simulation.", careerRelevance: "Specialised skill for EV, Renewable Energy and Power roles.", branch: ["electrical"] },

  // ── Electronics & Communication ───────────────────────────────────────────────
  { title: "Arduino Step-by-Step", platform: "Udemy", instructor: "Peter Dalmaris", duration: "23 hours", difficulty: "Beginner", url: "https://www.udemy.com/course/arduino-sbs-17gs/", description: "Build real embedded systems with Arduino from ground up.", careerRelevance: "Foundation for IoT, Robotics and Embedded Systems Engineer roles.", branch: ["electronics"] },
  { title: "Embedded Systems — Shape the World", platform: "Coursera", instructor: "UT Austin", duration: "16 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/learn/embedded-systems-shape-the-world-microcontroller-inputoutput", description: "ARM Cortex-M microcontroller programming in C.", careerRelevance: "Core preparation for Embedded Systems Engineer roles.", branch: ["electronics"] },
  { title: "VLSI CAD Part I: Logic", platform: "Coursera", instructor: "UIUC", duration: "8 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/learn/vlsi-cad-layout", description: "Boolean logic, binary decision diagrams and logic synthesis.", careerRelevance: "Foundation for VLSI Design and Semiconductor Engineer roles.", branch: ["electronics"] },
  { title: "Digital Signal Processing", platform: "Coursera", instructor: "EPFL", duration: "4 months", difficulty: "Advanced", url: "https://www.coursera.org/specializations/digital-signal-processing", description: "Signal processing theory with Python and MATLAB implementations.", careerRelevance: "Required for DSP, Telecom and Signal Processing Engineer roles.", branch: ["electronics", "electrical"] },

  // ── Practice Platforms ────────────────────────────────────────────────────────
  { title: "LeetCode Problem Set", platform: "LeetCode", instructor: "LeetCode", duration: "Self-paced", difficulty: "Beginner", url: "https://leetcode.com/problemset/", description: "3000+ coding problems for placement and interview preparation.", careerRelevance: "Must-do for cracking FAANG and product company SDE interviews.", branch: ["computer", "it", "software"] },
  { title: "CSES Problem Set", platform: "CSES", instructor: "CSES", duration: "Self-paced", difficulty: "Intermediate", url: "https://cses.fi/problemset/", description: "Classic algorithmic problems — sorting, graphs, DP, trees.", careerRelevance: "Best structured practice set for competitive programming.", branch: ["computer", "it", "software"] },
  { title: "HackerRank", platform: "HackerRank", instructor: "HackerRank", duration: "Self-paced", difficulty: "Beginner", url: "https://www.hackerrank.com/", description: "Coding challenges across algorithms, SQL, ML and front end.", careerRelevance: "Used by 2000+ companies as a screening tool for SDE roles.", branch: ["computer", "it", "software"] },

  // ── Free Course Platforms ─────────────────────────────────────────────────────
  { title: "freeCodeCamp — Full Stack", platform: "freeCodeCamp", instructor: "freeCodeCamp", duration: "300+ hours", difficulty: "Beginner", url: "https://www.freecodecamp.org/learn", description: "Free 3000+ hour curriculum covering HTML, CSS, JS, React, Node.", careerRelevance: "Best free structured path for Web Developer and MERN stack roles.", branch: ["computer", "it", "software"] },
  { title: "The Odin Project", platform: "The Odin Project", instructor: "Open Source", duration: "Self-paced", difficulty: "Beginner", url: "https://www.theodinproject.com/", description: "Open-source full-stack curriculum from zero to job-ready.", careerRelevance: "Industry-trusted free path for Full-Stack Developer roles.", branch: ["computer", "it", "software"] },
  { title: "Kaggle Learn", platform: "Kaggle", instructor: "Kaggle", duration: "Self-paced", difficulty: "Beginner", url: "https://www.kaggle.com/learn", description: "Free micro-courses on Python, ML, deep learning, SQL and more.", careerRelevance: "Best starting point for Data Scientist and ML Engineer roles.", branch: ["computer", "data"] },
  { title: "fast.ai — Practical Deep Learning", platform: "fast.ai", instructor: "Jeremy Howard", duration: "Self-paced", difficulty: "Intermediate", url: "https://course.fast.ai/", description: "Top-down approach to deep learning — free course and notebooks.", careerRelevance: "Highly rated by ML practitioners for practical AI engineering.", branch: ["computer", "data"] },
  { title: "MIT OpenCourseWare", platform: "MIT OCW", instructor: "MIT Faculty", duration: "Self-paced", difficulty: "Intermediate", url: "https://ocw.mit.edu/", description: "Free MIT lecture notes and assignments across all engineering disciplines.", careerRelevance: "World-class reference material for all core engineering subjects.", branch: ["computer", "mechanical", "civil", "electrical", "electronics", "data"] },
  { title: "Khan Academy — Mathematics", platform: "Khan Academy", instructor: "Sal Khan", duration: "Self-paced", difficulty: "Beginner", url: "https://www.khanacademy.org/math", description: "Free video lessons on calculus, linear algebra, statistics and more.", careerRelevance: "Essential foundation for engineering aptitude.", branch: ["computer", "mechanical", "civil", "electrical", "electronics", "it", "data"] },
  { title: "3Blue1Brown — Math Visualised", platform: "YouTube", instructor: "Grant Sanderson", duration: "Self-paced", difficulty: "Beginner", url: "https://www.3blue1brown.com/", description: "Beautiful visual explanations of linear algebra, calculus and more.", careerRelevance: "Builds deep mathematical intuition for AI, ML and engineering.", branch: ["computer", "electrical", "electronics", "data"] },
  { title: "SolidWorks Tutorials", platform: "SolidWorks", instructor: "Dassault Systèmes", duration: "Self-paced", difficulty: "Beginner", url: "https://www.solidworks.com/support/training-resources", description: "Official Dassault SolidWorks tutorial library — parts, assemblies, drawings.", careerRelevance: "Essential CAD skill for Mechanical Design and Manufacturing roles.", branch: ["mechanical", "civil"] },
];


// Returns courses filtered by branch keyword, shuffled, up to `limit`
export function getCatalogCourses(branch: string, skills: string[] = [], limit = 6): CatalogCourse[] {
  const b = branch.toLowerCase();

  // Detect branch tag
  const tag =
    b.includes("computer") || b.includes("cse") || b.includes("it") || b.includes("software") || b.includes("information")
      ? "computer"
      : b.includes("mechanical")
      ? "mechanical"
      : b.includes("civil")
      ? "civil"
      : b.includes("electrical")
      ? "electrical"
      : b.includes("electronics") || b.includes("ece") || b.includes("communication")
      ? "electronics"
      : "computer"; // default fallback

  const filtered = COURSE_CATALOG.filter((c) => c.branch.includes(tag));
  const pool = filtered.length >= limit ? filtered : COURSE_CATALOG; // widen pool if branch has few results

  // Shuffle and return
  return [...pool].sort(() => Math.random() - 0.5).slice(0, limit);
}
