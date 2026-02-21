import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { OperatorProject } from "@/pages/Dashboard";

const PROJECT_TYPES = ["Multifamily", "Office", "Industrial", "Hospitality", "Mixed-Use", "Senior Living"];
const DEAL_TYPES = ["Equity", "Preferred Equity", "Debt"];
const STATUSES = ["Active", "Coming Soon", "Fully Funded"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: OperatorProject | null;
  profileId: string;
  onSaved: () => void;
}

const ProjectFormDialog = ({ open, onOpenChange, project, profileId, onSaved }: Props) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    long_description: "",
    location: "",
    city: "",
    state: "",
    project_type: "Multifamily",
    deal_type: "Equity",
    status: "Coming Soon",
    target_irr: 0,
    equity_multiple: 0,
    min_investment: 0,
    hold_period: "",
    target_raise: 0,
    image_url: "",
    purchase_price: 0,
    total_capitalization: 0,
    loan_to_value: 0,
    projected_noi: 0,
    cap_rate: 0,
  });

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title,
        description: project.description,
        long_description: project.long_description || "",
        location: project.location,
        city: project.city,
        state: project.state,
        project_type: project.project_type,
        deal_type: project.deal_type,
        status: project.status,
        target_irr: project.target_irr,
        equity_multiple: project.equity_multiple,
        min_investment: project.min_investment,
        hold_period: project.hold_period,
        target_raise: project.target_raise,
        image_url: project.image_url || "",
        purchase_price: project.purchase_price,
        total_capitalization: project.total_capitalization,
        loan_to_value: project.loan_to_value,
        projected_noi: project.projected_noi,
        cap_rate: project.cap_rate,
      });
    } else {
      setForm({
        title: "",
        description: "",
        long_description: "",
        location: "",
        city: "",
        state: "",
        project_type: "Multifamily",
        deal_type: "Equity",
        status: "Coming Soon",
        target_irr: 0,
        equity_multiple: 0,
        min_investment: 0,
        hold_period: "",
        target_raise: 0,
        image_url: "",
        purchase_price: 0,
        total_capitalization: 0,
        loan_to_value: 0,
        projected_noi: 0,
        cap_rate: 0,
      });
    }
  }, [project, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);

    const payload = {
      ...form,
      operator_id: profileId,
      raised_amount: project?.raised_amount ?? 0,
      highlights: project?.highlights ?? [],
    };

    try {
      if (project) {
        const { error } = await supabase
          .from("operator_projects")
          .update(payload)
          .eq("id", project.id);
        if (error) throw error;
        toast.success("Project updated");
      } else {
        const { error } = await supabase
          .from("operator_projects")
          .insert(payload as any);
        if (error) throw error;
        toast.success("Project created");
      }
      onSaved();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50";
  const labelClass = "mb-1 block text-xs font-medium text-muted-foreground";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            {project ? "Edit Project" : "New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
              Basic Information
            </h3>
            <div>
              <label className={labelClass}>Project Title *</label>
              <input name="title" required value={form.title} onChange={handleChange} className={inputClass} placeholder="Meridian Luxury Apartments" />
            </div>
            <div>
              <label className={labelClass}>Short Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className={inputClass + " min-h-[60px]"} placeholder="Brief summary of the investment..." />
            </div>
            <div>
              <label className={labelClass}>Full Description</label>
              <textarea name="long_description" value={form.long_description} onChange={handleChange} className={inputClass + " min-h-[100px]"} placeholder="Detailed project description..." />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Location</label>
                <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="Austin, TX" />
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Austin" />
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input name="state" value={form.state} onChange={handleChange} className={inputClass} placeholder="TX" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Image URL</label>
              <input name="image_url" value={form.image_url} onChange={handleChange} className={inputClass} placeholder="https://..." />
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
              Classification
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Project Type</label>
                <select name="project_type" value={form.project_type} onChange={handleChange} className={inputClass}>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Deal Type</label>
                <select name="deal_type" value={form.deal_type} onChange={handleChange} className={inputClass}>
                  {DEAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                  {STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Investment Metrics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
              Investment Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Target IRR (%)</label>
                <input name="target_irr" type="number" step="0.1" value={form.target_irr} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Equity Multiple (x)</label>
                <input name="equity_multiple" type="number" step="0.01" value={form.equity_multiple} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Min Investment ($)</label>
                <input name="min_investment" type="number" value={form.min_investment} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hold Period</label>
                <input name="hold_period" value={form.hold_period} onChange={handleChange} className={inputClass} placeholder="5 Years" />
              </div>
              <div>
                <label className={labelClass}>Target Raise ($)</label>
                <input name="target_raise" type="number" value={form.target_raise} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
              Financial Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Purchase Price ($)</label>
                <input name="purchase_price" type="number" value={form.purchase_price} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Total Capitalization ($)</label>
                <input name="total_capitalization" type="number" value={form.total_capitalization} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Loan-to-Value (%)</label>
                <input name="loan_to_value" type="number" step="0.1" value={form.loan_to_value} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Projected NOI ($)</label>
                <input name="projected_noi" type="number" value={form.projected_noi} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Cap Rate (%)</label>
                <input name="cap_rate" type="number" step="0.1" value={form.cap_rate} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg gradient-gold px-6 py-2 text-sm font-semibold text-primary-foreground shadow-gold transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
