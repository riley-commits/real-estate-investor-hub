import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ManageProjects = () => {
  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">Manage Projects</h1>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <div className="text-lg font-semibold text-foreground">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.location}</div>
            </div>
            <Link
              to={`/dashboard/edit/${p.id}`}
              className="rounded border border-border px-3 py-1 text-sm text-foreground"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProjects;
