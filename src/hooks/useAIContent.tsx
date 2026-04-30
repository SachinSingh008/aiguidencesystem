import {
  createContext, useCallback, useContext, useEffect,
  useState, useRef, ReactNode,
} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AICourse = {
  title: string;
  platform: string;
  instructor: string;
  duration: string;
  difficulty: string;
  url: string;
  description: string;
};

export type AIStudyMaterial = {
  title: string;
  type: string;
  subject: string;
  url: string;
  description: string;
};

export type AICareerPath = {
  title: string;
  description: string;
  salary: string;
  growth: string;
  skills: string[];
  modules: { title: string; steps: string[] }[];
};

export type AIMockTest = {
  id: number;
  title: string;
  topic: string;
  difficulty: string;
  duration: string;
  questions: { q: string; options: string[]; answer: number }[];
};

export type AIContent = {
  courses: AICourse[];
  studyMaterials: AIStudyMaterial[];
  careerPaths: AICareerPath[];
  mockTests: AIMockTest[];
};

const EMPTY: AIContent = { courses: [], studyMaterials: [], careerPaths: [], mockTests: [] };

// ─── Gemini API ───────────────────────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(profile: {
  name: string; branch: string; year: string;
  skills: string[]; interests: string[];
}): Promise<AIContent> {
  const prompt = `You are an expert career counselor for engineering students in India.

Student Profile:
- Name: ${profile.name}
- Branch: ${profile.branch}
- Year: ${profile.year}
- Skills: ${profile.skills.join(", ") || "None listed"}
- Interests: ${profile.interests.join(", ") || "None listed"}

Based on this student's profile, generate EXACTLY:
- 3 recommended online courses (CRITICAL: Do NOT guess specific course URLs as they 404. You MUST use robust search URLs like https://www.youtube.com/results?search_query=topic or https://www.coursera.org/search?query=topic or https://www.udemy.com/courses/search/?src=ukw&q=topic)
- 3 study materials (CRITICAL: Do NOT guess specific URLs. Use https://www.google.com/search?q=topic+pdf or youtube search links)
- 3 career paths (realistic for their branch and interests). For EACH career path, generate a HIGHLY DETAILED roadmap split into exactly 4-6 modules, where each module has 4-5 concrete steps (total 20-30 steps per career path).
- 2 mock tests (each with exactly 5 multiple choice questions relevant to their skills)

Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "courses": [
    {
      "title": "Course Name",
      "platform": "YouTube/Coursera/Udemy",
      "instructor": "Instructor Name",
      "duration": "X hours",
      "difficulty": "Beginner/Intermediate/Advanced",
      "url": "https://www.youtube.com/results?search_query=exact+course+name",
      "description": "One sentence about what they'll learn"
    }
  ],
  "studyMaterials": [
    {
      "title": "Resource Name",
      "type": "Notes/Documentation/eBook/Video Series/Cheat Sheet",
      "subject": "Subject Name",
      "url": "https://www.google.com/search?q=resource+name+pdf",
      "description": "One sentence about this resource"
    }
  ],
  "careerPaths": [
    {
      "title": "Job Title",
      "description": "2-3 sentences about this career",
      "salary": "₹X LPA - ₹Y LPA",
      "growth": "High/Medium/Low demand",
      "skills": ["skill1", "skill2", "skill3"],
      "modules": [
        {
          "title": "Module 1: Core Fundamentals",
          "steps": ["Learn X", "Practice Y", "Build Z", "Understand W", "Read V"]
        },
        {
          "title": "Module 2: Advanced Topics",
          "steps": ["Master A", "Build B", "Test C", "Deploy D", "Optimize E"]
        }
      ]
    }
  ],
  "mockTests": [
    {
      "id": 1,
      "title": "React Basics",
      "topic": "Frontend",
      "difficulty": "Beginner",
      "duration": "10",
      "questions": [
        { "q": "What is JSX?", "options": ["Array", "Syntax", "Function", "Hook"], "answer": 1 }
      ]
    }
  ]
}`;

  if (!GEMINI_API_KEY) {
    throw new Error("Missing VITE_GEMINI_API_KEY in .env file. Please add your Gemini API key.");
  }

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        temperature: 0.7, 
        maxOutputTokens: 2048,
        responseMimeType: "application/json"
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini API detailed error:", errText);
    let errMsg = `Gemini API error: ${res.status}`;
    try {
      const parsedErr = JSON.parse(errText);
      if (parsedErr.error?.message) {
        errMsg = parsedErr.error.message;
      }
    } catch { }

      // Fallback if the user's Google API quota is exceeded (429) so the app still functions
      if (res.status === 429) {
        console.warn("Gemini API rate limited (429). Using fallback offline data.");
        return getFallbackContent(profile);
      }
      
      throw new Error(errMsg);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Strip markdown code fences if present
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const parsed = JSON.parse(cleaned) as AIContent;

  // Validate structure
  if (!parsed.courses || !parsed.studyMaterials || !parsed.careerPaths || !parsed.mockTests) {
    throw new Error("Invalid response structure from Gemini");
  }
  return {
    courses: (parsed.courses || []).slice(0, 3),
    studyMaterials: (parsed.studyMaterials || []).slice(0, 3),
    careerPaths: (parsed.careerPaths || []).slice(0, 3),
    mockTests: (parsed.mockTests || []).slice(0, 2),
  };
}

