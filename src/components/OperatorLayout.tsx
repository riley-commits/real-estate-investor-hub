import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "@/lib/auth";

const OperatorLayout = () => {
  const location = useLocation();
  const user = getUser();

  // redirect if not an operator - Route nesting already ensures authentication
  if (user?.role !== "operator") {
    return <></>;
  }

  const isActive = (path: string) => location.pathname === path;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 flex-shrink-0 bg-card border-r border-border p-6 flex flex-col">
        <h2 className="font-display text-xl font-bold mb-8">Console</h2>
        <nav className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className={`text-sm font-medium transition-colors ${isActive("/dashboard") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/manage"
            className={`text-sm font-medium transition-colors ${isActive("/dashboard/manage") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
          >
            Manage Projects
          </Link>
          <Link
            to="/dashboard/profile"
            className={`text-sm font-medium transition-colors ${isActive("/dashboard/profile") ? "text-blue" : "text-muted-foreground hover:text-foreground"}`}
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

export default OperatorLayout;
