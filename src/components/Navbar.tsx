import { Link, useLocation } from "react-router-dom";
import { Building2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isDetail = location.pathname !== "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded gradient-gold">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            Crest<span className="text-gold">Capital</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Opportunities
          </Link>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Portfolio
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </a>
          <button className="rounded border border-gold/60 px-4 py-1.5 text-sm font-medium text-gold transition-all hover:bg-gold/10">
            Sign In
          </button>
          <button className="rounded gradient-gold px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
