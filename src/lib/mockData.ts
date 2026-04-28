// All preset/dummy data has been removed.
// Catalogs are intentionally empty — pages render empty states until real data is added.

export type Roadmap = {
  step: number;
  title: string;
  status: "complete" | "in-progress" | "upcoming";
  duration: string;
  resources?: { label: string; url: string }[];
};

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

export const careerPaths: CareerPath[] = [];

export const skillGaps: { skill: string; current: number; required: number; status: "missing" | "in-progress" | "complete" }[] = [];

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

export const courses: Course[] = [];
export const courseCategories = ["All"];

export const milestones: { id: number; title: string; done: boolean }[] = [];
export const testResults: { id: number; topic: string; score: number; total: number; date: string }[] = [];

export type MockTest = {
  id: number;
  title: string;
  questions: number;
  duration: string;
  difficulty: string;
  topic: string;
};

export const mockTests: MockTest[] = [];

export type Question = { q: string; options: string[]; answer: number };
export const questionBank: Record<string, Question[]> = {};
export const sampleQuestions: Question[] = [];

export type StudyMaterial = {
  id: number;
  title: string;
  type: "Notes" | "Cheat Sheet" | "eBook" | "Video Series" | "Documentation";
  subject: string;
  branch: string;
  url: string;
};

export const studyMaterials: StudyMaterial[] = [];
export const studyBranches = ["All"];
