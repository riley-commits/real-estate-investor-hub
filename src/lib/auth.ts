export const AUTH_KEY = "crest_auth_user";

export type AuthUser = {
  username: string;
  role: "operator" | "investor";
  fullName?: string | null;
  photo?: string | null;
  at: number;
};

export function isAuthenticated() {
  try {
    return !!localStorage.getItem(AUTH_KEY);
  } catch {
    return false;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function login(username: string, role: "operator" | "investor", fullName?: string | null, photo?: string | null) {
  try {
    const user: AuthUser = { username, role, fullName: fullName ?? null, photo: photo ?? null, at: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    try {
      window.dispatchEvent(new Event("authChange"));
    } catch {}
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  try {
    localStorage.removeItem(AUTH_KEY);
    try {
      window.dispatchEvent(new Event("authChange"));
    } catch {}
  } catch {}
}

const USERS_KEY = "crest_users";

export async function getUsers(): Promise<AuthUser[]> {
  // try fetching from Supabase first
  try {
    const { fetchProfiles } = await import("./supabase");
    const profiles = await fetchProfiles();
    if (profiles.length) {
      return profiles.map((p) => ({ username: p.username, role: p.role, fullName: p.full_name ?? null, photo: p.avatar_url ?? null, at: Date.now() }));
    }
  } catch (e) {
    // if supabase isn't configured or the import fails, fall back to localStorage
  }

  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AuthUser[];
  } catch {
    return [];
  }
}

export async function createUser(
  username: string,
  role: AuthUser["role"],
  fullName?: string | null,
  photo?: string | null,
  email?: string | null,
  password?: string | null
) {
  try {
    const users = await getUsers();
    const normalized = (username || "").trim().toLowerCase();
    if (users.find((u) => (u.username || "").trim().toLowerCase() === normalized)) return false;

    // If email/password provided, attempt to create Supabase auth user first
    if (email && password) {
      try {
        const { signUpWithEmail } = await import("./supabase");
        const res: any = await signUpWithEmail(email, password);
        if (res?.error) {
          console.warn("supabase signUp error", res.error);
          // proceed to still create profile locally but indicate failure
        }
      } catch (e) {
        console.warn("supabase signUp failed", e);
      }
    }

    const u: AuthUser = { username, role, fullName: fullName ?? null, photo: photo ?? null, at: Date.now() };

    // attempt to persist profile to Supabase
    try {
      const { createProfile } = await import("./supabase");
      await createProfile({ username, role, full_name: fullName ?? null, avatar_url: photo ?? null });
    } catch (e) {
      console.warn("could not create supabase profile", e);
    }

    users.push(u);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    // auto-login new user
    login(username, role, fullName ?? null, photo ?? null);
    return true;
  } catch {
    return false;
  }
}
