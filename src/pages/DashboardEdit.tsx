import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { projects, addProject, updateProject, Project } from "@/data/projects";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const DashboardEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const existing = id ? projects.find((p) => p.id === id) : undefined;

  const [form, setForm] = useState<Partial<Project>>({
    name: existing?.name ?? "",
    location: existing?.location ?? "",
    type: existing?.type ?? "Multifamily",
    dealType: existing?.dealType ?? "Equity",
    status: existing?.status ?? "Coming Soon",
    targetIRR: existing?.targetIRR ?? 12,
    minInvestment: existing?.minInvestment ?? 10000,
    individualInvestmentSize: existing?.individualInvestmentSize ?? existing?.minInvestment ?? 10000,
    targetRaise: existing?.targetRaise ?? 1000000,
    image: existing?.image ?? "",
    longDescription: existing?.longDescription ?? "",
    documents: existing?.documents ?? [],
  });
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const generateDescription = async () => {
    if (!form.name || !form.location) {
      return alert("Please provide a project name and location to generate a description.");
    }
    try {
      setIsGeneratingDescription(true);
      await new Promise((r) => setTimeout(r, 500));

      const name = String(form.name);
      const location = String(form.location);
      const type = String(form.type || "Multifamily");
      const dealType = String(form.dealType || "Equity");
      const targetIRR = form.targetIRR ? `${Number(form.targetIRR)}%` : "TBD";
      const minInvestment = form.minInvestment ? `$${Number(form.minInvestment).toLocaleString()}` : "$0";
      const targetRaise = form.targetRaise ? `$${Number(form.targetRaise).toLocaleString()}` : "TBD";

      const generated = `${name} is a ${type} ${dealType.toLowerCase()} investment opportunity located in ${location}. The offering targets an IRR of ${targetIRR} with a minimum investment of ${minInvestment}. The raise target is ${targetRaise} to acquire and improve the asset, with a focus on driving occupancy and cash-flow growth.\n\nHighlights:\n- Experienced operator with aligned incentives\n- Favorable market fundamentals in ${location}\n- Clear value-add plan focused on renovation and lease-up\n\nThis opportunity is structured to deliver attractive risk-adjusted returns through a combination of cash distributions and long-term appreciation. Contact the operator to learn more and review the offering memorandum.`;

      setForm({ ...form, longDescription: generated });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  useEffect(() => {
    if (existing) setForm({
      name: existing.name,
      location: existing.location,
      type: existing.type,
      dealType: existing.dealType,
      status: existing.status,
      targetIRR: existing.targetIRR,
      minInvestment: existing.minInvestment,
      individualInvestmentSize: existing.individualInvestmentSize ?? existing.minInvestment,
      targetRaise: existing.targetRaise,
      image: existing.image,
      documents: existing.documents ?? [],
      longDescription: existing.longDescription,
    });
  }, [id]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const items = Array.from(files);
    const converted = await Promise.all(
      items.map(
        (f) =>
          new Promise<{ name: string; type: string; size: number; dataUrl: string }>((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res({ name: f.name, type: f.type, size: f.size, dataUrl: String(reader.result) });
            reader.onerror = rej;
            reader.readAsDataURL(f);
          })
      )
    );
    setForm({ ...form, documents: [...(form.documents || []), ...converted] });
  };

  const handleImageFile = async (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: String(reader.result) });
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (index: number) => {
    const docs = (form.documents || []).slice();
    docs.splice(index, 1);
    setForm({ ...form, documents: docs });
  };

  const handleSave = () => {
    if (!form.name || !form.location) return alert("Please provide name and location");
    if (id && existing) {
      updateProject(id, form as Partial<Project>);
    } else {
      const newId = slugify(String(form.name || "project-" + Date.now()));
        const newProject: Project = {
        id: newId,
        name: String(form.name),
        location: String(form.location),
        city: "",
        state: "",
        type: (form.type as any) || "Multifamily",
        dealType: (form.dealType as any) || "Equity",
        status: (form.status as any) || "Coming Soon",
        image: form.image || "",
        targetIRR: Number(form.targetIRR) || 12,
        equityMultiple: 1,
        holdPeriod: "TBD",
        minInvestment: Number(form.minInvestment) || 10000,
        individualInvestmentSize: Number(form.individualInvestmentSize) || Number(form.minInvestment) || 10000,
        documents: form.documents || [],
        targetRaise: Number(form.targetRaise) || 1000000,
        raisedAmount: 0,
        description: String(form.longDescription || ""),
        longDescription: String(form.longDescription || ""),
        highlights: [],
        financials: {
          purchasePrice: 0,
          totalCapitalization: 0,
          loanToValue: 0,
          projectedNOI: 0,
          capRate: 0,
        },
        operator: {
          name: "Operator Name",
          founded: 2020,
          aum: "$0",
          dealsCompleted: 0,
          bio: "",
        },
        timeline: [],
      };

      addProject(newProject);
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="font-display mb-4 text-2xl font-bold text-foreground">{id ? "Edit Project" : "Post New Project"}</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-4">
            <label className="text-xs text-muted-foreground">Name</label>
            <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Location</label>
            <input value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Target IRR</label>
            <input type="number" value={String(form.targetIRR ?? "")} onChange={(e) => setForm({ ...form, targetIRR: Number(e.target.value) })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Minimum Investment</label>
            <input type="number" value={String(form.minInvestment ?? "")} onChange={(e) => setForm({ ...form, minInvestment: Number(e.target.value) })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />
            <label className="mt-3 text-xs text-muted-foreground">Individual Investment Size (slot)</label>
            <input type="number" value={String(form.individualInvestmentSize ?? "")} onChange={(e) => setForm({ ...form, individualInvestmentSize: Number(e.target.value) })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <label className="text-xs text-muted-foreground">Target Raise</label>
            <input type="number" value={String(form.targetRaise ?? "")} onChange={(e) => setForm({ ...form, targetRaise: Number(e.target.value) })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground">
              <option>Coming Soon</option>
              <option>Active</option>
              <option>Fully Funded</option>
            </select>

            <label className="mt-3 text-xs text-muted-foreground">Image URL</label>
            <input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />
            <label className="mt-3 text-xs text-muted-foreground">Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageFile(e.target.files ? e.target.files[0] : null)} className="mt-1 w-full text-sm text-foreground" />
            {form.image && (
              <img src={form.image} alt="preview" className="mt-2 h-24 w-auto rounded" />
            )}

            <label className="mt-3 text-xs text-muted-foreground">Upload Documents</label>
            <input type="file" multiple onChange={(e) => handleFiles(e.target.files)} className="mt-1 w-full text-sm text-foreground" />
            {(form.documents || []).length > 0 && (
              <div className="mt-2 space-y-2">
                {(form.documents || []).map((d, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 rounded border border-border bg-background p-2">
                    <div className="min-w-0">
                      <div className="text-sm text-foreground line-clamp-1">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{(d.size / 1024).toFixed(0)} KB</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={d.dataUrl} download={d.name} className="text-sm text-blue">Download</a>
                      <button onClick={() => removeDocument(i)} className="text-sm text-muted-foreground">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="mt-3 text-xs text-muted-foreground">Description</label>
              <button
                type="button"
                onClick={generateDescription}
                disabled={isGeneratingDescription}
                className="mt-3 ml-2 inline-flex items-center gap-2 rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isGeneratingDescription ? "Generating..." : "Suggest Description"}
              </button>
            </div>
            <textarea value={form.longDescription || ""} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground h-28" />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={handleSave} className="rounded gradient-blue px-4 py-2 text-sm font-semibold text-primary-foreground">
            Save
          </button>
          <button onClick={() => navigate(-1)} className="rounded border border-border px-4 py-2 text-sm text-muted-foreground">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardEdit;
