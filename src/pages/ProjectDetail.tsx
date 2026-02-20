import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  Clock,
  DollarSign,
  Building2,
  Users,
  BarChart3,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/projects";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Fully Funded": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Coming Soon": "bg-gold/15 text-gold border-gold/30",
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  subvalue,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subvalue?: string;
}) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="mb-3 flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <div className="font-display text-2xl font-bold text-foreground">{value}</div>
    {subvalue && <div className="mt-0.5 text-xs text-muted-foreground">{subvalue}</div>}
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Building2 className="mx-auto mb-4 h-16 w-16 text-muted-foreground/30" />
          <h1 className="font-display mb-2 text-2xl font-bold">Project Not Found</h1>
          <p className="mb-6 text-muted-foreground">This investment opportunity doesn't exist.</p>
          <Link to="/" className="rounded gradient-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground">
            Back to Opportunities
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.min((project.raisedAmount / project.targetRaise) * 100, 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[480px] overflow-hidden pt-16">
        <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 gradient-hero-overlay" />

        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
                <span className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {project.type}
                </span>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
                  {project.dealType}
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground leading-tight">
                {project.name}
              </h1>
              <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{project.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <MetricCard icon={TrendingUp} label="Target IRR" value={`${project.targetIRR}%`} subvalue="Annualized" />
              <MetricCard
                icon={DollarSign}
                label="Equity Multiple"
                value={`${project.equityMultiple}x`}
                subvalue="Projected"
              />
              <MetricCard icon={Clock} label="Hold Period" value={project.holdPeriod} subvalue="Projected" />
              <MetricCard
                icon={DollarSign}
                label="Min Investment"
                value={`$${(project.minInvestment / 1000).toFixed(0)}K`}
                subvalue="Per investor"
              />
            </div>

            {/* Overview */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display mb-4 text-xl font-semibold text-foreground">Investment Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Highlights */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display mb-4 text-xl font-semibold text-foreground">Deal Highlights</h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Financials */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display mb-5 text-xl font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gold" />
                Financial Summary
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.financials.purchasePrice > 0 && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="mb-1 text-xs text-muted-foreground">Purchase Price</p>
                    <p className="font-display text-lg font-semibold text-foreground">
                      ${(project.financials.purchasePrice / 1000000).toFixed(1)}M
                    </p>
                  </div>
                )}
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-1 text-xs text-muted-foreground">Total Capitalization</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    ${(project.financials.totalCapitalization / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-1 text-xs text-muted-foreground">Loan-to-Value</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {project.financials.loanToValue}%
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-1 text-xs text-muted-foreground">Projected NOI</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    ${(project.financials.projectedNOI / 1000000).toFixed(1)}M/yr
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-1 text-xs text-muted-foreground">Cap Rate</p>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {project.financials.capRate}%
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-display mb-5 text-xl font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold" />
                Investment Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-5">
                  {project.timeline.map((item, i) => (
                    <div key={i} className="relative flex items-center gap-4 pl-10">
                      <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold/40 bg-background">
                        <div className="h-2 w-2 rounded-full bg-gold" />
                      </div>
                      <div className="flex flex-1 items-center justify-between rounded-lg bg-muted px-4 py-2.5">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="text-sm text-gold font-semibold">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Sticky Invest Card */}
          <div className="space-y-5">
            <div className="sticky top-24 space-y-5">
              {/* Invest Card */}
              <div className="rounded-xl border border-gold/30 bg-card p-6 shadow-gold">
                <h3 className="font-display mb-1 text-lg font-semibold text-foreground">
                  Invest in This Opportunity
                </h3>
                <p className="mb-5 text-sm text-muted-foreground">
                  Minimum investment of ${project.minInvestment.toLocaleString()}
                </p>

                {/* Progress */}
                {project.status !== "Coming Soon" && (
                  <div className="mb-5">
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${(project.raisedAmount / 1000000).toFixed(1)}M raised
                      </span>
                      <span className="font-semibold text-foreground">
                        of ${(project.targetRaise / 1000000).toFixed(0)}M goal
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-gold transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground text-right">
                      {Math.round(progress)}% funded
                    </p>
                  </div>
                )}

                <button
                  className={`w-full rounded py-3 text-base font-semibold transition-all ${
                    project.status === "Fully Funded"
                      ? "cursor-not-allowed bg-muted text-muted-foreground"
                      : project.status === "Coming Soon"
                      ? "border border-gold/60 text-gold hover:bg-gold/10"
                      : "gradient-gold text-primary-foreground shadow-gold hover:opacity-90"
                  }`}
                  disabled={project.status === "Fully Funded"}
                >
                  {project.status === "Fully Funded"
                    ? "Fully Funded"
                    : project.status === "Coming Soon"
                    ? "Join Waitlist"
                    : "Invest Now"}
                </button>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Available to accredited investors only
                </p>
              </div>

              {/* Operator Card */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display mb-4 text-base font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold" />
                  Operator
                </h3>
                <div className="mb-3">
                  <p className="font-semibold text-foreground">{project.operator.name}</p>
                  <p className="text-xs text-muted-foreground">Founded {project.operator.founded}</p>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="font-display text-lg font-bold text-foreground">{project.operator.aum}</p>
                    <p className="text-xs text-muted-foreground">AUM</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="font-display text-lg font-bold text-foreground">
                      {project.operator.dealsCompleted}
                    </p>
                    <p className="text-xs text-muted-foreground">Deals Closed</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {project.operator.bio}
                </p>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 text-xs text-gold hover:underline">
                  View Full Profile <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl border border-border bg-card/50 p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Risk Disclaimer:</strong> Real estate investments involve risk, including possible loss of principal. Past performance is not a guarantee of future results. All projections are forward-looking estimates only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Opportunities */}
      <section className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-12">
          <h2 className="font-display mb-6 text-2xl font-bold text-foreground">More Opportunities</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {projects
              .filter((p) => p.id !== id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/project/${p.id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-gold/40 hover:bg-card group"
                >
                  <img src={p.image} alt={p.name} className="h-14 w-20 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.location}</p>
                    <p className="mt-1 text-xs text-gold font-medium">{p.targetIRR}% Target IRR</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-gold transition-colors" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
