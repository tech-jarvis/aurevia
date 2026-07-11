"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, ImageUp } from "lucide-react";
import { updateSiteImage, type ContentFormState } from "./actions";
import type { ImageKey } from "@/lib/site-content";

export function ImageForm({
  imageKey,
  label,
  url,
  alt,
}: {
  imageKey: ImageKey;
  label: string;
  url: string | null;
  alt: string;
}) {
  const action = updateSiteImage.bind(null, imageKey);
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    action,
    null,
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-2xl border border-line bg-surface-2/60 p-6 sm:grid-cols-[160px_1fr_auto] sm:items-center"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-ink/40">
        {url ? (
          <Image src={url} alt={alt} fill sizes="160px" className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-xs text-faint">
            No image set
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="heading text-sm tracking-wide text-gold">{label}</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-wider text-faint">
            Alt text
          </label>
          <input
            type="text"
            name="alt"
            defaultValue={alt}
            placeholder="Describe the image for accessibility"
            className="w-full rounded-xl border border-line bg-ink/40 px-4 py-2.5 text-sm text-cream placeholder:text-faint focus:border-gold/60 focus:outline-none"
          />
        </div>
        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-xs text-cream hover:border-gold hover:text-gold">
          <ImageUp className="h-4 w-4" />
          Replace image
          <input type="file" name="image" accept="image/*" className="hidden" />
        </label>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
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
