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

export const careerPaths = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    match: 94,
    description: "Build intelligent systems using machine learning, deep learning, and modern AI frameworks.",
    salary: "₹12-35 LPA",
    growth: "+45%",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Mathematics", "Deep Learning"],
    icon: "🤖",
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

export const courses = [
  { id: 1, title: "Machine Learning Specialization", platform: "Coursera", instructor: "Andrew Ng", duration: "3 months", difficulty: "Intermediate", rating: 4.9, students: "1.2M", color: "from-blue-500 to-cyan-500", url: "#" },
  { id: 2, title: "Deep Learning with PyTorch", platform: "Udemy", instructor: "Jose Portilla", duration: "20 hours", difficulty: "Advanced", rating: 4.7, students: "85K", color: "from-purple-500 to-pink-500", url: "#" },
  { id: 3, title: "Python for Data Science", platform: "YouTube", instructor: "freeCodeCamp", duration: "12 hours", difficulty: "Beginner", rating: 4.8, students: "3.5M", color: "from-yellow-500 to-orange-500", url: "#" },
  { id: 4, title: "AWS Certified ML Engineer", platform: "LinkedIn Learning", instructor: "Frank Kane", duration: "25 hours", difficulty: "Advanced", rating: 4.6, students: "120K", color: "from-orange-500 to-red-500", url: "#" },
  { id: 5, title: "TensorFlow Developer Certificate", platform: "Coursera", instructor: "Laurence Moroney", duration: "4 months", difficulty: "Intermediate", rating: 4.8, students: "450K", color: "from-green-500 to-teal-500", url: "#" },
  { id: 6, title: "Mathematics for ML", platform: "Coursera", instructor: "Imperial College", duration: "2 months", difficulty: "Intermediate", rating: 4.7, students: "320K", color: "from-indigo-500 to-purple-500", url: "#" },
];

export const roadmap = [
  { step: 1, title: "Master Python Fundamentals", status: "complete", duration: "1 month" },
  { step: 2, title: "Learn Data Structures & Algorithms", status: "complete", duration: "2 months" },
  { step: 3, title: "Statistics & Mathematics for ML", status: "in-progress", duration: "1 month" },
  { step: 4, title: "Machine Learning Algorithms", status: "in-progress", duration: "3 months" },
  { step: 5, title: "Deep Learning & Neural Networks", status: "upcoming", duration: "3 months" },
  { step: 6, title: "MLOps & Model Deployment", status: "upcoming", duration: "2 months" },
  { step: 7, title: "Build Portfolio Projects", status: "upcoming", duration: "2 months" },
  { step: 8, title: "Land Your AI Engineer Role", status: "upcoming", duration: "—" },
];

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

export const mockTests = [
  { id: 1, title: "Python Programming", questions: 25, duration: "30 min", difficulty: "Beginner" },
  { id: 2, title: "Machine Learning Basics", questions: 30, duration: "45 min", difficulty: "Intermediate" },
  { id: 3, title: "Data Structures & Algorithms", questions: 40, duration: "60 min", difficulty: "Advanced" },
  { id: 4, title: "SQL & Databases", questions: 20, duration: "25 min", difficulty: "Intermediate" },
  { id: 5, title: "System Design", questions: 15, duration: "45 min", difficulty: "Advanced" },
  { id: 6, title: "Deep Learning", questions: 25, duration: "40 min", difficulty: "Advanced" },
];

export const sampleQuestions = [
  {
    q: "Which of the following is NOT a supervised learning algorithm?",
    options: ["Linear Regression", "K-Means Clustering", "Decision Tree", "Random Forest"],
    answer: 1,
  },
  {
    q: "What does 'overfitting' mean in machine learning?",
    options: ["Model performs poorly on training data", "Model performs well on both training and test data", "Model performs well on training but poorly on test data", "Model has too few parameters"],
    answer: 2,
  },
  {
    q: "Which Python library is primarily used for deep learning?",
    options: ["NumPy", "Pandas", "TensorFlow", "Matplotlib"],
    answer: 2,
  },
];

export const stats = {
  coursesCompleted: 8,
  skillsLearned: 12,
  testsAttempted: 15,
  streak: 24,
  badges: 7,
  hoursLearned: 142,
};
