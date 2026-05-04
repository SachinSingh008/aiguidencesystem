import type { AIContent } from "./useAIContent";

// ─── CS / IT FALLBACK ────────────────────────────────────────────────────────
const CS_FALLBACK: AIContent = {
  courses: [
    { title: "Full-Stack Web Development Bootcamp", platform: "Udemy", instructor: "Dr. Angela Yu", duration: "65 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?q=full+stack+web+development+bootcamp", description: "Build websites end-to-end with HTML, CSS, JS, Node and React.", careerRelevance: "Directly maps to Full-Stack and Frontend Engineer roles." },
    { title: "Data Structures & Algorithms in Python", platform: "Udemy", instructor: "Scott Barrett", duration: "6 hours", difficulty: "Intermediate", url: "https://www.udemy.com/courses/search/?q=data+structures+algorithms+python", description: "Master DSA concepts essential for technical interviews.", careerRelevance: "Required for SDE roles at top product companies." },
    { title: "Machine Learning Specialization", platform: "Coursera", instructor: "Andrew Ng", duration: "3 months", difficulty: "Intermediate", url: "https://www.coursera.org/search?query=machine+learning+andrew+ng", description: "Learn supervised, unsupervised and reinforcement learning.", careerRelevance: "Core requirement for ML and Data Science roles." },
    { title: "React & Node.js Complete Course", platform: "Udemy", instructor: "Maximilian Schwarzmüller", duration: "10 hours", difficulty: "Intermediate", url: "https://www.udemy.com/courses/search/?q=react+nodejs+full+course", description: "Build real-world apps with the MERN stack.", careerRelevance: "Top skill stack for startup and product company hiring." },
    { title: "SQL & Database Design", platform: "Udemy", instructor: "Colt Steele", duration: "4 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?q=sql+database+design", description: "Learn relational databases, joins and query optimization.", careerRelevance: "Essential for backend, data analyst and SDE roles." },
    { title: "System Design for Interviews", platform: "Coursera", instructor: "Grokking", duration: "5 hours", difficulty: "Advanced", url: "https://www.coursera.org/search?query=system+design+interview", description: "Design scalable distributed systems for senior roles.", careerRelevance: "Critical for SDE-2 and senior engineer interviews." },
  ],
  studyMaterials: [
    { title: "React Official Docs", type: "Documentation", subject: "Frontend", url: "https://react.dev", description: "The definitive guide to React including hooks and concurrent mode." },
    { title: "Python Documentation", type: "Documentation", subject: "Python", url: "https://docs.python.org/3/", description: "Official Python 3 reference — standard library, built-ins and tutorials." },
    { title: "Tech Interview Handbook", type: "eBook", subject: "Placements", url: "https://www.techinterviewhandbook.org/", description: "Free guide covering DSA, system design and behavioral interviews." },
    { title: "GeeksForGeeks DSA", type: "Notes", subject: "DSA", url: "https://www.geeksforgeeks.org/data-structures/", description: "Comprehensive DSA reference with examples and problems for placements." },
    { title: "MDN JavaScript Guide", type: "Documentation", subject: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", description: "Mozilla's authoritative JavaScript reference used by all web developers." },
  ],
  careerPaths: [
    {
      title: "Software Development Engineer (SDE)",
      description: "Build and maintain scalable software systems at product companies. High demand across startups and MNCs.",
      salary: "₹8 LPA - ₹40 LPA",
      growth: "Very High demand",
      skills: ["DSA", "Java/Python", "System Design", "SQL", "Git"],
      modules: [
        { title: "Module 1: Programming Fundamentals", steps: ["Pick Java or Python and master OOP", "Solve 100 easy LeetCode problems", "Learn time and space complexity analysis", "Build 3 CLI projects from scratch"] },
        { title: "Module 2: Web & Backend Skills", steps: ["Learn Node.js or Spring Boot basics", "Build a REST API with database integration", "Understand JWT authentication", "Deploy a project on Railway or Render"] },
        { title: "Module 3: System Design", steps: ["Study CAP theorem and database scaling", "Learn caching with Redis", "Understand load balancers and CDNs", "Design a URL shortener and chat system"] },
        { title: "Module 4: Interview Prep", steps: ["Solve 200+ LeetCode medium problems", "Do 10 mock interviews on Pramp", "Prepare STAR-format behavioral answers", "Apply to 50+ companies on LinkedIn"] },
      ],
    },
    {
      title: "Data Analyst",
      description: "Analyse business data and surface actionable insights using SQL, Python and BI tools.",
      salary: "₹5 LPA - ₹18 LPA",
      growth: "High demand",
      skills: ["SQL", "Python (Pandas)", "Power BI", "Statistics", "Excel"],
      modules: [
        { title: "Module 1: SQL Mastery", steps: ["Master SELECT, JOINs and window functions", "Solve 50 SQL problems on Mode Analytics", "Learn indexing and query optimization", "Build a sales analysis project in MySQL"] },
        { title: "Module 2: Python for Data", steps: ["Learn Pandas and NumPy libraries", "Perform exploratory data analysis (EDA)", "Learn Matplotlib and Seaborn for charts", "Clean a real-world Kaggle dataset"] },
        { title: "Module 3: BI & Visualization", steps: ["Build interactive dashboards in Power BI", "Learn DAX for custom measures", "Connect Power BI to live SQL database", "Publish and share dashboard online"] },
        { title: "Module 4: Portfolio & Jobs", steps: ["Complete 3 end-to-end data projects", "Publish projects on GitHub and Kaggle", "Tailor resume for analyst roles", "Apply to analytics roles on Naukri and LinkedIn"] },
      ],
    },
    {
      title: "DevOps / Cloud Engineer",
      description: "Automate software delivery pipelines and manage cloud infrastructure for engineering teams.",
      salary: "₹7 LPA - ₹25 LPA",
      growth: "Very High demand",
      skills: ["Docker", "Kubernetes", "AWS/GCP", "CI/CD", "Linux"],
      modules: [
        { title: "Module 1: Linux & Scripting", steps: ["Master Linux commands and shell scripting", "Learn Bash automation scripts", "Understand file permissions and networking basics", "Practice on a free EC2 instance"] },
        { title: "Module 2: Containers", steps: ["Learn Docker and write Dockerfiles", "Build and push images to Docker Hub", "Learn Docker Compose for multi-service apps", "Containerize a full-stack application"] },
        { title: "Module 3: Cloud & Orchestration", steps: ["Get AWS Cloud Practitioner certified", "Learn Kubernetes deployments and services", "Set up a Kubernetes cluster with kubeadm", "Deploy a microservices app on EKS"] },
        { title: "Module 4: CI/CD & Jobs", steps: ["Build GitHub Actions pipelines", "Integrate Docker builds in CI", "Learn Terraform for infrastructure as code", "Apply for DevOps roles at product companies"] },
      ],
    },
  ],
  mockTests: [
    {
      id: 1, title: "Programming & DSA Basics", topic: "DSA", difficulty: "Intermediate", duration: "15",
      questions: [
        { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
        { q: "Which data structure uses LIFO order?", options: ["Queue", "Stack", "Array", "Tree"], answer: 1 },
        { q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Module", "Data Oriented Model"], answer: 0 },
        { q: "Which sort has best average case O(n log n)?", options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"], answer: 2 },
        { q: "What is a foreign key?", options: ["Primary key of same table", "Key referencing another table's PK", "Unique key", "Index key"], answer: 1 },
        { q: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "DELETE"], answer: 2 },
        { q: "What is a deadlock?", options: ["Infinite loop", "Two processes waiting on each other", "Memory overflow", "CPU starvation"], answer: 1 },
        { q: "Which hook manages state in React?", options: ["useEffect", "useRef", "useState", "useContext"], answer: 2 },
        { q: "What is normalization in databases?", options: ["Speeding up queries", "Removing data redundancy", "Adding indexes", "Backing up data"], answer: 1 },
        { q: "What does 'git rebase' do?", options: ["Deletes commits", "Merges branches", "Rewrites commit history onto another branch", "Stashes changes"], answer: 2 },
      ],
    },
    {
      id: 2, title: "Web & System Design", topic: "Web Dev", difficulty: "Intermediate", duration: "15",
      questions: [
        { q: "What is a REST API?", options: ["Database type", "Architectural style for web services", "A JavaScript library", "A CSS framework"], answer: 1 },
        { q: "What does CSS 'flexbox' primarily control?", options: ["Colors", "Fonts", "Layout and alignment", "Animations"], answer: 2 },
        { q: "What is 'hoisting' in JavaScript?", options: ["Moving elements up in DOM", "Declarations moved to top of scope", "Async function behavior", "Event bubbling"], answer: 1 },
        { q: "What is the CAP theorem?", options: ["CPU, Algorithms, Processes", "Consistency, Availability, Partition tolerance", "Cache, API, Protocol", "None of the above"], answer: 1 },
        { q: "Which status code means 'Not Found'?", options: ["200", "401", "500", "404"], answer: 3 },
        { q: "What is a CDN?", options: ["Central Data Node", "Content Delivery Network", "Core DNS Node", "Cloud Data Network"], answer: 1 },
        { q: "What does 'async/await' do in JS?", options: ["Creates loops", "Handles promises synchronously", "Defines classes", "Manages state"], answer: 1 },
        { q: "What is Docker?", options: ["Database", "Containerization platform", "CI tool", "Cloud provider"], answer: 1 },
        { q: "What is an index in SQL?", options: ["A table constraint", "A data structure to speed up queries", "A type of JOIN", "A stored procedure"], answer: 1 },
        { q: "What is load balancing?", options: ["Reducing CPU usage", "Distributing traffic across servers", "Caching API responses", "Compressing files"], answer: 1 },
      ],
    },
    {
      id: 3, title: "OS & Networking Concepts", topic: "Core CS", difficulty: "Beginner", duration: "15",
      questions: [
        { q: "What is a process?", options: ["A program in execution", "A stored file", "A database record", "A network packet"], answer: 0 },
        { q: "What does TCP stand for?", options: ["Transfer Control Protocol", "Transmission Control Protocol", "Text Communication Protocol", "Token Control Process"], answer: 1 },
        { q: "What is virtual memory?", options: ["RAM stored on GPU", "Disk space used as RAM", "Cache memory", "ROM"], answer: 1 },
        { q: "Which layer handles routing?", options: ["Transport", "Application", "Network", "Data Link"], answer: 2 },
        { q: "What is a semaphore?", options: ["A network signal", "A sync primitive to control resource access", "A type of database lock", "An OS scheduler"], answer: 1 },
        { q: "What is the purpose of DNS?", options: ["Encrypt traffic", "Translate domain names to IPs", "Compress data", "Assign MAC addresses"], answer: 1 },
        { q: "What is thrashing in OS?", options: ["CPU overheating", "Excessive paging causing low CPU utilization", "Disk fragmentation", "Cache miss"], answer: 1 },
        { q: "What is a subnet mask used for?", options: ["Encrypt packets", "Divide IP addresses into network/host", "Assign MAC addresses", "Speed up routing"], answer: 1 },
        { q: "What is pipelining in CPUs?", options: ["Networking pipeline", "Overlapping instruction execution stages", "Memory access pattern", "Cache strategy"], answer: 1 },
        { q: "Which scheduling algo has minimum waiting time?", options: ["FCFS", "Round Robin", "SJF", "Priority"], answer: 2 },
      ],
    },
  ],
  partial: false,
};

// ─── GENERIC FALLBACK ────────────────────────────────────────────────────────
const GENERIC_FALLBACK: AIContent = {
  courses: [
    { title: "Engineering Mathematics Full Course", platform: "Coursera", instructor: "Imperial College", duration: "12 weeks", difficulty: "Intermediate", url: "https://www.coursera.org/search?query=engineering+mathematics", description: "Core maths for all engineering branches.", careerRelevance: "Required for GATE and core company roles." },
    { title: "AutoCAD 2024 Complete Masterclass", platform: "Udemy", instructor: "CAD in Black", duration: "8 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?q=autocad+masterclass", description: "Industry-standard 2D and 3D drafting.", careerRelevance: "Essential for design and manufacturing roles." },
    { title: "Project Management Professional (PMP)", platform: "Coursera", instructor: "Google", duration: "6 months", difficulty: "Intermediate", url: "https://www.coursera.org/search?query=project+management+professional", description: "Manage projects using Agile and Waterfall methods.", careerRelevance: "Valuable for any engineering leadership role." },
    { title: "Python for Engineers", platform: "Udemy", instructor: "Jose Portilla", duration: "10 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?q=python+for+engineers", description: "Automation and data analysis using Python.", careerRelevance: "Python is now required in almost every engineering domain." },
    { title: "Excel for Engineers – Data Analysis", platform: "Udemy", instructor: "Kyle Pew", duration: "5 hours", difficulty: "Beginner", url: "https://www.udemy.com/courses/search/?q=excel+for+engineers+data+analysis", description: "Use Excel for engineering calculations and reporting.", careerRelevance: "Used daily in core and consulting engineering roles." },
    { title: "GATE Preparation – Core Engineering", platform: "Udemy", instructor: "Various", duration: "Self-paced", difficulty: "Advanced", url: "https://www.udemy.com/courses/search/?q=gate+preparation+core+engineering", description: "Comprehensive GATE exam prep for core branches.", careerRelevance: "Opens doors to PSUs (BHEL, NTPC, PGCIL) and M.Tech." },
  ],
  studyMaterials: [
    { title: "Engineering Mathematics (MATLAB)", type: "Documentation", subject: "Mathematics", url: "https://www.mathworks.com/help/matlab/", description: "Official MATLAB documentation covering numerical methods used in all engineering branches." },
    { title: "IndiaBix Engineering MCQs", type: "Notes", subject: "Placements", url: "https://www.indiabix.com", description: "Branch-wise MCQ bank for campus placement preparation." },
    { title: "Tech Interview Handbook", type: "eBook", subject: "Placements", url: "https://www.techinterviewhandbook.org/", description: "Free guide covering DSA, system design and behavioral interviews." },
    { title: "AutoCAD Official Help", type: "Documentation", subject: "AutoCAD", url: "https://help.autodesk.com/view/ACD/2024/ENU/", description: "Autodesk's official AutoCAD 2024 reference for 2D and 3D design." },
    { title: "GeeksForGeeks Aptitude", type: "Notes", subject: "Aptitude", url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers/", description: "Quantitative aptitude problems for campus placements and competitive exams." },
  ],
  careerPaths: [
    {
      title: "Core Engineering (PSU / Manufacturing)",
      description: "Work in public sector undertakings or large manufacturing companies in your core engineering domain.",
      salary: "₹4 LPA - ₹12 LPA",
      growth: "Stable demand",
      skills: ["Core Domain Knowledge", "AutoCAD", "Problem Solving", "GATE"],
      modules: [
        { title: "Module 1: Core Subject Mastery", steps: ["Revise all 8th semester core subjects", "Complete NPTEL courses in your specialization", "Solve 5 years of GATE previous papers", "Join a GATE coaching or test series"] },
        { title: "Module 2: Industry Tools", steps: ["Learn AutoCAD or domain-specific software", "Get certified in at least one professional tool", "Do a technical internship in your domain", "Learn basic project management skills"] },
        { title: "Module 3: Soft Skills & Communication", steps: ["Practice technical presentation skills", "Write engineering reports and case studies", "Attend industry seminars and webinars", "Build a professional LinkedIn profile"] },
        { title: "Module 4: Job Applications", steps: ["Apply for PSU jobs via GATE score", "Register on Naukri and LinkedIn for core roles", "Prepare for Group Discussions and HR rounds", "Apply to L&T, TATA, BHEL campus drives"] },
      ],
    },
    {
      title: "Data Analyst (Cross-domain)",
      description: "Use data analysis skills to work in analytics roles across any engineering sector.",
      salary: "₹5 LPA - ₹15 LPA",
      growth: "High demand",
      skills: ["Python", "SQL", "Excel", "Power BI", "Statistics"],
      modules: [
        { title: "Module 1: Python & Statistics", steps: ["Learn Python basics (variables, loops, functions)", "Learn Pandas for data manipulation", "Understand descriptive and inferential statistics", "Complete a mini data analysis project"] },
        { title: "Module 2: SQL & Databases", steps: ["Learn SELECT, JOINs and GROUP BY", "Practice 50 SQL queries on HackerRank", "Understand database schema design", "Connect Python to a SQL database"] },
        { title: "Module 3: Visualization", steps: ["Learn Power BI or Tableau fundamentals", "Build 3 interactive dashboards", "Learn to tell stories with data charts", "Present findings to a non-technical audience"] },
        { title: "Module 4: Portfolio & Placement", steps: ["Build 3 domain-specific data projects", "Upload projects to GitHub and Kaggle", "Apply for analyst roles on LinkedIn", "Prepare for SQL and case-study interviews"] },
      ],
    },
    {
      title: "Product / Operations Manager",
      description: "Use engineering problem-solving to manage products or operations at tech and non-tech companies.",
      salary: "₹6 LPA - ₹20 LPA",
      growth: "High demand",
      skills: ["Analytical Thinking", "Communication", "Agile", "Excel", "Strategy"],
      modules: [
        { title: "Module 1: Product Basics", steps: ["Read 'Inspired' by Marty Cagan", "Study 5 product case studies (Swiggy, Ola, Flipkart)", "Learn to write Product Requirement Docs (PRDs)", "Practise wireframing with Figma (free tier)"] },
        { title: "Module 2: Agile & Execution", steps: ["Learn Scrum and Kanban frameworks", "Use Jira or Trello for project tracking", "Learn to prioritize features with MoSCoW method", "Manage a college project using Agile sprints"] },
        { title: "Module 3: Analytics for PMs", steps: ["Learn basic SQL for product metrics", "Define KPIs and North Star Metrics", "Learn A/B testing fundamentals", "Use Google Analytics or Mixpanel"] },
        { title: "Module 4: Interview Prep", steps: ["Practice product design questions daily", "Read Cracking the PM Interview", "Do 5 mock PM interviews", "Apply for APM / MBA programs"] },
      ],
    },
  ],
  mockTests: [
    {
      id: 1, title: "General Aptitude & Reasoning", topic: "Aptitude", difficulty: "Beginner", duration: "15",
      questions: [
        { q: "A train 100m long passes a pole in 10s. Speed?", options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"], answer: 1 },
        { q: "Which is largest: 2/3, 3/4, 4/5, 5/6?", options: ["2/3", "3/4", "4/5", "5/6"], answer: 3 },
        { q: "If 6 workers complete a job in 12 days, 4 workers take?", options: ["8 days", "18 days", "16 days", "20 days"], answer: 1 },
        { q: "Find the odd one: 2, 3, 5, 7, 9, 11", options: ["2", "9", "11", "3"], answer: 1 },
        { q: "Simple interest on ₹1000 at 5% for 2 years?", options: ["₹50", "₹100", "₹150", "₹200"], answer: 1 },
        { q: "Ratio of 250ml to 2L is?", options: ["1:4", "1:8", "1:6", "1:2"], answer: 1 },
        { q: "If A = 1, B = 2, ... Z = 26, what is CODE?", options: ["30", "33", "32", "34"], answer: 2 },
        { q: "A can do a work in 10 days, B in 15 days. Together?", options: ["5 days", "6 days", "8 days", "12 days"], answer: 1 },
        { q: "What comes next: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "36"], answer: 1 },
        { q: "Speed = 60 km/h, Time = 1.5 hrs. Distance?", options: ["80 km", "90 km", "100 km", "75 km"], answer: 1 },
      ],
    },
    {
      id: 2, title: "Engineering Mathematics", topic: "Maths", difficulty: "Intermediate", duration: "15",
      questions: [
        { q: "Derivative of sin(x) is?", options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"], answer: 0 },
        { q: "Integral of 1/x is?", options: ["x", "ln|x|", "1/x^2", "e^x"], answer: 1 },
        { q: "Rank of a 3×3 identity matrix?", options: ["0", "1", "2", "3"], answer: 3 },
        { q: "Laplace transform of e^(at)?", options: ["1/(s-a)", "1/(s+a)", "a/s^2", "s/(s-a)"], answer: 0 },
        { q: "Eigen values of [[2,0],[0,3]]?", options: ["2,2", "3,3", "2,3", "1,2"], answer: 2 },
        { q: "Divergence of F = xi + yj + zk is?", options: ["0", "1", "2", "3"], answer: 3 },
        { q: "Solution of dy/dx = y is?", options: ["y = x", "y = e^x", "y = Ce^x", "y = C*x"], answer: 2 },
        { q: "Taylor series of e^x starts with?", options: ["1 + x + x^2/2 + ...", "x + x^2 + ...", "1 + x^2 + ...", "x - x^2/2 + ..."], answer: 0 },
        { q: "A square matrix with det=0 is called?", options: ["Invertible", "Singular", "Diagonal", "Symmetric"], answer: 1 },
        { q: "Fourier series represents?", options: ["Polynomial functions", "Periodic functions", "Linear functions", "Random functions"], answer: 1 },
      ],
    },
    {
      id: 3, title: "Verbal & Communication", topic: "English", difficulty: "Beginner", duration: "10",
      questions: [
        { q: "Choose the correct word: He __ going to the market.", options: ["are", "is", "were", "am"], answer: 1 },
        { q: "Synonym of 'Ambiguous'?", options: ["Clear", "Vague", "Precise", "Specific"], answer: 1 },
        { q: "Antonym of 'Diligent'?", options: ["Hardworking", "Honest", "Lazy", "Sincere"], answer: 2 },
        { q: "Correct sentence?", options: ["She don't like coffee", "She doesn't likes coffee", "She doesn't like coffee", "She not like coffee"], answer: 2 },
        { q: "One word for 'unable to be heard'?", options: ["Invisible", "Inaudible", "Intangible", "Illegible"], answer: 1 },
        { q: "Passive voice of 'She writes a letter'?", options: ["A letter is written by her", "A letter was written by her", "A letter has been written", "A letter will be written"], answer: 0 },
        { q: "Idiom 'Bite the bullet' means?", options: ["Eat fast", "Endure a painful situation", "Talk unnecessarily", "Make a mistake"], answer: 1 },
        { q: "Fill: The committee __ divided on this issue.", options: ["are", "is", "were", "has"], answer: 1 },
        { q: "Correctly spelled word?", options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], answer: 1 },
        { q: "Which is a compound sentence?", options: ["She ran fast.", "She ran fast and won the race.", "Running fast, she won.", "Because she ran fast"], answer: 1 },
      ],
    },
  ],
  partial: false,
};

// ─── BRANCH DETECTOR ─────────────────────────────────────────────────────────
export function getFallbackContent(branch: string): AIContent {
  const b = branch.toLowerCase();
  if (b.includes("computer") || b.includes("cse") || b.includes("it") || b.includes("software") || b.includes("information")) {
    return CS_FALLBACK;
  }
  return GENERIC_FALLBACK;
}
