import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Ensure you set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !key) {
  console.warn("Supabase configuration missing; profile operations will fall back to local state.");
}

export const supabase: SupabaseClient = createClient(url, key);

export type Profile = {
  id?: string;
  username: string;
  role: "operator" | "investor";
  full_name?: string | null;
  avatar_url?: string | null;
  created_at?: string;
};

export async function fetchProfiles(): Promise<Profile[]> {
  if (!url || !key) return [];
  const { data, error } = await supabase
    .from<Profile>("profiles")
    .select("username, role, full_name, avatar_url, created_at");
  if (error) {
    console.error("fetchProfiles error", error);
    return [];
  }
  return data || [];
}

export async function createProfile(profile: Profile): Promise<boolean> {
  if (!url || !key) return false;
  const { error } = await supabase.from<Profile>("profiles").insert(profile);
  if (error) {
    console.error("createProfile error", error);
    return false;
  }
  return true;
}

// Auth helpers
export async function signUpWithEmail(email: string, password: string) {
  if (!url || !key) return { error: new Error("supabase not configured") };
  try {
    const res = await supabase.auth.signUp({ email, password });
    return res;
  } catch (error) {
    return { error } as any;
  }
}

export async function signInWithEmail(email: string, password: string) {
  if (!url || !key) return { error: new Error("supabase not configured") };
  try {
    const res = await supabase.auth.signInWithPassword({ email, password });
    return res;
  } catch (error) {
    return { error } as any;
  }
}
