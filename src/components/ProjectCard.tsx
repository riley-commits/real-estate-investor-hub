import { Link } from "react-router-dom";
import { MapPin, TrendingUp, Clock, DollarSign } from "lucide-react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Fully Funded": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Coming Soon": "bg-blue/15 text-blue border-blue/30",
};

const typeColors: Record<string, string> = {
  Multifamily: "bg-violet-500/10 text-violet-400",
  Office: "bg-sky-500/10 text-sky-400",
  Industrial: "bg-orange-500/10 text-orange-400",
  Hospitality: "bg-rose-500/10 text-rose-400",
  "Mixed-Use": "bg-teal-500/10 text-teal-400",
  "Senior Living": "bg-amber-500/10 text-amber-400",
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const progress = Math.min((project.raisedAmount / project.targetRaise) * 100, 100);

  return (
    <Link
      to={`/project/${project.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-blue/40 hover:shadow-blue hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 gradient-card-overlay" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        <div className="absolute right-3 top-3">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeColors[project.type]}`}>
            {project.type}
          </span>
        </div>

        {/* Location on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-foreground/90">
          <MapPin className="h-3 w-3" />
          <span className="text-xs font-medium">{project.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display mb-1 text-lg font-semibold text-foreground group-hover:text-blue transition-colors line-clamp-1">
          {project.name}
        </h3>
        <p className="mb-4 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <TrendingUp className="h-3 w-3 text-blue" />
              <span className="text-xs text-muted-foreground">Target IRR</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{project.targetIRR}%</span>
          </div>
          <div className="rounded-lg bg-muted p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <DollarSign className="h-3 w-3 text-blue" />
              <span className="text-xs text-muted-foreground">Equity ×</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{project.equityMultiple}x</span>
          </div>
          <div className="rounded-lg bg-muted p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Clock className="h-3 w-3 text-blue" />
              <span className="text-xs text-muted-foreground">Hold</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{project.holdPeriod}</span>
          </div>
        </div>

        {/* Fundraise Progress */}
        {project.status !== "Coming Soon" && (
          <div className="mb-3">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="text-muted-foreground">
                ${(project.raisedAmount / 1000000).toFixed(1)}M raised
              </span>
              <span className="font-medium text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-blue transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Min. Investment</span>
            <p className="text-sm font-semibold text-foreground">
              ${project.minInvestment.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Deal Type</span>
            <p className="text-sm font-medium text-foreground">{project.dealType}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
