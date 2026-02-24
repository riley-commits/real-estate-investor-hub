import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const authed = isAuthenticated();
  const location = useLocation();
  if (!authed) return <Navigate to="/signin" state={{ from: location }} replace />;
  return <>{children}</>;
}