function getFallbackContent(profile: any): AIContent {
  const branch = profile.branch || "";
  const skillsStr = (profile.skills || []).join(" ").toLowerCase();
  const interestsStr = (profile.interests || []).join(" ").toLowerCase();
  
  const isQA = skillsStr.includes("testing") || skillsStr.includes("qa") || skillsStr.includes("postman") || interestsStr.includes("testing");
  const isMech = branch.toLowerCase().includes("mechanical");
  const isCivil = branch.toLowerCase().includes("civil");
  const isEE = branch.toLowerCase().includes("electrical") && !branch.toLowerCase().includes("electronics");
  const isECE = branch.toLowerCase().includes("electronic") || branch.toLowerCase().includes("telecommunication") || branch.toLowerCase().includes("extc");
  const isChem = branch.toLowerCase().includes("chemical");
  const isCS = branch.toLowerCase().includes("computer") || branch.toLowerCase().includes("it") || branch.toLowerCase().includes("software");

  if (isQA) {
    return {
      courses: [
        {
          title: "Software Testing Full Course In 10 Hours",
          platform: "YouTube",
          instructor: "Edureka",
          duration: "10 Hours",
          difficulty: "Beginner",
          url: "https://www.youtube.com/watch?v=goaZTAzsLMk",
          description: "Learn Manual Testing, Agile, Jira, and API Testing."
        },
        {
          title: "Postman API Testing Tutorial - Crash Course",
          platform: "YouTube",
          instructor: "Automation Step by Step",
          duration: "2.5 Hours",
          difficulty: "Intermediate",
          url: "https://www.youtube.com/watch?v=Fhg5CCObMNs",
          description: "Master API testing using Postman."
        },
        {
          title: "Selenium Full Course - Learn Selenium in 12 Hours",
          platform: "YouTube",
          instructor: "Edureka",
          duration: "12 Hours",
          difficulty: "Advanced",
          url: "https://www.youtube.com/watch?v=FRn5J31eAMw",
          description: "Top-rated automation testing course."
        }
      ],
      studyMaterials: [
        {
          title: "Software Testing Fundamentals",
          type: "Documentation",
          subject: "QA Basics",
          url: "https://www.guru99.com/software-testing.html",
          description: "The complete guide to manual testing and QA processes."
        },
        {
          title: "Postman Documentation",
          type: "Documentation",
          subject: "API Testing",
          url: "https://learning.postman.com/docs/getting-started/introduction/",
          description: "Official guide to using Postman."
        },
        {
          title: "MySQL Cheat Sheet",
          type: "Cheat Sheet",
          subject: "Database",
          url: "https://www.mysqltutorial.org/mysql-cheat-sheet/",
          description: "Quick reference for SQL queries."
        }
      ],
      careerPaths: [
        {
          title: "QA Engineer (Manual + API)",
          description: "Ensure software quality by writing test cases and testing APIs.",
          salary: "₹4 LPA - ₹9 LPA",
          growth: "High demand",
          skills: ["Manual Testing", "Postman", "SQL", "Jira"],
          modules: [
            {
              title: "Module 1: Software Testing Basics",
              steps: ["Understand SDLC and STLC", "Learn Black Box & White Box Testing", "Write comprehensive Test Cases", "Learn Defect Life Cycle", "Master Agile & Scrum basics"]
            },
            {
              title: "Module 2: Database & API Fundamentals",
              steps: ["Learn SQL queries (Joins, Subqueries)", "Understand HTTP methods (GET, POST)", "Learn JSON & REST APIs", "Install & Configure Postman", "Write first API test"]
            },
            {
              title: "Module 3: Advanced API Testing",
              steps: ["Write assertions in Postman", "Automate Postman collections with Newman", "Learn API Mocking", "Understand OAuth and Authentication", "Integrate API tests in CI/CD"]
            },
            {
              title: "Module 4: Career Prep & Projects",
              steps: ["Test an open-source project", "Create a defect report portfolio", "Practice top QA interview questions", "Optimize LinkedIn profile", "Apply for Junior QA roles"]
            }
          ]
        },
        {
          title: "Automation Tester",
          description: "Write code to automatically test software applications.",
          salary: "₹6 LPA - ₹14 LPA",
          growth: "Very High",
          skills: ["Java/Python", "Selenium", "TestNG", "Git"],
          modules: [
            {
              title: "Module 1: Programming Foundations",
              steps: ["Master Java or Python syntax", "Learn Object-Oriented Programming", "Understand Collections & Data Structures", "Learn Exception Handling", "Practice coding problems"]
            },
            {
              title: "Module 2: Selenium WebDriver Basics",
              steps: ["Setup Selenium environment", "Learn Web Locators (XPath, CSS)", "Automate browser actions", "Handle Dropdowns and Alerts", "Manage Multiple Windows"]
            },
            {
              title: "Module 3: Frameworks & Advanced Tools",
              steps: ["Learn TestNG or JUnit", "Implement Page Object Model (POM)", "Learn Data-Driven Testing", "Integrate Apache POI for Excel", "Handle Wait mechanisms properly"]
            },
            {
              title: "Module 4: Real-world Implementation",
              steps: ["Use Git & GitHub for version control", "Build a complete Hybrid Framework", "Run tests using Maven", "Generate Extent Reports", "Apply for Automation roles"]
            }
          ]
        },
        {
          title: "SDET (Software Dev Engineer in Test)",
          description: "Highly skilled role combining software development and testing.",
          salary: "₹10 LPA - ₹25 LPA",
          growth: "Very High",
          skills: ["Programming", "System Design", "CI/CD", "Automation"],
          modules: [
            {
              title: "Module 1: Advanced Programming",
              steps: ["Master DSA (Arrays, Trees, Graphs)", "Learn System Design basics", "Write clean, scalable code", "Understand microservices architecture", "Learn cloud basics (AWS/Azure)"]
            },
            {
              title: "Module 2: Full-Stack Automation",
              steps: ["Automate UI with Playwright/Selenium", "Automate APIs with RestAssured", "Automate Mobile apps with Appium", "Performance testing with JMeter", "Security testing basics"]
            },
            {
              title: "Module 3: DevOps & CI/CD",
              steps: ["Master Docker containers", "Learn Kubernetes basics", "Setup Jenkins pipelines", "Integrate tests into GitHub Actions", "Understand Continuous Deployment"]
            },
            {
              title: "Module 4: Top Tech Prep",
              steps: ["Practice LeetCode (Medium/Hard)", "Build an end-to-end testing platform", "Mock interviews for SDET roles", "Contribute to testing open-source", "Apply to FAANG & top tier companies"]
            }
          ]
        }
      ],
      mockTests: [
        {
          id: 1, title: "Manual Testing Basics", topic: "QA", difficulty: "Beginner", duration: "10",
          questions: [
            { q: "What is Black Box testing?", options: ["Testing internal code", "Testing functionality without knowing code", "Testing APIs", "Testing databases"], answer: 1 },
            { q: "What does QA stand for?", options: ["Quality Assurance", "Quick Action", "Quality Assessment", "Quality Automation"], answer: 0 },
            { q: "Which is a valid bug status?", options: ["Running", "Executing", "In Progress", "Code"], answer: 2 },
            { q: "What is regression testing?", options: ["Testing old bugs", "Testing new features", "Ensuring new code doesn't break old features", "Performance testing"], answer: 2 },
            { q: "Which tool is used for defect tracking?", options: ["Eclipse", "VS Code", "Jira", "Postman"], answer: 2 }
          ]
        },
        {
          id: 2, title: "API Testing with Postman", topic: "API", difficulty: "Intermediate", duration: "10",
          questions: [
            { q: "What is a 200 OK status?", options: ["Error", "Success", "Not Found", "Unauthorized"], answer: 1 },
            { q: "Which HTTP method is used to create data?", options: ["GET", "POST", "DELETE", "PUT"], answer: 1 },
            { q: "Which tool is best for API Testing?", options: ["Selenium", "JMeter", "Postman", "Appium"], answer: 2 },
            { q: "What is a 404 status code?", options: ["Success", "Internal Server Error", "Not Found", "Bad Request"], answer: 2 },
            { q: "What is REST?", options: ["Database", "Testing Tool", "Architectural Style", "Programming Language"], answer: 2 }
          ]
        }
      ]
    };
  }

  if (isMech) {
    return {
      courses: [
        {
          title: "AutoCAD 2024 - Full Course for Beginners",
          platform: "YouTube",
          instructor: "CAD in black",
          duration: "2 Hours",
          difficulty: "Beginner",
          url: "https://www.youtube.com/watch?v=cmJkXl_3M9Y",
          description: "Master AutoCAD from scratch for 2D and 3D drafting."
        },
        {
          title: "Engineering Mechanics Complete Course",
          platform: "YouTube",
          instructor: "Gate Academy",
          duration: "15 Hours",
          difficulty: "Intermediate",
          url: "https://www.youtube.com/watch?v=wGvA621_YVw",
          description: "Comprehensive core engineering concepts for Mechanical Engineers."
        },
        {
          title: "Solidworks Tutorial for Beginners",
          platform: "YouTube",
          instructor: "CAD CAM TUTORIAL",
          duration: "3 Hours",
          difficulty: "Advanced",
          url: "https://www.youtube.com/watch?v=xTzH3E5y-X8",
          description: "Industry-standard certification course for 3D modeling."
        }
      ],
      studyMaterials: [
        {
          title: "Thermodynamics Formulas",
          type: "Cheat Sheet",
          subject: "Thermal Engineering",
          url: "https://www.google.com/search?q=thermodynamics+formulas+cheat+sheet+pdf",
          description: "Quick revision guide for exams and interviews."
        },
        {
          title: "Fluid Mechanics Notes",
          type: "Documentation",
          subject: "Fluid Dynamics",
          url: "https://www.youtube.com/results?search_query=nptel+fluid+mechanics",
          description: "In-depth notes on fluid properties and dynamics."
        },
        {
          title: "Mechanical Interview Questions",
          type: "eBook",
          subject: "Placements",
          url: "https://www.indiabix.com/mechanical-engineering/questions-and-answers/",
          description: "Top 100 questions asked in core mechanical campus placements."
        }
      ],
      careerPaths: [
        {
          title: "Design Engineer",
          description: "Design physical products and machinery using CAD software.",
          salary: "₹4 LPA - ₹10 LPA",
          growth: "Medium demand",
          skills: ["AutoCAD", "SolidWorks", "ANSYS", "GD&T"],
          modules: [
            {
              title: "Module 1: Drafting Basics",
              steps: ["Learn Engineering Drawing principles", "Master AutoCAD 2D basics", "Understand Orthographic Projections", "Learn GD&T standard symbols", "Create detailed technical drawings"]
            },
            {
              title: "Module 2: 3D Modeling",
              steps: ["Learn SolidWorks or CATIA", "Create 3D parts and assemblies", "Understand surface modeling", "Learn sheet metal design", "Perform motion study analysis"]
            },
            {
              title: "Module 3: Simulation & Analysis",
              steps: ["Learn ANSYS basics", "Perform Static Structural Analysis", "Understand FEA (Finite Element Analysis)", "Analyze thermal stresses", "Optimize designs based on simulation"]
            },
            {
              title: "Module 4: Professional Development",
              steps: ["Build a design portfolio", "Take CSWA certification", "Prepare for core technical interviews", "Update LinkedIn profile", "Apply for Design Engineer roles"]
            }
          ]
        },
        {
          title: "HVAC Engineer",
          description: "Design and implement heating, ventilation, and air conditioning systems.",
          salary: "₹3.5 LPA - ₹9 LPA",
          growth: "High demand",
          skills: ["Thermodynamics", "Fluid Mechanics", "AutoCAD MEP", "Heat Transfer"],
          modules: [
            {
              title: "Module 1: Core Fundamentals",
              steps: ["Review Thermodynamics principles", "Master Psychrometry and Air Conditioning", "Understand Heat Transfer modes", "Learn Refrigeration cycles", "Study ASHRAE standards basics"]
            },
            {
              title: "Module 2: HVAC System Design",
              steps: ["Calculate heating and cooling loads", "Learn duct sizing and design", "Understand piping design for chilled water", "Select equipment (Chillers, AHUs)", "Learn to use HAP software"]
            },
            {
              title: "Module 3: Drafting & Implementation",
              steps: ["Master AutoCAD MEP", "Create HVAC layout drawings", "Learn Revit MEP for BIM modeling", "Coordinate with electrical/plumbing", "Understand site execution basics"]
            },
            {
              title: "Module 4: Career Launch",
              steps: ["Get HVAC design certification", "Prepare for MEP interviews", "Build a small project portfolio", "Network with MEP consultants", "Apply for HVAC design/site roles"]
            }
          ]
        },
        {
          title: "Manufacturing Engineer",
          description: "Optimize production processes and oversee manufacturing operations.",
          salary: "₹4 LPA - ₹12 LPA",
          growth: "Stable demand",
          skills: ["Lean Six Sigma", "Process Planning", "CNC Programming", "Quality Control"],
          modules: [
            {
              title: "Module 1: Manufacturing Processes",
              steps: ["Study machining operations (Lathe, Milling)", "Learn casting and welding processes", "Understand non-traditional machining", "Study material science properties", "Learn metrology and inspection"]
            },
            {
              title: "Module 2: Automation & CNC",
              steps: ["Learn G-Code and M-Code programming", "Understand CNC machine operations", "Learn basic robotics for assembly", "Study PLC basics", "Understand CIM (Computer Integrated Manufacturing)"]
            },
            {
              title: "Module 3: Optimization & Quality",
              steps: ["Learn Lean Manufacturing principles", "Understand Six Sigma basics", "Study inventory management (JIT)", "Learn Root Cause Analysis tools", "Implement 5S on the shop floor"]
            },
            {
              title: "Module 4: Industry Prep",
              steps: ["Take Six Sigma Yellow Belt", "Prepare for production engineering interviews", "Understand plant safety protocols", "Create an operational resume", "Apply to automotive/manufacturing firms"]
            }
          ]
        }
      ],
      mockTests: [
        {
          id: 1, title: "Thermodynamics Basics", topic: "Thermal", difficulty: "Intermediate", duration: "10",
          questions: [
            { q: "What is the First Law of Thermodynamics?", options: ["Energy cannot be created or destroyed", "Entropy of universe increases", "Absolute zero is unreachable", "Heat flows hot to cold"], answer: 0 },
            { q: "Which cycle is used in petrol engines?", options: ["Diesel Cycle", "Otto Cycle", "Rankine Cycle", "Brayton Cycle"], answer: 1 },
            { q: "What is the unit of Entropy?", options: ["Joule", "Watt", "J/K", "Pa"], answer: 2 },
            { q: "An adiabatic process is one in which...", options: ["Volume is constant", "Pressure is constant", "Temperature is constant", "No heat is exchanged"], answer: 3 },
            { q: "Which cycle is most efficient between two temps?", options: ["Stirling", "Ericsson", "Carnot", "Dual"], answer: 2 }
          ]
        },
        {
          id: 2, title: "Mechanics of Materials", topic: "SOM", difficulty: "Beginner", duration: "10",
          questions: [
            { q: "What is Hooke's Law?", options: ["Stress is proportional to strain", "Force equals mass times acceleration", "Pressure is constant", "Volume is proportional to temp"], answer: 0 },
            { q: "What is the unit of stress?", options: ["Newton", "N/m^2", "Joule", "Watt"], answer: 1 },
            { q: "What does a Tensile Test measure?", options: ["Hardness", "Toughness", "Yield Strength", "Fatigue"], answer: 2 },
            { q: "Which material is highly ductile?", options: ["Cast Iron", "Glass", "Copper", "Concrete"], answer: 2 },
            { q: "What is the formula for stress?", options: ["Force x Area", "Force / Area", "Mass x Accel", "Work / Time"], answer: 1 }
          ]
        }
      ]
    };
  }

  if (isCivil) {
    return {
      courses: [
        { title: "AutoCAD Civil 3D Masterclass", platform: "Udemy", instructor: "Civil Tech", duration: "20 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?src=ukw&q=autocad+civil+3d", description: "Master 3D drafting for civil engineering." },
        { title: "Structural Analysis & Design", platform: "NPTEL", instructor: "IIT Kharagpur", duration: "12 Weeks", difficulty: "Intermediate", url: "https://www.youtube.com/results?search_query=nptel+structural+analysis", description: "Core concepts of structural engineering." },
        { title: "Construction Project Management", platform: "Coursera", instructor: "Columbia University", duration: "4 Weeks", difficulty: "Advanced", url: "https://www.coursera.org/learn/construction-project-management", description: "Learn to manage large-scale construction projects." }
      ],
      studyMaterials: [
        { title: "IS Codes (456, 800)", type: "Documentation", subject: "Standards", url: "https://law.resource.org/pub/in/bis/S03/is.456.2000.pdf", description: "Indian Standard codes for civil practice." },
        { title: "Strength of Materials Formulas", type: "Cheat Sheet", subject: "SOM", url: "https://www.google.com/search?q=strength+of+materials+formulas+cheat+sheet+pdf", description: "Quick formulas for exam prep." },
        { title: "Civil Interview Questions", type: "eBook", subject: "Placements", url: "https://www.indiabix.com/civil-engineering/questions-and-answers/", description: "Top questions asked in L&T, Tata Projects." }
      ],
      careerPaths: [
        {
          title: "Structural Engineer", description: "Design safe and stable structures like buildings and bridges.", salary: "₹4 LPA - ₹12 LPA", growth: "Stable", skills: ["STAAD.Pro", "ETABS", "AutoCAD", "IS Codes"],
          modules: [
            { title: "Module 1: Core Concepts", steps: ["Master Strength of Materials", "Understand Structural Analysis", "Learn Concrete Design", "Learn Steel Design"] },
            { title: "Module 2: Software Skills", steps: ["Learn AutoCAD 2D", "Master STAAD.Pro", "Learn ETABS", "Understand SAP2000"] },
            { title: "Module 3: Advanced Topics", steps: ["Study Earthquake Engineering", "Learn Foundation Design", "Understand Pre-stressed concrete", "Study Wind Load Analysis"] },
            { title: "Module 4: Career Prep", steps: ["Build a design portfolio", "Take NPTEL certification", "Apply to design consultancies", "Prepare for technical interviews"] }
          ]
        },
        {
          title: "Site / Execution Engineer", description: "Manage on-site construction activities and ensure quality.", salary: "₹3 LPA - ₹8 LPA", growth: "High", skills: ["Surveying", "Project Management", "Estimation", "Safety"],
          modules: [
            { title: "Module 1: Site Basics", steps: ["Learn Surveying techniques", "Understand reading blueprints", "Learn concrete mix design", "Study site safety protocols"] },
            { title: "Module 2: Project Management", steps: ["Learn Construction Management", "Understand CPM & PERT charts", "Learn Primavera P6 or MS Project", "Study material estimation"] },
            { title: "Module 3: Quality Control", steps: ["Learn non-destructive testing", "Understand soil mechanics", "Learn quality assurance checks", "Study building codes"] },
            { title: "Module 4: Industry Entry", steps: ["Get a site internship", "Develop leadership skills", "Network with contractors", "Apply for L&T/Tata drives"] }
          ]
        },
        {
          title: "Transportation Engineer", description: "Design and manage highways, railways, and traffic systems.", salary: "₹4 LPA - ₹10 LPA", growth: "High", skills: ["Civil 3D", "Traffic Analysis", "Pavement Design"],
          modules: [
            { title: "Module 1: Highways", steps: ["Learn geometric design of highways", "Study pavement materials", "Understand traffic engineering", "Learn highway maintenance"] },
            { title: "Module 2: Railways & Airports", steps: ["Learn railway track design", "Study airport layout", "Understand signaling systems", "Learn harbor engineering basics"] },
            { title: "Module 3: Software", steps: ["Master AutoCAD Civil 3D", "Learn MX Road", "Understand GIS tools", "Learn traffic simulation software"] },
            { title: "Module 4: Jobs", steps: ["Prepare for GATE", "Apply for NHAI/Govt roles", "Apply to infrastructure firms", "Build specialized resume"] }
          ]
        }
      ],
      mockTests: [
        { id: 1, title: "Strength of Materials", topic: "SOM", difficulty: "Intermediate", duration: "10", questions: [{ q: "What is Poisson's Ratio?", options: ["Lateral/Linear Strain", "Linear/Lateral Strain", "Stress/Strain", "Load/Area"], answer: 0 }, { q: "Unit of Bending Moment?", options: ["N", "N/m", "Nm", "Pa"], answer: 2 }, { q: "Maximum shear stress in a rectangular beam is?", options: ["1.5 x avg", "2 x avg", "1.33 x avg", "Equal to avg"], answer: 0 }, { q: "Point of contraflexure occurs where?", options: ["Shear force is zero", "Bending moment is zero", "Deflection is zero", "Slope is zero"], answer: 1 }, { q: "What is Young's Modulus?", options: ["Stress/Strain", "Shear/Strain", "Bulk/Strain", "Load/Strain"], answer: 0 }] },
        { id: 2, title: "Surveying Basics", topic: "Survey", difficulty: "Beginner", duration: "10", questions: [{ q: "What is a benchmark?", options: ["Fixed reference point of known elevation", "A type of bench", "A surveying tool", "A map symbol"], answer: 0 }, { q: "The instrument used to measure angles?", options: ["Theodolite", "Dumpy Level", "Chain", "Plumb bob"], answer: 0 }, { q: "Contour lines close together indicate?", options: ["Flat terrain", "Steep slope", "A valley", "A river"], answer: 1 }, { q: "What is chaining?", options: ["Measuring distance", "Measuring angles", "Measuring elevation", "Drawing a map"], answer: 0 }, { q: "GPS stands for?", options: ["Global Positioning System", "Geo Point System", "Global Pointing Station", "Great Position System"], answer: 0 }] }
      ]
    };
  }

  if (isEE) {
    return {
      courses: [
        { title: "Power Systems Engineering", platform: "NPTEL", instructor: "IIT Delhi", duration: "12 Weeks", difficulty: "Advanced", url: "https://www.youtube.com/results?search_query=nptel+power+systems+engineering", description: "Comprehensive study of power grids and generation." },
        { title: "MATLAB for Engineers", platform: "Coursera", instructor: "Vanderbilt University", duration: "4 Weeks", difficulty: "Beginner", url: "https://www.coursera.org/learn/matlab", description: "Learn MATLAB for electrical simulations." },
        { title: "Electric Vehicles (EV) Technology", platform: "Udemy", instructor: "EV Academy", duration: "15 hours", difficulty: "Intermediate", url: "https://www.udemy.com/courses/search/?src=ukw&q=electric+vehicles", description: "Dive into EV batteries, motors, and controllers." }
      ],
      studyMaterials: [
        { title: "Electrical Machines Notes", type: "Documentation", subject: "Core", url: "https://www.youtube.com/results?search_query=nptel+electrical+machines", description: "Transformers and motors concepts." },
        { title: "Circuit Theory Cheat Sheet", type: "Cheat Sheet", subject: "Circuits", url: "https://www.google.com/search?q=circuit+theory+formulas+cheat+sheet+pdf", description: "KVL, KCL, and network theorems." },
        { title: "Core EE Interview Questions", type: "eBook", subject: "Placements", url: "https://www.indiabix.com/electrical-engineering/questions-and-answers/", description: "Top questions asked in core electrical companies." }
      ],
      careerPaths: [
        {
          title: "Power Systems Engineer", description: "Design, maintain, and optimize power generation and distribution systems.", salary: "₹4 LPA - ₹12 LPA", growth: "Stable", skills: ["Power Systems", "ETAP", "MATLAB", "Switchgear"],
          modules: [
            { title: "Module 1: Core Grids", steps: ["Learn power generation basics", "Study transmission lines", "Understand distribution systems", "Learn switchgear and protection"] },
            { title: "Module 2: Analysis Tools", steps: ["Learn MATLAB/Simulink", "Master ETAP software", "Perform load flow analysis", "Study short circuit analysis"] },
            { title: "Module 3: Advanced Power", steps: ["Understand smart grids", "Learn about HVDC transmission", "Study renewable integration", "Understand power quality issues"] },
            { title: "Module 4: Career Launch", steps: ["Prepare for GATE", "Apply for PSU roles (BHEL, PGCIL)", "Apply to private energy firms", "Build ETAP portfolio"] }
          ]
        },
        {
          title: "Control Systems Engineer", description: "Design systems that control machinery and processes in automation.", salary: "₹5 LPA - ₹15 LPA", growth: "High", skills: ["Control Theory", "PLC/SCADA", "Automation", "Instrumentation"],
          modules: [
            { title: "Module 1: Fundamentals", steps: ["Master Control Systems theory", "Understand PID controllers", "Learn root locus and bode plots", "Study state space analysis"] },
            { title: "Module 2: Industrial Automation", steps: ["Learn PLC programming (Allen Bradley/Siemens)", "Understand SCADA systems", "Learn HMI design", "Study industrial sensors/actuators"] },
            { title: "Module 3: Digital & Advanced", steps: ["Learn microcontrollers", "Study digital control systems", "Understand robotics basics", "Learn DCS (Distributed Control Systems)"] },
            { title: "Module 4: Jobs", steps: ["Get automation certification", "Build a small PLC project", "Apply to SIEMENS/ABB/Schneider", "Prepare for automation interviews"] }
          ]
        },
        {
          title: "EV / Renewable Energy Engineer", description: "Work on solar, wind, and the booming electric vehicle industry.", salary: "₹5 LPA - ₹14 LPA", growth: "Very High", skills: ["Battery Management", "Power Electronics", "Solar PV", "Simulink"],
          modules: [
            { title: "Module 1: EV Basics", steps: ["Study electric motors (BLDC, PMSM)", "Understand Battery Management Systems (BMS)", "Learn EV charging infrastructure", "Study power electronics converters"] },
            { title: "Module 2: Renewables", steps: ["Learn Solar PV system design", "Understand wind turbine generators", "Study grid integration of renewables", "Learn energy storage systems"] },
            { title: "Module 3: Software & Sim", steps: ["Master MATLAB/Simulink for EV", "Learn PVSyst", "Study Homer Pro", "Simulate battery models"] },
            { title: "Module 4: Career Prep", steps: ["Take specialized EV courses", "Apply to EV startups (Ather, Ola)", "Apply to solar EPC companies", "Stay updated with EV policies"] }
          ]
        }
      ],
      mockTests: [
        { id: 1, title: "Circuit Theory Quiz", topic: "Circuits", difficulty: "Beginner", duration: "10", questions: [{ q: "What is Kirchhoff's Current Law?", options: ["Sum of currents at a node is zero", "V=IR", "Sum of voltages is zero", "Power = VI"], answer: 0 }, { q: "Unit of Inductance?", options: ["Farad", "Ohm", "Henry", "Tesla"], answer: 2 }, { q: "In a pure capacitor, current...", options: ["Lags voltage by 90", "Leads voltage by 90", "Is in phase", "Lags by 45"], answer: 1 }, { q: "What is the power factor of a purely resistive circuit?", options: ["0", "1", "0.5", "Infinity"], answer: 1 }, { q: "Equivalent resistance of two 10 ohm resistors in parallel?", options: ["20 ohm", "5 ohm", "10 ohm", "0 ohm"], answer: 1 }] },
        { id: 2, title: "Electrical Machines", topic: "Machines", difficulty: "Intermediate", duration: "10", questions: [{ q: "Transformer core is laminated to reduce?", options: ["Copper loss", "Eddy current loss", "Hysteresis loss", "Friction loss"], answer: 1 }, { q: "Which motor has highest starting torque?", options: ["DC Shunt", "DC Series", "AC Induction", "Synchronous"], answer: 1 }, { q: "Slip in an induction motor at synchronous speed is?", options: ["1", "0", "Infinity", "0.5"], answer: 1 }, { q: "Buchholz relay is used in?", options: ["Alternators", "Transformers", "Motors", "Transmission lines"], answer: 1 }, { q: "Unit of magnetic flux?", options: ["Tesla", "Weber", "Henry", "Ampere-turn"], answer: 1 }] }
      ]
    };
  }

  if (isECE) {
    return {
      courses: [
        { title: "Embedded Systems & IoT", platform: "Udemy", instructor: "Tech Explorations", duration: "25 hours", difficulty: "Intermediate", url: "https://www.udemy.com/courses/search/?src=ukw&q=embedded+systems+iot", description: "Learn to build IoT devices with Arduino and ESP32." },
        { title: "VLSI Physical Design", platform: "NPTEL", instructor: "IIT Kharagpur", duration: "12 Weeks", difficulty: "Advanced", url: "https://www.youtube.com/results?search_query=nptel+vlsi+physical+design", description: "Deep dive into chip design and fabrication." },
        { title: "Python for Hardware Engineers", platform: "Coursera", instructor: "Various", duration: "4 Weeks", difficulty: "Beginner", url: "https://www.coursera.org/specializations/python-3-programming", description: "Learn scripting for hardware automation." }
      ],
      studyMaterials: [
        { title: "Digital Electronics Notes", type: "Documentation", subject: "Core", url: "https://www.youtube.com/results?search_query=nptel+digital+electronics", description: "Logic gates, flip-flops, and microprocessors." },
        { title: "Verilog Cheat Sheet", type: "Cheat Sheet", subject: "VLSI", url: "https://www.google.com/search?q=verilog+cheat+sheet+pdf", description: "Quick syntax guide for Verilog HDL." },
        { title: "Embedded C Interview Questions", type: "eBook", subject: "Placements", url: "https://www.indiabix.com/technical/c/embedded/", description: "Top questions asked in Qualcomm, Intel, Texas Instruments." }
      ],
      careerPaths: [
        {
          title: "Embedded Systems Engineer", description: "Develop software that runs closely with hardware on microcontrollers.", salary: "₹5 LPA - ₹15 LPA", growth: "High", skills: ["Embedded C", "Microcontrollers", "RTOS", "IoT"],
          modules: [
            { title: "Module 1: Foundations", steps: ["Master C and C++ programming", "Understand Microprocessor vs Microcontroller", "Learn digital electronics basics", "Study computer architecture"] },
            { title: "Module 2: Hardware Programming", steps: ["Program 8051 or Arduino", "Master ARM Cortex-M architecture", "Learn communication protocols (I2C, SPI, UART)", "Interface sensors and actuators"] },
            { title: "Module 3: Advanced Embedded", steps: ["Learn Real-Time Operating Systems (RTOS)", "Understand IoT concepts (MQTT, WiFi)", "Learn Embedded Linux basics", "Study hardware debugging (JTAG/Oscilloscopes)"] },
            { title: "Module 4: Career Launch", steps: ["Build 3 complex IoT/Embedded projects", "Contribute to open source hardware", "Apply to Bosch, Intel, NXP", "Practice C programming interviews"] }
          ]
        },
        {
          title: "VLSI Design Engineer", description: "Design complex integrated circuits and microchips.", salary: "₹8 LPA - ₹25 LPA", growth: "Very High", skills: ["Verilog/VHDL", "Digital Design", "FPGA", "Cadence"],
          modules: [
            { title: "Module 1: Digital Design", steps: ["Master Boolean algebra and logic gates", "Learn combinational/sequential circuits", "Understand state machines (FSM)", "Study CMOS logic design"] },
            { title: "Module 2: Hardware Description Languages", steps: ["Learn Verilog or VHDL", "Write RTL code for digital blocks", "Understand testbenches and simulation", "Learn FPGA architecture"] },
            { title: "Module 3: Backend & Verification", steps: ["Learn SystemVerilog", "Understand ASIC design flow", "Learn Static Timing Analysis (STA)", "Familiarize with EDA tools (Cadence/Synopsys)"] },
            { title: "Module 4: Specialization & Jobs", steps: ["Build a processor core project", "Pursue an M.Tech or specialized training (optional)", "Apply to Qualcomm, AMD, Nvidia", "Prepare for intense digital logic interviews"] }
          ]
        },
        {
          title: "Telecommunications & Network Engineer", description: "Design and manage communication networks (5G, Fiber, IP).", salary: "₹4 LPA - ₹12 LPA", growth: "Stable", skills: ["Networking", "Signal Processing", "RF Design", "Cisco"],
          modules: [
            { title: "Module 1: Comm Systems", steps: ["Learn analog/digital communication", "Understand modulation techniques", "Study antennas and wave propagation", "Learn RF/Microwave engineering basics"] },
            { title: "Module 2: Computer Networks", steps: ["Master the OSI and TCP/IP models", "Learn IP addressing and subnetting", "Understand routing and switching", "Study Network security basics"] },
            { title: "Module 3: Modern Telecom", steps: ["Understand Optical Fiber communication", "Learn Mobile Comm (4G LTE, 5G NR)", "Study Digital Signal Processing (DSP) with MATLAB", "Understand IoT networking"] },
            { title: "Module 4: Certification & Jobs", steps: ["Obtain CCNA certification", "Build networking simulation projects (Packet Tracer)", "Apply to Cisco, Ericsson, Jio, Airtel", "Prepare for networking interviews"] }
          ]
        }
      ],
      mockTests: [
        { id: 1, title: "Digital Electronics", topic: "Digital", difficulty: "Intermediate", duration: "10", questions: [{ q: "Which logic gate is known as the Universal Gate?", options: ["AND", "OR", "NAND", "XOR"], answer: 2 }, { q: "How many flip-flops are needed for a Mod-16 counter?", options: ["2", "4", "8", "16"], answer: 1 }, { q: "What is a multiplexer?", options: ["Many to one", "One to many", "Many to many", "One to one"], answer: 0 }, { q: "Which code is unweighted?", options: ["8421", "Binary", "Gray Code", "BCD"], answer: 2 }, { q: "A latch is a...", options: ["Level-triggered device", "Edge-triggered device", "Combinational circuit", "Passive component"], answer: 0 }] },
        { id: 2, title: "Signals & Systems", topic: "Signals", difficulty: "Advanced", duration: "10", questions: [{ q: "Fourier transform of a unit impulse is?", options: ["1", "0", "Infinity", "Step function"], answer: 0 }, { q: "Nyquist rate for a signal bandlimited to fm is?", options: ["fm", "2fm", "fm/2", "4fm"], answer: 1 }, { q: "Laplace transform is used for?", options: ["Continuous time systems", "Discrete time systems", "Digital systems", "Non-linear systems"], answer: 0 }, { q: "Convolution in time domain is equivalent to ___ in frequency domain.", options: ["Addition", "Multiplication", "Division", "Subtraction"], answer: 1 }, { q: "A system is stable if its poles lie...", options: ["On imaginary axis", "In right half plane", "In left half plane", "At origin"], answer: 2 }] }
      ]
    };
  }

  if (isChem) {
    return {
      courses: [
        { title: "Chemical Engineering Thermodynamics", platform: "NPTEL", instructor: "IIT Kanpur", duration: "12 Weeks", difficulty: "Advanced", url: "https://www.youtube.com/results?search_query=nptel+chemical+engineering+thermodynamics", description: "Core thermodynamics for chemical processes." },
        { title: "Aspen Plus: Basic Process Modeling", platform: "Udemy", instructor: "Chemical Engineering Guy", duration: "10 hours", difficulty: "Intermediate", url: "https://www.udemy.com/courses/search/?src=ukw&q=aspen+plus", description: "Learn simulation software used in industry." },
        { title: "Industrial Safety and Health", platform: "Coursera", instructor: "Various", duration: "4 Weeks", difficulty: "Beginner", url: "https://www.coursera.org/search?query=industrial%20safety", description: "Crucial safety protocols for chemical plants." }
      ],
      studyMaterials: [
        { title: "Mass & Heat Transfer Notes", type: "Documentation", subject: "Core", url: "https://www.youtube.com/results?search_query=nptel+mass+and+heat+transfer", description: "Comprehensive notes on transport phenomena." },
        { title: "Unit Operations Cheat Sheet", type: "Cheat Sheet", subject: "Operations", url: "https://www.google.com/search?q=chemical+engineering+unit+operations+cheat+sheet+pdf", description: "Quick reference for distillation, absorption, etc." },
        { title: "Chemical Engg Interview Questions", type: "eBook", subject: "Placements", url: "https://www.indiabix.com/chemical-engineering/questions-and-answers/", description: "Top questions asked in Reliance, BPCL, ONGC." }
      ],
      careerPaths: [
        {
          title: "Process Engineer", description: "Design, operate, and optimize chemical manufacturing processes.", salary: "₹5 LPA - ₹15 LPA", growth: "Stable", skills: ["Process Design", "Aspen Plus", "Heat/Mass Transfer", "P&ID"],
          modules: [
            { title: "Module 1: Fundamentals", steps: ["Master Material & Energy Balances", "Understand Thermodynamics", "Learn Fluid Mechanics", "Study Heat and Mass Transfer"] },
            { title: "Module 2: Unit Operations", steps: ["Learn Distillation & Absorption", "Understand Reactors and Kinetics", "Study Separation Processes", "Learn process control basics"] },
            { title: "Module 3: Software & Design", steps: ["Master Aspen Plus or HYSYS", "Learn to read/create PFDs and P&IDs", "Understand equipment sizing", "Study process optimization techniques"] },
            { title: "Module 4: Career Launch", steps: ["Prepare for GATE", "Apply for PSU roles (IOCL, ONGC)", "Apply to EPC firms (Fluor, Technip)", "Practice core technical interviews"] }
          ]
        },
        {
          title: "HSE (Health, Safety, Environment) Engineer", description: "Ensure chemical plants operate safely and meet environmental regulations.", salary: "₹4 LPA - ₹12 LPA", growth: "High", skills: ["HAZOP", "Risk Assessment", "Environmental Engg", "Safety Protocols"],
          modules: [
            { title: "Module 1: Safety Basics", steps: ["Understand industrial hazards", "Learn process safety management", "Study fire and explosion safety", "Learn about personal protective equipment (PPE)"] },
            { title: "Module 2: Risk Analysis", steps: ["Learn HAZOP (Hazard and Operability Study)", "Understand QRA (Quantitative Risk Assessment)", "Study fault tree analysis", "Learn incident investigation"] },
            { title: "Module 3: Environmental", steps: ["Study wastewater treatment", "Learn air pollution control", "Understand solid waste management", "Familiarize with EPA/local regulations"] },
            { title: "Module 4: Certification & Jobs", steps: ["Take NEBOSH certification", "Build a safety audit portfolio", "Apply to chemical plants & refineries", "Network with safety professionals"] }
          ]
        },
        {
          title: "R&D / Materials Engineer", description: "Research and develop new materials, chemicals, or sustainable products.", salary: "₹6 LPA - ₹16 LPA", growth: "High", skills: ["Polymer Science", "Catalysis", "Research", "Analytical Chemistry"],
          modules: [
            { title: "Module 1: Advanced Chemistry", steps: ["Study organic & inorganic chemistry", "Learn polymer science", "Understand catalysis and reaction engineering", "Study nanotechnology basics"] },
            { title: "Module 2: Analytical Tools", steps: ["Learn spectroscopy (NMR, FTIR)", "Understand chromatography (GC, HPLC)", "Study thermal analysis (TGA, DSC)", "Learn material characterization (XRD, SEM)"] },
            { title: "Module 3: Specialization", steps: ["Focus on green chemistry", "Study battery materials", "Understand bioprocess engineering", "Learn scaling up from lab to plant"] },
            { title: "Module 4: Career Prep", steps: ["Pursue MS/PhD (optional but recommended)", "Publish research papers", "Apply to R&D labs (Reliance, Dow, BASF)", "Build an academic/research resume"] }
          ]
        }
      ],
      mockTests: [
        { id: 1, title: "Heat & Mass Transfer", topic: "Transport", difficulty: "Intermediate", duration: "10", questions: [{ q: "Which number defines the ratio of momentum to thermal diffusivity?", options: ["Reynolds Number", "Prandtl Number", "Nusselt Number", "Grashof Number"], answer: 1 }, { q: "Fourier's law is related to?", options: ["Convection", "Radiation", "Conduction", "Mass Transfer"], answer: 2 }, { q: "Fick's law describes?", options: ["Heat transfer", "Momentum transfer", "Mass diffusion", "Fluid flow"], answer: 2 }, { q: "In a heat exchanger, LMTD stands for?", options: ["Log Mean Temp Difference", "Linear Mean Temp Difference", "Lowest Mean Temp Difference", "Log Maximum Temp Difference"], answer: 0 }, { q: "Which has the highest thermal conductivity?", options: ["Air", "Water", "Copper", "Diamond"], answer: 3 }] },
        { id: 2, title: "Chemical Reaction Engineering", topic: "Kinetics", difficulty: "Advanced", duration: "10", questions: [{ q: "For a zero-order reaction, half-life is?", options: ["Independent of initial conc.", "Proportional to initial conc.", "Inversely proportional to initial conc.", "Exponential"], answer: 1 }, { q: "An ideal CSTR is also known as?", options: ["Plug flow reactor", "Batch reactor", "Mixed flow reactor", "Tubular reactor"], answer: 2 }, { q: "Arrhenius equation gives the relation between?", options: ["Rate and volume", "Rate constant and temperature", "Concentration and time", "Pressure and temp"], answer: 1 }, { q: "A catalyst alters the?", options: ["Equilibrium constant", "Enthalpy of reaction", "Activation energy", "Free energy"], answer: 2 }, { q: "Space-time is defined as?", options: ["Volume/Volumetric flow rate", "Volumetric flow rate/Volume", "Time/Volume", "Volume x Time"], answer: 0 }] }
      ]
    };
  }


  return {
    courses: [
      {
        title: isCS ? "Complete Web Development Bootcamp" : "AutoCAD 2024 Masterclass",
        platform: "Udemy",
        instructor: "Dr. Angela Yu",
        duration: "65 hours",
        difficulty: "Beginner",
        url: isCS ? "https://www.udemy.com/course/the-complete-web-development-bootcamp/" : "https://www.udemy.com/courses/search/?src=ukw&q=autocad+2024",
        description: isCS ? "Become a full-stack web developer with just one course." : "Master AutoCAD from scratch."
      },
      {
        title: isCS ? "Data Structures & Algorithms" : "Engineering Mechanics",
        platform: "NPTEL",
        instructor: "IIT Delhi",
        duration: "12 Weeks",
        difficulty: "Intermediate",
        url: isCS ? "https://www.youtube.com/results?search_query=nptel+data+structures+and+algorithms" : "https://www.youtube.com/results?search_query=nptel+engineering+mechanics",
        description: "Comprehensive core engineering concepts."
      },
      {
        title: isCS ? "Machine Learning A-Z" : "Project Management Professional",
        platform: "Coursera",
        instructor: "Andrew Ng",
        duration: "40 hours",
        difficulty: "Advanced",
        url: isCS ? "https://www.coursera.org/specializations/machine-learning" : "https://www.coursera.org/learn/project-management",
        description: "Industry-standard certification course."
      }
    ],
    studyMaterials: [
      {
        title: isCS ? "React Official Documentation" : "Engineering Mathematics Notes",
        type: "Documentation",
        subject: isCS ? "Frontend Dev" : "Applied Math",
        url: isCS ? "https://react.dev" : "https://www.youtube.com/results?search_query=nptel+engineering+mathematics",
        description: isCS ? "The best place to learn the core concepts." : "University level engineering mathematics."
      },
      {
        title: isCS ? "Python Cheat Sheet" : "Thermodynamics Formulas",
        type: "Cheat Sheet",
        subject: "Quick Reference",
        url: isCS ? "https://www.geeksforgeeks.org/python-programming-language/" : "https://www.engineeringtoolbox.com/thermodynamics-t_37.html",
        description: "Quick revision guide for exams."
      },
      {
        title: "Industry Interview Questions",
        type: "eBook",
        subject: "Placements",
        url: "https://www.indiabix.com",
        description: "Top 100 questions asked in campus placements."
      }
    ],
    careerPaths: [
      {
        title: isCS ? "Software Engineer" : "Design Engineer",
        description: "Build and maintain core software systems or physical products.",
        salary: "₹6 LPA - ₹15 LPA",
        growth: "High demand",
        skills: isCS ? ["JavaScript", "Python", "SQL"] : ["CAD", "Analysis", "Testing"],
        modules: [
          {
            title: "Module 1: Foundations",
            steps: ["Understand fundamental concepts", "Learn the primary language/tool", "Build 5 mini projects", "Master debugging techniques", "Learn version control"]
          },
          {
            title: "Module 2: Intermediate Skills",
            steps: ["Learn advanced frameworks", "Understand database/storage integration", "Build a complex real-world project", "Write unit tests", "Learn deployment/publishing"]
          },
          {
            title: "Module 3: Professional Excellence",
            steps: ["Study system architecture", "Optimize performance", "Learn Agile/Scrum", "Contribute to open source", "Build a standout portfolio"]
          },
          {
            title: "Module 4: Career Launch",
            steps: ["Create a perfect resume", "Optimize LinkedIn", "Practice 100+ interview questions", "Do 5 mock interviews", "Apply to 50+ companies"]
          }
        ]
      },
      {
        title: "Data Analyst",
        description: "Analyze complex datasets to help businesses make decisions.",
        salary: "₹5 LPA - ₹12 LPA",
        growth: "Very High",
        skills: ["SQL", "Excel", "Python", "PowerBI"],
        modules: [
          {
            title: "Module 1: Excel & SQL",
            steps: ["Master VLOOKUP & Pivot Tables", "Learn SQL CRUD operations", "Master SQL Joins and Window Functions", "Solve 50 SQL problems online", "Analyze an Excel dataset"]
          },
          {
            title: "Module 2: Python for Data",
            steps: ["Learn Python basics", "Master Pandas library", "Master NumPy", "Clean dirty datasets", "Perform EDA (Exploratory Data Analysis)"]
          },
          {
            title: "Module 3: Visualization",
            steps: ["Learn PowerBI or Tableau basics", "Create interactive dashboards", "Learn DAX (Data Analysis Expressions)", "Tell stories with data", "Publish dashboard online"]
          },
          {
            title: "Module 4: Portfolio & Jobs",
            steps: ["Build 3 end-to-end data projects", "Publish projects on GitHub/Kaggle", "Write a Medium article on your analysis", "Practice SQL interviews", "Apply for roles"]
          }
        ]
      },
      {
        title: "Product Manager",
        description: "Bridge the gap between business, design, and engineering.",
        salary: "₹8 LPA - ₹20 LPA",
        growth: "Medium",
        skills: ["Communication", "Agile", "Strategy"],
        modules: [
          {
            title: "Module 1: Product Basics",
            steps: ["Understand the Product Lifecycle", "Learn user research techniques", "Write Product Requirement Docs (PRD)", "Learn wireframing (Figma/Balsamiq)", "Study case studies of top products"]
          },
          {
            title: "Module 2: Agile & Execution",
            steps: ["Master Scrum & Kanban", "Learn to write User Stories", "Understand Sprint Planning", "Learn to prioritize features (RICE/MoSCoW)", "Manage stakeholders"]
          },
          {
            title: "Module 3: Data & Growth",
            steps: ["Define KPIs and Metrics", "Learn basic SQL for PMs", "Run A/B tests", "Analyze user feedback", "Create go-to-market strategies"]
          },
          {
            title: "Module 4: Interview Prep",
            steps: ["Read 'Cracking the PM Interview'", "Practice product design questions", "Practice estimation questions", "Build a product teardown portfolio", "Apply for APM roles"]
          }
        ]
      }
    ],
    mockTests: [
      {
        id: 1, title: isCS ? "JavaScript Fundamentals" : "Engineering Mathematics", topic: isCS ? "JS" : "Math", difficulty: "Beginner", duration: "10",
        questions: isCS ? [
          { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], answer: 0 },
          { q: "Which symbol is used for strict equality in JS?", options: ["==", "===", "=", "!=="], answer: 1 },
          { q: "How do you declare a constant in JS?", options: ["var", "let", "const", "constant"], answer: 2 },
          { q: "What is the output of 'typeof null'?", options: ["null", "undefined", "object", "string"], answer: 2 },
          { q: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 }
        ] : [
          { q: "What is the derivative of x^2?", options: ["x", "2x", "x^3/3", "1"], answer: 1 },
          { q: "What is the integral of 2x?", options: ["x^2", "2x^2", "x", "2"], answer: 0 },
          { q: "What is the value of pi approximately?", options: ["3.14", "2.71", "1.41", "1.73"], answer: 0 },
          { q: "What is sin(90 degrees)?", options: ["0", "1", "0.5", "-1"], answer: 1 },
          { q: "What is a matrix?", options: ["A movie", "A grid of numbers", "A type of calculus", "A physical material"], answer: 1 }
        ]
      },
      {
        id: 2, title: isCS ? "React Hooks Quiz" : "Mechanics Basics", topic: isCS ? "React" : "Physics", difficulty: "Intermediate", duration: "10",
        questions: isCS ? [
          { q: "What hook is used to manage state?", options: ["useEffect", "useContext", "useState", "useReducer"], answer: 2 },
          { q: "When does useEffect run by default?", options: ["Only on mount", "On every render", "Only on unmount", "Never"], answer: 1 },
          { q: "Which hook replaces Redux partially?", options: ["useState", "useContext", "useMemo", "useCallback"], answer: 1 },
          { q: "What is a custom hook?", options: ["A standard React feature", "A JavaScript function starting with 'use'", "A class component", "A DOM element"], answer: 1 },
          { q: "Can hooks be called conditionally?", options: ["Yes", "No", "Only in development", "Only in production"], answer: 1 }
        ] : [
          { q: "What is Newton's Second Law?", options: ["F=ma", "E=mc2", "v=u+at", "P=VI"], answer: 0 },
          { q: "What is the unit of Force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2 },
          { q: "What is the formula for Kinetic Energy?", options: ["mgh", "1/2 mv^2", "Fd", "ma"], answer: 1 },
          { q: "What is friction?", options: ["A force that opposes motion", "A force that causes motion", "A type of energy", "A type of mass"], answer: 0 },
          { q: "What is gravity?", options: ["A repulsive force", "An attractive force between masses", "A nuclear force", "A magnetic force"], answer: 1 }
        ]
      }
    ]
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────
type Ctx = {
  content: AIContent;
  loading: boolean;
  generating: boolean;
  generate: () => Promise<void>;
};

const AIContentContext = createContext<Ctx>({
  content: EMPTY, loading: true, generating: false,
  generate: async () => {},
});

export function AIContentProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [content, setContent] = useState<AIContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const generatedFor = useRef<string | null>(null);

  const generate = useCallback(async () => {
    if (!profile?.branch) return;
    setGenerating(true);
    try {
      const result = await callGemini({
        name: profile.full_name || "Student",
        branch: profile.branch || "",
        year: profile.year || "",
        skills: profile.current_skills || [],
        interests: profile.interests || [],
      });
      setContent(result);
      // Cache in sessionStorage so navigating between pages doesn't re-call
      const cacheKey = `ai_content_${profile.branch}_${profile.year}`;
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
      generatedFor.current = cacheKey;
    } catch (e: any) {
      console.error("Gemini error:", e);
      toast.error(`Error: ${e.message || "Failed to get AI recommendations"}`);
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  }, [profile]);

  // Auto-generate when profile is ready
  useEffect(() => {
    if (!profile?.branch) { setLoading(false); return; }

    const cacheKey = `ai_content_${profile.branch}_${profile.year}`;

    // Check session cache first
    const cached = sessionStorage.getItem(cacheKey);
    if (cached && generatedFor.current !== cacheKey) {
      try {
        const parsed = JSON.parse(cached) as AIContent;
        if (parsed.courses?.length && parsed.careerPaths?.length) {
          setContent(parsed);
          generatedFor.current = cacheKey;
          setLoading(false);
          return;
        }
      } catch { /* ignore */ }
    }

    // Generate fresh
    if (generatedFor.current !== cacheKey) {
      generatedFor.current = cacheKey;
      generate();
    }
  }, [profile?.branch, profile?.year, generate]);

  return (
    <AIContentContext.Provider value={{ content, loading, generating, generate }}>
      {children}
    </AIContentContext.Provider>
  );
}

export const useAIContent = () => useContext(AIContentContext);
