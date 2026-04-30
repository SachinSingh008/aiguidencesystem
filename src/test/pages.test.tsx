/**
 * pages.test.tsx
 * Component-level tests using React Testing Library + Vitest.
 * Tests that key UI sections render correctly with mocked data.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// ── Mock heavy dependencies so we can test UI in isolation ────────────────────
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
      getSession: () => Promise.resolve({ data: { session: null } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: null }) }) }),
    }),
  },
}));

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    profile: {
      full_name: "Test Student",
      branch: "Computer Engineering",
      year: "3rd Year",
      current_skills: ["Python", "MySQL", "Postman"],
      interests: ["QA & Testing", "API Development"],
      career_goal: "Software Engineer",
      onboarded: true,
    },
    loading: false,
    refreshProfile: vi.fn(),
    signOut: vi.fn(),
  }),
}));

vi.mock("@/hooks/useProgress", () => ({
  useProgress: () => ({
    items: [],
    stats: { coursesCompleted: 3, coursesInProgress: 2, testsAttempted: 5, avgTestScore: 78 },
    upsert: vi.fn(),
  }),
}));

vi.mock("@/hooks/useGeneratedContent", () => ({
  useGeneratedContent: () => ({
    content: {
      careerPaths: [
        {
          id: "cp1",
          title: "Software Engineer",
          icon: "💻",
          match: 92,
          description: "Build scalable software systems.",
          salary: "₹8–25 LPA",
          growth: "High demand",
          skills: ["Python", "MySQL", "REST APIs", "Git"],
          roadmap: [
            { step: 1, title: "Learn Python", status: "complete", duration: "2 months", resources: [] },
            { step: 2, title: "Master MySQL", status: "in-progress", duration: "1 month", resources: [] },
            { step: 3, title: "Postman & REST APIs", status: "upcoming", duration: "3 weeks", resources: [] },
          ],
        },
      ],
      courses: [],
      videoLectures: [],
      studyMaterials: [
        { id: 1, title: "MySQL for Beginners", type: "Notes", subject: "Database", branch: "Computer Engineering", url: "https://example.com" },
        { id: 2, title: "Postman API Testing Guide", type: "Documentation", subject: "API Testing", branch: "Computer Engineering", url: "https://example.com/postman" },
        { id: 3, title: "Software Testing Basics", type: "eBook", subject: "Testing", branch: "Computer Engineering", url: "https://example.com/testing" },
      ],
      mockTests: [],
      skillGaps: [
        { skill: "MySQL", current: 40, required: 80, status: "missing" },
        { skill: "Postman", current: 60, required: 80, status: "in-progress" },
        { skill: "Python", current: 85, required: 80, status: "complete" },
        { skill: "REST APIs", current: 50, required: 75, status: "missing" },
      ],
    },
    loading: false,
    generating: false,
    generatingParts: [],
    stale: false,
    regenerate: vi.fn(),
    regeneratePart: vi.fn(),
  }),
  GeneratedContentProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// ── Helpers ─────────────────────────────────────────────────────────────────
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

// ── Dashboard tests ──────────────────────────────────────────────────────────
describe("Dashboard page", () => {
  it("renders the personalised greeting with student first name", async () => {
    const { default: Dashboard } = await import("@/pages/Dashboard");
    renderWithRouter(<Dashboard />);
    expect(screen.getByText(/Hi,/i)).toBeDefined();
    // "Test" (from "Test Student") may match multiple nodes — check at least one
    expect(screen.getAllByText(/Test/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders all 4 stat cards", async () => {
    const { default: Dashboard } = await import("@/pages/Dashboard");
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("Courses Done")).toBeDefined();
    expect(screen.getByText("In Progress")).toBeDefined();
    expect(screen.getByText("Tests Taken")).toBeDefined();
    expect(screen.getByText("Avg Test Score")).toBeDefined();
  });

  it("renders CS Quick Spotlight section for Computer Engineering branch", async () => {
    const { default: Dashboard } = await import("@/pages/Dashboard");
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("CS Quick Spotlight")).toBeDefined();
    // CS Spotlight items render as links — check at least one occurrence of each
    expect(screen.getAllByText("MySQL Bootcamp").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Postman API Testing").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Software Testing").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the top career match section", async () => {
    const { default: Dashboard } = await import("@/pages/Dashboard");
    renderWithRouter(<Dashboard />);
    expect(screen.getByText("Your Top Career Match")).toBeDefined();
    // Software Engineer may appear in multiple elements — just check at least one exists
    expect(screen.getAllByText("Software Engineer").length).toBeGreaterThanOrEqual(1);
  });
});

// ── SkillGap tests ───────────────────────────────────────────────────────────
describe("SkillGap page", () => {
  it("renders the page heading", async () => {
    const { default: SkillGap } = await import("@/pages/SkillGap");
    renderWithRouter(<SkillGap />);
    expect(screen.getByText("Skill Gap Analyzer")).toBeDefined();
  });

  it("shows correct missing, in-progress, and mastered counts", async () => {
    const { default: SkillGap } = await import("@/pages/SkillGap");
    renderWithRouter(<SkillGap />);
    // 2 missing (MySQL, REST APIs), 1 in-progress (Postman), 1 complete (Python)
    const counts = screen.getAllByText(/^\d+$/);
    const numbers = counts.map((el) => parseInt(el.textContent || "0"));
    expect(numbers).toContain(2); // missing
    expect(numbers).toContain(1); // in-progress & complete
  });

  it("renders the Skill Gap Overview chart section", async () => {
    const { default: SkillGap } = await import("@/pages/SkillGap");
    renderWithRouter(<SkillGap />);
    expect(screen.getByText("Skill Gap Overview")).toBeDefined();
  });

  it("lists MySQL and Postman as skills in the detailed analysis", async () => {
    const { default: SkillGap } = await import("@/pages/SkillGap");
    renderWithRouter(<SkillGap />);
    expect(screen.getByText("MySQL")).toBeDefined();
    expect(screen.getByText("Postman")).toBeDefined();
  });
});

// ── StudyMaterial tests ──────────────────────────────────────────────────────
describe("StudyMaterial page", () => {
  it("renders the page heading", async () => {
    const { default: StudyMaterial } = await import("@/pages/StudyMaterial");
    renderWithRouter(<StudyMaterial />);
    expect(screen.getByText("Study Material Library")).toBeDefined();
  });

  it("renders material cards including MySQL content", async () => {
    const { default: StudyMaterial } = await import("@/pages/StudyMaterial");
    renderWithRouter(<StudyMaterial />);
    expect(screen.getByText("MySQL for Beginners")).toBeDefined();
    expect(screen.getByText("Postman API Testing Guide")).toBeDefined();
  });

  it("renders CS Quick Filter chips", async () => {
    const { default: StudyMaterial } = await import("@/pages/StudyMaterial");
    renderWithRouter(<StudyMaterial />);
    // CS Quick Filter chips
    expect(screen.getAllByText("Database / MySQL").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("API / Postman").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Software Testing").length).toBeGreaterThanOrEqual(1);
  });

  it("shows CS Topics label before the filter chips", async () => {
    const { default: StudyMaterial } = await import("@/pages/StudyMaterial");
    renderWithRouter(<StudyMaterial />);
    expect(screen.getByText("CS Topics:")).toBeDefined();
  });
});

// ── CareerPaths tests ────────────────────────────────────────────────────────
describe("CareerPaths page", () => {
  it("renders the page heading", async () => {
    const { default: CareerPaths } = await import("@/pages/CareerPaths");
    renderWithRouter(<CareerPaths />);
    expect(screen.getByText("AI-Recommended Career Paths")).toBeDefined();
  });

  it("shows the Software Engineer career path card", async () => {
    const { default: CareerPaths } = await import("@/pages/CareerPaths");
    renderWithRouter(<CareerPaths />);
    expect(screen.getByText("Software Engineer")).toBeDefined();
  });

  it("shows the 92% match badge", async () => {
    const { default: CareerPaths } = await import("@/pages/CareerPaths");
    renderWithRouter(<CareerPaths />);
    // Career paths show 92% match badge
    expect(screen.getAllByText("92% match").length).toBeGreaterThanOrEqual(1);
  });
});
