# AI Career Guidance System - Project Documentation

## 1. Project Overview
The **AI Career Guidance System** is an intelligent, personalized platform designed to bridge the gap between traditional college education and industry requirements. It acts as a virtual career counselor that understands a student's current academic standing, skills, and goals, and dynamically generates actionable career roadmaps, study resources, mock tests, and a professional resume.

## 2. Technology Stack
This project is built using modern web development technologies to ensure high performance, scalability, and an excellent user experience.

*   **Frontend Framework:** React.js with TypeScript (bootstrapped with Vite for fast builds).
*   **Styling:** Tailwind CSS (for rapid, utility-first styling) and Shadcn UI (for accessible, beautiful, and consistent UI components).
*   **Backend & Database:** Supabase (an open-source Firebase alternative). It provides:
    *   PostgreSQL database.
    *   Secure User Authentication (Email/Password).
    *   Real-time database subscriptions to sync state across the app.
*   **AI Integration:** 
    *   **Groq API (Llama 3):** Used for lightning-fast AI generation of mock tests, career paths, and study resources.
    *   **Google Gemini API:** Serves as a reliable fallback AI provider.
*   **Search Engine API:** SerpAPI is used to accurately resolve real-world URLs for the AI-recommended study materials.
*   **PDF Generation:** `html2canvas` and `jsPDF` are used to export the exact UI of the generated resume into a pixel-perfect, downloadable A4 PDF.

## 3. System Workflow (User Journey)

1.  **Authentication (`/auth`):** The student signs up or logs in securely via Supabase Auth.
2.  **Onboarding (`/onboarding`):** A multi-step form collects the student's profile data:
    *   Basic info (Name, Phone).
    *   Academic info (College, Branch, Year, Past Education like 10th/12th/Diploma percentages).
    *   Technical Profile (Current Skills, Interests, Career Goal).
3.  **Data Persistence (`useProgress` hook):** The onboarding data is securely saved to the `profiles` and `user_progress` tables in Supabase.
4.  **AI Engine Activation (`useAIContent` hook):** As soon as the profile is completed, the system makes secure API calls to Groq/Gemini to generate custom data tailored specifically to that student.
5.  **Dashboard Navigation (`/dashboard`):** The student lands on the dashboard where they can see their customized career paths, recommended courses, and take AI-generated mock tests.
6.  **Resume Building (`/resume`):** The student can navigate to the Resume Builder, where their profile and academic history are automatically formatted into a professional resume.

## 4. Key Features & Implementation Details

### A. Dynamic AI Content Generation
*   **Where it lives:** `src/hooks/useAIContent.tsx`
*   **How it works:** We use a "Smart Request" function that attempts to query Groq first for high speed. If Groq hits a rate limit or fails, it automatically falls back to Gemini. The AI generates raw JSON data based on strict prompts (e.g., "Generate 4 modules for a Data Science career path"). This JSON is parsed and fed into the React UI. 
*   **Caching:** To save API limits and load times, generated content is cached in `sessionStorage`.

### B. Interactive Mock Tests
*   **Where it lives:** `src/pages/MockTests.tsx`
*   **How it works:** The AI generates a 15-question Multiple Choice Question (MCQ) assessment tailored to the user's skills. When the user takes the test, React state tracks their answers. Upon submission, the score is calculated and saved to the Supabase `user_progress` table.

### C. Progress Tracking & Gamification
*   **Where it lives:** `src/pages/ProgressPage.tsx`
*   **How it works:** The `useProgress` hook constantly monitors the database. Every time a user clicks "Open Resource" on a study material or completes a mock test, a database record is created. The Progress Page reads these records to update "Weekly Goals" and award visual Achievement Badges (e.g., "Code Warrior" for taking 3 courses).

### D. Automated Resume Builder
*   **Where it lives:** `src/pages/Resume.tsx`
*   **How it works:** 
    *   **Data Aggregation:** The page pulls the student's name, college, percentages, and past education directly from their settings/onboarding data.
    *   **AI Summary:** A dedicated "Generate with AI" button sends the student's specific skills and goals to the AI to write a professional 2-3 sentence summary.
    *   **PDF Export:** The UI uses a custom formatting function to style bullet points and job titles beautifully. When "Download PDF" is clicked, `html2canvas` clones the HTML component at a high resolution and `jsPDF` converts that image into a perfect A4 PDF file.

## 5. Database Schema (Supabase)
The database relies heavily on two main tables:
1.  **`profiles`**: Stores core user identity (User ID, Full Name, Email, Branch, Year, College, Skills, Career Goal).
2.  **`user_progress`**: A highly flexible table used to store everything else. It uses `item_type` to differentiate data:
    *   `item_type = 'resume_data'`: Stores phone numbers, past education, custom summaries, and project descriptions.
    *   `item_type = 'test'`: Stores the history and scores of mock tests taken.
    *   `item_type = 'material'`: Tracks which study materials the user has read.
