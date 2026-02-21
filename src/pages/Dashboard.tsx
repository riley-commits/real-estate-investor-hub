import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Building2, LogOut, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import ProjectFormDialog from "@/components/ProjectFormDialog";

export interface OperatorProject {
  id: string;
  title: string;
  description: string;
  long_description: string;
  location: string;
  city: string;
  state: string;
  project_type: string;
  deal_type: string;
  status: string;
  target_irr: number;
  equity_multiple: number;
  min_investment: number;
  hold_period: string;
  target_raise: number;
  raised_amount: number;
  image_url: string;
  highlights: string[];
  purchase_price: number;
  total_capitalization: number;
  loan_to_value: number;
  projected_noi: number;
  cap_rate: number;
  created_at: string;
  operator_id: string;
}

const Dashboard = () => {
  const { user, profileId, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<OperatorProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<OperatorProject | null>(null);
  const [profile, setProfile] = useState<{ name: string; company_name: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profileId) {
      fetchProjects();
      fetchProfile();
    }
  }, [profileId]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("name, company_name")
      .eq("id", profileId!)
      .single();
    if (data) setProfile(data);
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("operator_projects")
      .select("*")
      .eq("operator_id", profileId!)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load projects");
    } else {
      setProjects((data as unknown as OperatorProject[]) || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("operator_projects").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete project");
    } else {
      toast.success("Project deleted");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (project: OperatorProject) => {
    setEditingProject(project);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingProject(null);
    setDialogOpen(true);
  };

  const handleSaved = () => {
    setDialogOpen(false);
    setEditingProject(null);
    fetchProjects();
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "Fully Funded": return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      default: return "bg-gold/15 text-gold border-gold/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded gradient-gold">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">
              Crest<span className="text-gold">Capital</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Eye className="h-4 w-4" />
              View Site
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Operator Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              {profile?.company_name
                ? `${profile.company_name} — Manage your listed projects`
                : "Manage your listed investment opportunities"}
            </p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 rounded-lg gradient-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Building2 className="mb-4 h-16 w-16 text-muted-foreground/20" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create your first project to start attracting investors on CrestCapital.
            </p>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 rounded-lg gradient-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition-opacity hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-gold/30"
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-20 w-28 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="flex h-20 w-28 items-center justify-center rounded-lg bg-muted shrink-0">
                    <Building2 className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg font-semibold text-foreground truncate">
                      {project.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColor(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{project.location}</p>
                  <div className="mt-1.5 flex gap-4 text-xs text-muted-foreground">
                    <span>
                      IRR: <span className="text-gold font-medium">{project.target_irr}%</span>
                    </span>
                    <span>
                      Min: <span className="text-foreground font-medium">${(project.min_investment / 1000).toFixed(0)}K</span>
                    </span>
                    <span>{project.project_type} · {project.deal_type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProjectFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        project={editingProject}
        profileId={profileId!}
        onSaved={handleSaved}
      />
    </div>
  );
};

export default Dashboard;
