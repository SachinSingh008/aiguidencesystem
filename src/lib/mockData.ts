export const userProfile = {
  name: "Arjun Sharma",
  branch: "Computer Engineering",
  year: "3rd Year",
  email: "arjun@careerpilot.ai",
  skills: ["Python", "JavaScript", "React", "SQL", "Git"],
  interests: ["AI/ML", "Web Development", "Cloud"],
  goals: ["Become an AI Engineer", "Land FAANG internship"],
  avatar: "AS",
};

export type Roadmap = { step: number; title: string; status: "complete" | "in-progress" | "upcoming"; duration: string; resources?: { label: string; url: string }[] };

export type CareerPath = {
  id: string;
  title: string;
  match: number;
  description: string;
  salary: string;
  growth: string;
  skills: string[];
  icon: string;
  branches: string[];
  roadmap: Roadmap[];
};

export const careerPaths: CareerPath[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    match: 94,
    description: "Build intelligent systems using machine learning, deep learning, and modern AI frameworks.",
    salary: "₹12-35 LPA",
    growth: "+45%",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Mathematics", "Deep Learning"],
    icon: "🤖",
    branches: ["Computer", "Electronics"],
    roadmap: [
      { step: 1, title: "Master Python Fundamentals", status: "complete", duration: "1 month", resources: [{ label: "Python for Everybody (Coursera)", url: "https://www.coursera.org/specializations/python" }] },
      { step: 2, title: "Learn Data Structures & Algorithms", status: "complete", duration: "2 months", resources: [{ label: "DSA - GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/" }] },
      { step: 3, title: "Statistics & Mathematics for ML", status: "in-progress", duration: "1 month", resources: [{ label: "Math for ML (Imperial)", url: "https://www.coursera.org/specializations/mathematics-machine-learning" }] },
      { step: 4, title: "Machine Learning Algorithms", status: "in-progress", duration: "3 months", resources: [{ label: "Andrew Ng - ML Specialization", url: "https://www.coursera.org/specializations/machine-learning-introduction" }] },
      { step: 5, title: "Deep Learning & Neural Networks", status: "upcoming", duration: "3 months", resources: [{ label: "Deep Learning Specialization", url: "https://www.coursera.org/specializations/deep-learning" }] },
      { step: 6, title: "MLOps & Model Deployment", status: "upcoming", duration: "2 months", resources: [{ label: "MLOps Specialization", url: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops" }] },
      { step: 7, title: "Build Portfolio Projects", status: "upcoming", duration: "2 months" },
      { step: 8, title: "Land Your AI Engineer Role", status: "upcoming", duration: "—" },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    match: 87,
    description: "Analyze complex data to derive actionable insights and build predictive models.",
    salary: "₹10-28 LPA",
    growth: "+38%",
    skills: ["Python", "Statistics", "SQL", "Pandas", "Visualization", "ML"],
    icon: "📊",
    branches: ["Computer", "Electronics"],
    roadmap: [
      { step: 1, title: "Python & Pandas", status: "complete", duration: "1 month", resources: [{ label: "Pandas Docs", url: "https://pandas.pydata.org/docs/getting_started/index.html" }] },
      { step: 2, title: "SQL Mastery", status: "in-progress", duration: "1 month", resources: [{ label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }] },
      { step: 3, title: "Statistics & Probability", status: "in-progress", duration: "2 months", resources: [{ label: "Khan Academy Stats", url: "https://www.khanacademy.org/math/statistics-probability" }] },
      { step: 4, title: "ML & Predictive Modeling", status: "upcoming", duration: "3 months" },
      { step: 5, title: "Data Visualization (Tableau/PowerBI)", status: "upcoming", duration: "1 month", resources: [{ label: "Tableau Public", url: "https://public.tableau.com/en-us/s/" }] },
      { step: 6, title: "Capstone Projects + Kaggle", status: "upcoming", duration: "2 months", resources: [{ label: "Kaggle", url: "https://www.kaggle.com/" }] },
    ],
  },
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    match: 82,
    description: "Build end-to-end web applications with modern frontend and backend technologies.",
    salary: "₹8-25 LPA",
    growth: "+30%",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    icon: "💻",
    branches: ["Computer"],
    roadmap: [
      { step: 1, title: "HTML, CSS, JS Fundamentals", status: "complete", duration: "1 month", resources: [{ label: "MDN Web Docs", url: "https://developer.mozilla.org/" }] },
      { step: 2, title: "React + TypeScript", status: "in-progress", duration: "2 months", resources: [{ label: "React Docs", url: "https://react.dev/learn" }] },
      { step: 3, title: "Node.js & Express", status: "upcoming", duration: "1 month", resources: [{ label: "Node.js Guides", url: "https://nodejs.org/en/learn" }] },
      { step: 4, title: "Databases (Postgres / MongoDB)", status: "upcoming", duration: "1 month" },
      { step: 5, title: "DevOps + AWS", status: "upcoming", duration: "2 months", resources: [{ label: "AWS Free Tier", url: "https://aws.amazon.com/free/" }] },
      { step: 6, title: "Build 3 Portfolio Projects", status: "upcoming", duration: "2 months" },
    ],
  },
  {
    id: "embedded-engineer",
    title: "Embedded Systems Engineer",
    match: 78,
    description: "Design firmware and IoT systems combining hardware and software.",
    salary: "₹6-22 LPA",
    growth: "+25%",
    skills: ["C/C++", "Microcontrollers", "RTOS", "Circuit Design", "IoT", "ARM"],
    icon: "🔌",
    branches: ["Electronics", "Electrical"],
    roadmap: [
      { step: 1, title: "Master C / C++", status: "in-progress", duration: "2 months", resources: [{ label: "Learn-C.org", url: "https://www.learn-c.org/" }] },
      { step: 2, title: "Microcontrollers (Arduino, STM32)", status: "upcoming", duration: "2 months", resources: [{ label: "Arduino Tutorials", url: "https://docs.arduino.cc/tutorials/" }] },
      { step: 3, title: "RTOS Concepts", status: "upcoming", duration: "1 month", resources: [{ label: "FreeRTOS Docs", url: "https://www.freertos.org/" }] },
      { step: 4, title: "IoT Protocols (MQTT, CoAP)", status: "upcoming", duration: "1 month" },
      { step: 5, title: "Build IoT Capstone", status: "upcoming", duration: "2 months" },
    ],
  },
  {
    id: "civil-bim",
    title: "BIM / Structural Engineer",
    match: 72,
    description: "Use modern CAD/BIM tools to design and analyse infrastructure projects.",
    salary: "₹5-18 LPA",
    growth: "+18%",
    skills: ["AutoCAD", "Revit", "STAAD Pro", "Structural Analysis", "Project Mgmt"],
    icon: "🏗️",
    branches: ["Civil"],
    roadmap: [
      { step: 1, title: "AutoCAD Mastery", status: "in-progress", duration: "1 month", resources: [{ label: "Autodesk Tutorials", url: "https://www.autodesk.com/learn" }] },
      { step: 2, title: "Revit & BIM Workflow", status: "upcoming", duration: "2 months" },
      { step: 3, title: "STAAD Pro / ETABS", status: "upcoming", duration: "2 months" },
      { step: 4, title: "Construction Mgmt + Primavera", status: "upcoming", duration: "1 month" },
      { step: 5, title: "Internship + Site Project", status: "upcoming", duration: "3 months" },
    ],
  },
  {
    id: "mech-design",
    title: "Mechanical Design Engineer",
    match: 70,
    description: "CAD/CAE driven product design across automotive and manufacturing.",
    salary: "₹4-16 LPA",
    growth: "+15%",
    skills: ["SolidWorks", "AutoCAD", "ANSYS", "GD&T", "Manufacturing", "Thermo"],
    icon: "⚙️",
    branches: ["Mechanical"],
    roadmap: [
      { step: 1, title: "SolidWorks / Fusion 360", status: "in-progress", duration: "2 months", resources: [{ label: "SolidWorks Tutorials", url: "https://www.solidworks.com/sw/resources/solidworks-tutorials.htm" }] },
      { step: 2, title: "GD&T Standards", status: "upcoming", duration: "1 month" },
      { step: 3, title: "FEA with ANSYS", status: "upcoming", duration: "2 months" },
      { step: 4, title: "CAM & Manufacturing Process", status: "upcoming", duration: "1 month" },
      { step: 5, title: "Design Capstone Project", status: "upcoming", duration: "2 months" },
    ],
  },
  {
    id: "power-systems",
    title: "Power Systems Engineer",
    match: 68,
    description: "Design and manage electrical grids, renewables and smart power systems.",
    salary: "₹5-20 LPA",
    growth: "+22%",
    skills: ["Power Electronics", "MATLAB", "PLC", "SCADA", "Renewables"],
    icon: "⚡",
    branches: ["Electrical"],
    roadmap: [
      { step: 1, title: "Circuit & Power Fundamentals", status: "in-progress", duration: "1 month" },
      { step: 2, title: "MATLAB / Simulink", status: "upcoming", duration: "2 months", resources: [{ label: "MATLAB Onramp", url: "https://matlabacademy.mathworks.com/" }] },
      { step: 3, title: "PLC & SCADA Basics", status: "upcoming", duration: "2 months" },
      { step: 4, title: "Renewable Energy Systems", status: "upcoming", duration: "1 month" },
      { step: 5, title: "Industrial Project", status: "upcoming", duration: "2 months" },
    ],
  },
];

export const skillGaps = [
  { skill: "Python", current: 75, required: 90, status: "in-progress" },
  { skill: "Machine Learning", current: 30, required: 85, status: "missing" },
  { skill: "Deep Learning", current: 15, required: 80, status: "missing" },
  { skill: "TensorFlow", current: 20, required: 75, status: "missing" },
  { skill: "Mathematics", current: 60, required: 80, status: "in-progress" },
  { skill: "SQL", current: 70, required: 70, status: "complete" },
  { skill: "Cloud (AWS)", current: 25, required: 70, status: "missing" },
  { skill: "Git/GitHub", current: 80, required: 75, status: "complete" },
];

export type Course = {
  id: number;
  title: string;
  platform: string;
  instructor: string;
  duration: string;
  difficulty: string;
  rating: number;
  students: string;
  color: string;
  url: string;
  category: string;
};

export const courses: Course[] = [
  { id: 1, title: "Machine Learning Specialization", platform: "Coursera", instructor: "Andrew Ng", duration: "3 months", difficulty: "Intermediate", rating: 4.9, students: "1.2M", color: "from-blue-500 to-cyan-500", url: "https://www.coursera.org/specializations/machine-learning-introduction", category: "AI/ML" },
  { id: 2, title: "Deep Learning with PyTorch", platform: "Udemy", instructor: "Jose Portilla", duration: "20 hours", difficulty: "Advanced", rating: 4.7, students: "85K", color: "from-purple-500 to-pink-500", url: "https://www.udemy.com/course/pytorch-for-deep-learning-with-python-bootcamp/", category: "AI/ML" },
  { id: 3, title: "Python for Data Science (Full Course)", platform: "YouTube", instructor: "freeCodeCamp", duration: "12 hours", difficulty: "Beginner", rating: 4.8, students: "3.5M", color: "from-yellow-500 to-orange-500", url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI", category: "AI/ML" },
  { id: 4, title: "AWS Cloud Practitioner Essentials", platform: "AWS", instructor: "AWS Training", duration: "6 hours", difficulty: "Beginner", rating: 4.7, students: "500K", color: "from-orange-500 to-red-500", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", category: "Cloud" },
  { id: 5, title: "TensorFlow Developer Certificate", platform: "Coursera", instructor: "Laurence Moroney", duration: "4 months", difficulty: "Intermediate", rating: 4.8, students: "450K", color: "from-green-500 to-teal-500", url: "https://www.coursera.org/professional-certificates/tensorflow-in-practice", category: "AI/ML" },
  { id: 6, title: "Mathematics for Machine Learning", platform: "Coursera", instructor: "Imperial College", duration: "2 months", difficulty: "Intermediate", rating: 4.7, students: "320K", color: "from-indigo-500 to-purple-500", url: "https://www.coursera.org/specializations/mathematics-machine-learning", category: "AI/ML" },
  { id: 7, title: "The Complete Web Developer Bootcamp", platform: "Udemy", instructor: "Angela Yu", duration: "65 hours", difficulty: "Beginner", rating: 4.7, students: "1M+", color: "from-pink-500 to-red-500", url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/", category: "Web Dev" },
  { id: 8, title: "React - The Complete Guide", platform: "Udemy", instructor: "Maximilian Schwarzmüller", duration: "48 hours", difficulty: "Intermediate", rating: 4.6, students: "900K", color: "from-cyan-500 to-blue-500", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", category: "Web Dev" },
  { id: 9, title: "CS50: Intro to Computer Science", platform: "edX", instructor: "Harvard - David Malan", duration: "11 weeks", difficulty: "Beginner", rating: 4.9, students: "4M+", color: "from-red-500 to-orange-500", url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x", category: "CS Fundamentals" },
  { id: 10, title: "AutoCAD Full Course for Beginners", platform: "YouTube", instructor: "CAD CAM Tutorials", duration: "8 hours", difficulty: "Beginner", rating: 4.7, students: "2M", color: "from-amber-500 to-orange-500", url: "https://www.youtube.com/watch?v=zX-G7zR3ZjE", category: "Civil/Mech" },
  { id: 11, title: "SolidWorks Tutorial Complete", platform: "YouTube", instructor: "SolidWorks Tutorials", duration: "10 hours", difficulty: "Beginner", rating: 4.8, students: "1.5M", color: "from-slate-500 to-gray-500", url: "https://www.youtube.com/watch?v=u3p3RrnrK3Y", category: "Civil/Mech" },
  { id: 12, title: "Arduino Step by Step", platform: "Udemy", instructor: "Tech Explorations", duration: "30 hours", difficulty: "Beginner", rating: 4.6, students: "60K", color: "from-teal-500 to-cyan-500", url: "https://www.udemy.com/course/arduino-the-platform-for-makers-engineers-and-everyone-else/", category: "Embedded" },
  { id: 13, title: "MATLAB Onramp (Free)", platform: "MathWorks", instructor: "MathWorks Academy", duration: "2 hours", difficulty: "Beginner", rating: 4.9, students: "1M+", color: "from-orange-500 to-yellow-500", url: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted", category: "Electrical" },
  { id: 14, title: "SQL for Data Science", platform: "Coursera", instructor: "UC Davis", duration: "1 month", difficulty: "Beginner", rating: 4.6, students: "700K", color: "from-violet-500 to-indigo-500", url: "https://www.coursera.org/learn/sql-for-data-science", category: "Data" },
  { id: 15, title: "Docker & Kubernetes", platform: "Udemy", instructor: "Stephen Grider", duration: "22 hours", difficulty: "Intermediate", rating: 4.7, students: "200K", color: "from-blue-500 to-indigo-500", url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/", category: "DevOps" },
];

export const courseCategories = ["All", "AI/ML", "Web Dev", "CS Fundamentals", "Cloud", "Data", "DevOps", "Civil/Mech", "Embedded", "Electrical"];

// Roadmap kept for backward-compat (Dashboard preview)
export const roadmap = careerPaths[0].roadmap;

export const milestones = [
  { id: 1, title: "Complete Python Course", done: true },
  { id: 2, title: "Build first ML Model", done: true },
  { id: 3, title: "Finish ML Specialization", done: false },
  { id: 4, title: "Deploy Project to Cloud", done: false },
  { id: 5, title: "Contribute to Open Source", done: false },
];

export const testResults = [
  { id: 1, topic: "Python Basics", score: 92, total: 100, date: "2 days ago" },
  { id: 2, topic: "Data Structures", score: 78, total: 100, date: "1 week ago" },
  { id: 3, topic: "ML Fundamentals", score: 65, total: 100, date: "2 weeks ago" },
];

export type MockTest = {
  id: number;
  title: string;
  questions: number;
  duration: string;
  difficulty: string;
  topic: string;
};

export const mockTests: MockTest[] = [
  { id: 1, title: "Python Programming", questions: 5, duration: "10 min", difficulty: "Beginner", topic: "python" },
  { id: 2, title: "Machine Learning Basics", questions: 5, duration: "12 min", difficulty: "Intermediate", topic: "ml" },
  { id: 3, title: "Data Structures & Algorithms", questions: 5, duration: "15 min", difficulty: "Advanced", topic: "dsa" },
  { id: 4, title: "SQL & Databases", questions: 5, duration: "10 min", difficulty: "Intermediate", topic: "sql" },
  { id: 5, title: "Web Development (HTML/CSS/JS)", questions: 5, duration: "10 min", difficulty: "Beginner", topic: "web" },
  { id: 6, title: "Deep Learning", questions: 5, duration: "12 min", difficulty: "Advanced", topic: "dl" },
];

export type Question = { q: string; options: string[]; answer: number };

export const questionBank: Record<string, Question[]> = {
  python: [
    { q: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: 2 },
    { q: "What is the output of: print(type([]))", options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"], answer: 1 },
    { q: "Which of these is NOT a Python data type?", options: ["int", "char", "list", "dict"], answer: 1 },
    { q: "What does len('hello') return?", options: ["4", "5", "6", "Error"], answer: 1 },
    { q: "Which symbol is used for comments in Python?", options: ["//", "/* */", "#", "--"], answer: 2 },
  ],
  ml: [
    { q: "Which of the following is NOT a supervised learning algorithm?", options: ["Linear Regression", "K-Means Clustering", "Decision Tree", "Random Forest"], answer: 1 },
    { q: "What does 'overfitting' mean?", options: ["Poor on training data", "Good on both", "Good on training, poor on test", "Too few parameters"], answer: 2 },
    { q: "Which library is primarily for deep learning?", options: ["NumPy", "Pandas", "TensorFlow", "Matplotlib"], answer: 2 },
    { q: "What is gradient descent used for?", options: ["Data cleaning", "Optimization", "Visualization", "Storage"], answer: 1 },
    { q: "Confusion matrix is used for?", options: ["Regression", "Classification evaluation", "Clustering", "Preprocessing"], answer: 1 },
  ],
  dsa: [
    { q: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer: 1 },
    { q: "Which DS uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1 },
    { q: "Best case time complexity of bubble sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], answer: 2 },
    { q: "A balanced BST has height of?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 1 },
    { q: "Which traversal visits root first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], answer: 1 },
  ],
  sql: [
    { q: "Which SQL keyword retrieves data?", options: ["GET", "SELECT", "FETCH", "RETRIEVE"], answer: 1 },
    { q: "JOIN that returns only matching rows?", options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"], answer: 2 },
    { q: "Aggregate function for highest value?", options: ["TOP", "MAX", "HIGH", "UPPER"], answer: 1 },
    { q: "Which clause filters groups?", options: ["WHERE", "FILTER", "HAVING", "GROUP"], answer: 2 },
    { q: "Primary key can be?", options: ["NULL", "Duplicated", "Unique & Not Null", "Optional"], answer: 2 },
  ],
  web: [
    { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text ML", "Hyperlinks Text Markup", "Home Tool ML"], answer: 0 },
    { q: "Which CSS property changes text color?", options: ["text-color", "font-color", "color", "fgcolor"], answer: 2 },
    { q: "Which is NOT a JS framework?", options: ["React", "Angular", "Vue", "Laravel"], answer: 3 },
    { q: "What does API stand for?", options: ["Application Programming Interface", "App Process Internal", "Auto Program Init", "Async Programming Interface"], answer: 0 },
    { q: "Default HTTP port?", options: ["21", "22", "80", "443"], answer: 2 },
  ],
  dl: [
    { q: "CNNs are mainly used for?", options: ["Text", "Images", "Audio only", "Tabular"], answer: 1 },
    { q: "ReLU activation outputs?", options: ["0 to 1", "-1 to 1", "max(0, x)", "sigmoid"], answer: 2 },
    { q: "Backpropagation uses?", options: ["Forward pass only", "Chain rule", "K-means", "PCA"], answer: 1 },
    { q: "Dropout is used to?", options: ["Speed up", "Reduce overfitting", "Add layers", "Save memory"], answer: 1 },
    { q: "RNNs are best for?", options: ["Images", "Sequential data", "Static data", "Clustering"], answer: 1 },
  ],
};

export const sampleQuestions = questionBank.ml;

// Study Material library
export type StudyMaterial = {
  id: number;
  title: string;
  type: "Notes" | "Cheat Sheet" | "eBook" | "Video Series" | "Documentation";
  subject: string;
  branch: string;
  url: string;
};

export const studyMaterials: StudyMaterial[] = [
  { id: 1, title: "Python Official Tutorial", type: "Documentation", subject: "Python", branch: "Computer", url: "https://docs.python.org/3/tutorial/" },
  { id: 2, title: "GeeksforGeeks DSA Notes", type: "Notes", subject: "DSA", branch: "Computer", url: "https://www.geeksforgeeks.org/data-structures/" },
  { id: 3, title: "MIT OpenCourseWare - Algorithms", type: "Video Series", subject: "Algorithms", branch: "Computer", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/" },
  { id: 4, title: "ML Cheat Sheet (Stanford)", type: "Cheat Sheet", subject: "Machine Learning", branch: "Computer", url: "https://stanford.edu/~shervine/teaching/cs-229/" },
  { id: 5, title: "Deep Learning Book (Goodfellow)", type: "eBook", subject: "Deep Learning", branch: "Computer", url: "https://www.deeplearningbook.org/" },
  { id: 6, title: "MDN Web Docs", type: "Documentation", subject: "Web Dev", branch: "Computer", url: "https://developer.mozilla.org/en-US/docs/Web" },
  { id: 7, title: "React Official Docs", type: "Documentation", subject: "React", branch: "Computer", url: "https://react.dev/learn" },
  { id: 8, title: "SQL Notes - W3Schools", type: "Notes", subject: "SQL", branch: "Computer", url: "https://www.w3schools.com/sql/" },
  { id: 9, title: "AutoCAD User Guide", type: "Documentation", subject: "AutoCAD", branch: "Civil", url: "https://help.autodesk.com/view/ACD/2024/ENU/" },
  { id: 10, title: "Strength of Materials Notes", type: "Notes", subject: "SOM", branch: "Civil", url: "https://nptel.ac.in/courses/112106141" },
  { id: 11, title: "SolidWorks Tutorials", type: "Video Series", subject: "SolidWorks", branch: "Mechanical", url: "https://www.solidworks.com/sw/resources/solidworks-tutorials.htm" },
  { id: 12, title: "Thermodynamics - NPTEL", type: "Video Series", subject: "Thermodynamics", branch: "Mechanical", url: "https://nptel.ac.in/courses/112105266" },
  { id: 13, title: "Power Systems - NPTEL", type: "Video Series", subject: "Power Systems", branch: "Electrical", url: "https://nptel.ac.in/courses/108105104" },
  { id: 14, title: "MATLAB Documentation", type: "Documentation", subject: "MATLAB", branch: "Electrical", url: "https://www.mathworks.com/help/matlab/" },
  { id: 15, title: "Arduino Reference", type: "Documentation", subject: "Arduino", branch: "Electronics", url: "https://www.arduino.cc/reference/en/" },
  { id: 16, title: "Digital Electronics - NPTEL", type: "Video Series", subject: "Digital Electronics", branch: "Electronics", url: "https://nptel.ac.in/courses/108105132" },
  { id: 17, title: "Operating Systems Notes", type: "Notes", subject: "OS", branch: "Computer", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
  { id: 18, title: "Computer Networks (Kurose)", type: "eBook", subject: "Networks", branch: "Computer", url: "https://gaia.cs.umass.edu/kurose_ross/index.php" },
];

export const studyBranches = ["All", "Computer", "Civil", "Mechanical", "Electrical", "Electronics"];

export const stats = {
  coursesCompleted: 8,
  skillsLearned: 12,
  testsAttempted: 15,
  streak: 24,
  badges: 7,
  hoursLearned: 142,
};
