import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CareerPaths from "./pages/CareerPaths";
import SkillGap from "./pages/SkillGap";
import Courses from "./pages/Courses";
import MockTests from "./pages/MockTests";
import ProgressPage from "./pages/ProgressPage";
import Resume from "./pages/Resume";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
