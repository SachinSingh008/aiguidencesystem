export type CourseDBEntry = {
  title: string;
  platform: string;
  instructor: string;
  duration: string;
  difficulty: string;
  url: string;
  description: string;
  role: string;
  tags: string[];
};

// ============================================================================
// PASTE YOUR GENERATED JSON OBJECTS INSIDE THIS ARRAY!
// You can keep adding more objects here as you generate them for different streams.
// ============================================================================

export const verifiedCourses: CourseDBEntry[] = [
  // Example entry (You can delete this later or leave it):
  {
    title: "Machine Learning Specialization",
    platform: "Coursera",
    instructor: "Andrew Ng",
    duration: "2 months",
    difficulty: "Beginner",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    description: "Foundational machine learning program taught by AI pioneer Andrew Ng.",
    role: "Machine Learning Engineer",
    tags: ["machine learning", "python", "ai", "data science"]
  }
];
