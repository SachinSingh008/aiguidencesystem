import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CareerPaths from "./pages/CareerPaths";
import SkillGap from "./pages/SkillGap";
import Courses from "./pages/Courses";
import MockTests from "./pages/MockTests";
import ProgressPage from "./pages/ProgressPage";
import Resume from "./pages/Resume";
import Settings from "./pages/Settings";
import StudyMaterial from "./pages/StudyMaterial";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/career-paths" element={<CareerPaths />} />
                <Route path="/skill-gap" element={<SkillGap />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/study-material" element={<StudyMaterial />} />
                <Route path="/mock-tests" element={<MockTests />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
