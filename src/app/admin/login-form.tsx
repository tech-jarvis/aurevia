"use client";

import { useActionState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <form
      action={action}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-line bg-surface p-8"
    >
      <div className="flex items-center gap-3 text-gold">
        <Lock className="h-5 w-5" />
        <h1 className="heading text-xl text-cream">Admin Access</h1>
      </div>
      <p className="text-sm text-muted">
        Enter your admin username and password to view submitted quote requests.
      </p>
      <input
        type="text"
        name="username"
        placeholder="Username"
        autoComplete="username"
        autoFocus
        className="w-full rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-sm text-cream placeholder:text-faint focus:border-gold/60 focus:outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        className="w-full rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-sm text-cream placeholder:text-faint focus:border-gold/60 focus:outline-none"
      />
      {state?.error && <p className="text-xs text-red-400">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-6 py-3 text-sm font-medium text-ink hover:brightness-110 disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In
      </button>
    </form>
  );
}
