import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { createUser } from "@/lib/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"operator" | "investor">("investor");
  const [photo, setPhoto] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return alert("Enter a username");
    if (!email) return alert("Enter an email");
    if (!password) return alert("Enter a password");
    const ok = await createUser(username, role, fullName || null, photo, email, password);
    if (!ok) return alert("Username already exists");
    // created and auto-logged in by createUser
    if (role === "operator") navigate("/dashboard");
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24">
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6">
          <h1 className="font-display mb-2 text-xl font-semibold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mb-4">Choose an account type and create your user.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="text-xs text-muted-foreground">Full name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Profile Photo</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const f = e.target.files ? e.target.files[0] : null;
              if (!f) return;
              const reader = new FileReader();
              reader.onload = () => setPhoto(String(reader.result));
              reader.readAsDataURL(f);
            }} className="mt-1 w-full text-sm text-foreground" />
            {photo && (
              <img src={photo} alt="preview" className="mt-2 h-24 w-auto rounded" />
            )}

            <label className="mt-3 text-xs text-muted-foreground">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <label className="mt-3 text-xs text-muted-foreground">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground" />

            <div className="flex items-center gap-3">
              <label className="text-sm">
                <input type="radio" name="role" checked={role === "investor"} onChange={() => setRole("investor")} /> Investor
              </label>
              <label className="text-sm">
                <input type="radio" name="role" checked={role === "operator"} onChange={() => setRole("operator")} /> Operator
              </label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="rounded gradient-blue px-4 py-2 text-sm font-semibold text-primary-foreground">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
