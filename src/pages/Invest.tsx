import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { projects, updateProject } from "@/data/projects";
import { getUser, isAuthenticated } from "@/lib/auth";

const INVEST_KEY = "crest_investments";

function saveInvestment(record: { projectId: string; username: string; amount: number; date: number }) {
  try {
    const raw = localStorage.getItem(INVEST_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(record);
    localStorage.setItem(INVEST_KEY, JSON.stringify(arr));
  } catch {}
}

const Invest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const user = getUser();

  const [amount, setAmount] = useState<number>(project?.individualInvestmentSize ?? project?.minInvestment ?? 0);

  if (!project) return <div className="min-h-screen bg-background"><Navbar /><div className="container mx-auto px-6 pt-24">Project not found</div></div>;
  if (!isAuthenticated() || user?.role !== "investor") {
    navigate("/signin");
    return null;
  }

  const unit = project.individualInvestmentSize ?? project.minInvestment;
  const remaining = Math.max(0, project.targetRaise - project.raisedAmount);

  const handleInvest = () => {
    if (!amount || amount < unit) return alert(`Minimum investment is $${unit.toLocaleString()}`);
    if (amount % unit !== 0) return alert(`Amount must be in increments of $${unit.toLocaleString()}`);
    if (amount > remaining) return alert(`Only $${remaining.toLocaleString()} remaining to raise`);
    // Update in-memory raisedAmount
    updateProject(project.id, { raisedAmount: project.raisedAmount + amount });
    saveInvestment({ projectId: project.id, username: user.username, amount, date: Date.now() });
    alert("Investment recorded — thank you!");
    navigate(`/project/${project.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6">
          <h1 className="font-display mb-2 text-xl font-semibold text-foreground">Invest in {project.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">Minimum: ${project.minInvestment.toLocaleString()}</p>
          <div className="space-y-3">
            <label className="text-xs text-muted-foreground">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />
            <div className="flex justify-end">
              <button onClick={handleInvest} className="rounded gradient-blue px-4 py-2 text-sm font-semibold text-primary-foreground">Invest</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invest;
