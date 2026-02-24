import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { login } from "@/lib/auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [role, setRole] = useState<"operator" | "investor">("operator");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert("Please enter a username");
    setLoading(true);
    setTimeout(() => {
      login(username, role);
      setLoading(false);
      navigate(role === "operator" ? "/dashboard" : "/investor");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6">
          <h1 className="font-display mb-2 text-xl font-semibold text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground mb-4">Enter a username to simulate operator sign-in.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />
            <div className="flex items-center gap-3">
              <label className="text-sm">
                <input type="radio" name="role" checked={role === "operator"} onChange={() => setRole("operator")} /> Operator
              </label>
              <label className="text-sm">
                <input type="radio" name="role" checked={role === "investor"} onChange={() => setRole("investor")} /> Investor
              </label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="rounded gradient-blue px-4 py-2 text-sm font-semibold text-primary-foreground">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
