"use client";

import { authClient } from "../../../lib/auth/client";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, isPending, error } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session: session ?? null,
    isPending,
    error,
    isAuthenticated: !!session,
  };
}

export async function login(email: string, password: string) {
  return authClient.signIn.email({ email, password });
}

export async function register(name: string, email: string, password: string) {
  return authClient.signUp.email({ name, email, password });
}

export async function logout() {
  return authClient.signOut();
}
