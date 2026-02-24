import { projects } from "@/data/projects";
import { getUser } from "@/lib/auth";

export function loadInvestments() {
  try {
    const raw = localStorage.getItem("crest_investments");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const MyInvestments = () => {
  const user = getUser();
  const allInvestments = loadInvestments();
  const myInvestments = allInvestments.filter((i: any) => i.username === user?.username);

  return (
    <div className="p-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">My Investments</h1>
      {myInvestments.length === 0 ? (
        <p className="text-sm text-muted-foreground">You have no recorded investments.</p>
      ) : (
        <div className="space-y-3">
          {myInvestments.map((inv: any, idx: number) => {
            const project = projects.find((p) => p.id === inv.projectId);
            return (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{project?.name || inv.projectId}</div>
                  <div className="text-xs text-muted-foreground">{new Date(inv.date).toLocaleDateString()}</div>
                </div>
                <div className="text-sm font-medium text-foreground">${inv.amount.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyInvestments;
