import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Building2, TrendingUp, Users, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import type { ProjectType, DealType, ProjectStatus } from "@/data/projects";
import heroImage from "@/assets/hero-building.jpg";

const TYPES: (ProjectType | "All")[] = ["All", "Multifamily", "Office", "Industrial", "Hospitality", "Mixed-Use", "Senior Living"];
const DEAL_TYPES: (DealType | "All")[] = ["All", "Equity", "Preferred Equity", "Debt"];
const STATUSES: (ProjectStatus | "All")[] = ["All", "Active", "Coming Soon", "Fully Funded"];

const stats = [
  { icon: Building2, label: "Total Projects", value: "148+" },
  { icon: TrendingUp, label: "Avg. Target IRR", value: "16.4%" },
  { icon: Users, label: "Active Investors", value: "12,800+" },
  { icon: Shield, label: "Capital Deployed", value: "$2.1B+" },
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<ProjectType | "All">("All");
  const [selectedDealType, setSelectedDealType] = useState<DealType | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "All">("All");

  // track authentication state so we can show/blur content
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    // lazy import to avoid adding this dependency to SSR bundles
    import("@/lib/auth").then(({ isAuthenticated }) => {
      setAuthed(isAuthenticated());
      const handler = () => setAuthed(isAuthenticated());
      window.addEventListener("authChange", handler);
      return () => window.removeEventListener("authChange", handler);
    });
  }, []);

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.operator.name.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "All" || p.type === selectedType;
    const matchDeal = selectedDealType === "All" || p.dealType === selectedDealType;
    const matchStatus = selectedStatus === "All" || p.status === selectedStatus;
    return matchSearch && matchType && matchDeal && matchStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden">
        <img
          src={heroImage}
          alt="Real estate"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 gradient-hero-overlay" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 pt-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulse" />
            <span className="text-xs font-medium text-blue tracking-wide uppercase">
              Institutional-Grade Real Estate
            </span>
          </div>
          <h1 className="font-display mb-4 text-5xl font-bold leading-tight text-foreground max-w-3xl">
            Invest in Premium{" "}
            <span className="text-blue">Real Estate</span>{" "}
            Opportunities
          </h1>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Access carefully vetted commercial real estate deals alongside experienced operators.
            Starting from $10,000.
          </p>
          <div className="flex gap-4">
            <a href="#opportunities" className="rounded bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Browse Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center py-6 px-4 gap-1">
              <Icon className="h-5 w-5 text-blue mb-1" />
              <span className="font-display text-2xl font-bold text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Section */}
      <section id="opportunities" className="container mx-auto px-6 py-14">
        <div className="mb-8">
          <h2 className="font-display mb-2 text-3xl font-bold text-foreground">
            Current Opportunities
          </h2>
          <p className="text-muted-foreground">
            Browse {projects.length} investment opportunities across all asset classes.
          </p>
        </div>

        {/* wrap everything in a relative container so we can overlay if not authed */}
        <div className="relative">
          <div className={`${!authed ? "blur-sm pointer-events-none" : ""}`}> 
            {/* Search + Filters */}
            <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, location, or operator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue/50 focus:border-blue/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Filters:</span>
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedType === t
                      ? "gradient-blue text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <span className="h-4 w-px bg-border" />

            {/* Deal type filter */}
            <div className="flex gap-1.5">
              {DEAL_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedDealType(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedDealType === t
                      ? "gradient-blue text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <span className="h-4 w-px bg-border" />

            {/* Status filter */}
            <div className="flex gap-1.5">
              {STATUSES.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedStatus(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    selectedStatus === t
                      ? "gradient-blue text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-blue/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {projects.length} opportunities
        </p>

        {/* Project Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="font-display mb-2 text-xl font-semibold text-foreground">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        )}
        {/* end blurred container */}
          </div>

          {/* overlay shown when not authenticated */}
          {!authed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
              <p className="mb-4 text-lg font-semibold text-foreground">
                <span>Please </span>
                <Link to="/signin" className="text-blue underline">
                  sign in
                </Link>
                <span> to view opportunities.</span>
              </p>
              <Link
                to="/signin"
                className="rounded bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="font-display mb-4 text-3xl font-bold text-foreground">
            Are you a real estate operator?
          </h2>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            List your investment opportunity on CrestCapital and connect with thousands of accredited investors.
          </p>
          <Link
            to="/for-operators"
            className="rounded gradient-blue px-8 py-3 text-base font-semibold text-primary-foreground shadow-blue transition-opacity hover:opacity-90 inline-block"
          >
            Submit Your Deal
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
