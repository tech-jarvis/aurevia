"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "aurevia_admin";

/** Token stored in the session cookie — never the raw credentials. */
function sessionToken(username: string, password: string): string {
  return createHash("sha256").update(`${username}:${password}`).digest("hex");
}

/** Configured admin credentials, or null when admin access is disabled. */
function getCredentials(): { username: string; password: string } | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  // Username is optional; defaults to "admin" if only a password is set.
  const username = process.env.ADMIN_USERNAME || "admin";
  return { username, password };
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminAuthed(): Promise<boolean> {
  const creds = getCredentials();
  if (!creds) return false;
  const store = await cookies();
  return (
    store.get(COOKIE)?.value === sessionToken(creds.username, creds.password)
  );
}

export async function login(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const creds = getCredentials();
  if (!creds) {
    return { error: "Admin access is not configured." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== creds.username || password !== creds.password) {
    return { error: "Incorrect username or password." };
  }

  const store = await cookies();
  store.set(COOKIE, sessionToken(creds.username, creds.password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  const redirectTo = String(formData.get("redirectTo") ?? "");
  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}
