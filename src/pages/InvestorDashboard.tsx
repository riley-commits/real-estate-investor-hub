import { projects } from "@/data/projects";
import { getUser } from "@/lib/auth";
import { Link } from "react-router-dom";

function loadInvestments() {
  try {
    const raw = localStorage.getItem("crest_investments");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const InvestorDashboard = () => {
  const user = getUser();
  const allInvestments = loadInvestments();
  const myInvestments = allInvestments.filter((i: any) => i.username === user?.username);
  const totalInvested = myInvestments.reduce((s: number, i: any) => s + (i.amount || 0), 0);

  return (
    <div className="p-6">
      <h1 className="font-display text-3xl font-bold text-foreground mb-4">Investor Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-6">Your investments and portfolio summary.</p>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Total Invested</div>
          <div className="font-display text-2xl font-bold text-foreground">${totalInvested.toLocaleString()}</div>
        </div>
        <Link to="/investor/investments" className="rounded gradient-blue px-4 py-2 text-sm font-semibold text-primary-foreground">
          View My Investments
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold text-foreground mb-2">Latest Investments</h3>
        {myInvestments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No investments yet.</p>
        ) : (
          <ul className="space-y-2">
            {myInvestments.slice(-5).map((inv: any, idx: number) => {
              const project = projects.find((p) => p.id === inv.projectId);
              return (
                <li key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{project?.name || inv.projectId}</span>
                  <span className="text-xs text-muted-foreground">${inv.amount.toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
