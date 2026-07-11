"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, ImageUp } from "lucide-react";
import { updatePageHero, type ContentFormState } from "./actions";
import type { PageHeroKey } from "@/lib/site-content";

export function HeroForm({
  heroKey,
  label,
  eyebrow,
  title,
  lead,
  imageUrl,
  imageAlt,
}: {
  heroKey: PageHeroKey;
  label: string;
  eyebrow: string;
  title: string;
  lead: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
}) {
  const action = updatePageHero.bind(null, heroKey);
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    action,
    null,
  );

  return (
    <form
      action={formAction}
      className="grid gap-5 rounded-2xl border border-line bg-surface-2/60 p-6 lg:grid-cols-[1fr_1.2fr]"
    >
      <div className="flex flex-col gap-4">
        <h3 className="heading text-sm tracking-wide text-gold">{label}</h3>

        <Field label="Eyebrow" name="eyebrow" defaultValue={eyebrow} />
        <Field label="Title" name="title" defaultValue={title} />
        <Field label="Lead paragraph" name="lead" defaultValue={lead ?? ""} textarea />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-faint">
            Image alt text
          </label>
          <input
            type="text"
            name="imageAlt"
            defaultValue={imageAlt ?? ""}
            placeholder="Describe the photo for accessibility"
            className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream placeholder:text-faint focus:border-gold/60 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-wider text-faint">
          Hero image
        </span>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-ink/40">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt ?? ""}
              fill
              sizes="400px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-faint">
              No image set
            </div>
          )}
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-cream hover:border-gold hover:text-gold">
          <ImageUp className="h-4 w-4" />
          Replace image
          <input type="file" name="image" accept="image/*" className="hidden" />
        </label>

        <div className="mt-auto flex items-center gap-3">
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
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-wider text-faint">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className="w-full resize-none rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-gold/60 focus:outline-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          defaultValue={defaultValue}
          className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream focus:border-gold/60 focus:outline-none"
        />
      )}
    </div>
  );
}
