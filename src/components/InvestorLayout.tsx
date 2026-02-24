import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "@/lib/auth";

const InvestorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  if (user?.role !== "investor") {
    return <></>;
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 flex-shrink-0 bg-card border-r border-border p-6 flex flex-col">
        <h2 className="font-display text-xl font-bold mb-8">Investor Console</h2>
        <nav className="flex flex-col gap-3 flex-1">
          <Link
            to="/investor"
            className={`text-sm font-medium transition-colors ${isActive("/investor") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/investor/projects"
            className={`text-sm font-medium transition-colors ${isActive("/investor/projects") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            View Projects
          </Link>
          <Link
            to="/investor/investments"
            className={`text-sm font-medium transition-colors ${isActive("/investor/investments") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            My Investments
          </Link>
          <Link
            to="/investor/profile"
            className={`text-sm font-medium transition-colors ${isActive("/investor/profile") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            My Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-left text-muted-foreground hover:text-foreground"
          >
            Sign Out
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default InvestorLayout;
