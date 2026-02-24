import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import Dashboard from "./pages/Dashboard";
import DashboardEdit from "./pages/DashboardEdit";
import ManageProjects from "./pages/ManageProjects";
import OperatorProfile from "./pages/OperatorProfile";
import InvestorDashboard from "./pages/InvestorDashboard";
import ViewProjects from "./pages/ViewProjects";
import MyInvestments from "./pages/MyInvestments";
import InvestorProfile from "./pages/InvestorProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForOperators from "./pages/ForOperators";
import ForInvestors from "./pages/ForInvestors";
import RequireAuth from "./components/RequireAuth";
import OperatorLayout from "./components/OperatorLayout";
import InvestorLayout from "./components/InvestorLayout";
import Invest from "./pages/Invest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route
            path="/dashboard/*"
            element={
              <RequireAuth>
                <OperatorLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="new" element={<DashboardEdit />} />
            <Route path="edit/:id" element={<DashboardEdit />} />
            <Route path="manage" element={<ManageProjects />} />
            <Route path="profile" element={<OperatorProfile />} />
          </Route>
          <Route
            path="/investor/*"
            element={
              <RequireAuth>
                <InvestorLayout />
              </RequireAuth>
            }
          >
            <Route index element={<InvestorDashboard />} />
            <Route path="projects" element={<ViewProjects />} />
            <Route path="investments" element={<MyInvestments />} />
            <Route path="profile" element={<InvestorProfile />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/for-operators" element={<ForOperators />} />
          <Route path="/for-investors" element={<ForInvestors />} />
          <Route path="/invest/:id" element={<Invest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
