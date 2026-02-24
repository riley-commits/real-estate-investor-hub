import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AUTH_KEY, isAuthenticated, logout, getUser } from "@/lib/auth";

const Navbar = () => {
  const location = useLocation();
  const isDetail = location.pathname !== "/";
  const user = getUser();
  // hide the top nav when operator or investor is in their console
  if (
    (user?.role === "operator" && location.pathname.startsWith("/dashboard")) ||
    (user?.role === "investor" && location.pathname.startsWith("/investor"))
  ) {
    return null;
  }
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  function readUser() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) return setUsername(null);
      const parsed = JSON.parse(raw);
      setUsername(parsed?.username ?? null);
    } catch {
      setUsername(null);
    }
  }

  useEffect(() => {
    readUser();
    const handler = () => readUser();
    window.addEventListener("authChange", handler);
    return () => window.removeEventListener("authChange", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded gradient-blue">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            Crest<span className="text-blue">Capital</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/for-investors"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            For Investors
          </Link>
          <Link
            to="/for-operators"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            For Operators
          </Link>
          {isAuthenticated() && username && (
            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated() && username ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Hi, {username}</span>
              <button onClick={handleLogout} className="rounded border border-border px-3 py-1 text-sm text-foreground">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Sign In
            </Link>
          )}

          <Link to="/signup" className="rounded gradient-blue px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
