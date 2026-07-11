"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { updateSectionHeading, type ContentFormState } from "./actions";
import type { SectionKey } from "@/lib/site-content";

export function SectionForm({
  sectionKey,
  label,
  eyebrow,
  title,
  lead,
}: {
  sectionKey: SectionKey;
  label: string;
  eyebrow: string | null;
  title: string;
  lead: string | null;
}) {
  const action = updateSectionHeading.bind(null, sectionKey);
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    action,
    null,
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-6 sm:grid-cols-3"
    >
      <h3 className="heading text-sm tracking-wide text-gold sm:col-span-3">
        {label}
      </h3>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-faint">
          Eyebrow
        </label>
        <input
          type="text"
          name="eyebrow"
          defaultValue={eyebrow ?? ""}
          className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-gold/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-faint">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={title}
          className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-gold/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-wider text-faint">
          Lead paragraph
        </label>
        <input
          type="text"
          name="lead"
          defaultValue={lead ?? ""}
          className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-gold/60 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3 sm:col-span-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-5 py-2.5 text-sm font-medium text-ink hover:brightness-110 disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </button>
        {state && (
          <span className={`text-xs ${state.ok ? "text-gold" : "text-red-400"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
