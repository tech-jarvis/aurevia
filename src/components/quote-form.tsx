"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitQuote, type QuoteFormState } from "@/app/contact/actions";
import { productLineValues, productLineLabels } from "@/lib/validation";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border bg-surface-2/60 px-4 py-3 text-sm text-cream placeholder:text-faint transition-colors focus:outline-none focus:border-gold/60";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-xs text-red-400">{msg}</p>;
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted"
    >
      {children}
      {required && <span className="ml-0.5 text-gold">*</span>}
    </label>
  );
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState<
    QuoteFormState | null,
    FormData
  >(submitQuote, null);

  const errors = state?.fieldErrors ?? {};

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-gold/30 bg-surface p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold" strokeWidth={1.4} />
        <h3 className="heading text-2xl text-cream">Request received</h3>
        <p className="max-w-md text-sm text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>
            Full Name
          </Label>
          <input
            id="name"
            name="name"
            className={cn(fieldBase, errors.name ? "border-red-400/60" : "border-line")}
            placeholder="Jane Doe"
            required
          />
          <FieldError msg={errors.name} />
        </div>
        <div>
          <Label htmlFor="company" required>
            Company
          </Label>
          <input
            id="company"
            name="company"
            className={cn(fieldBase, errors.company ? "border-red-400/60" : "border-line")}
            placeholder="Acme Apparel Co."
            required
          />
          <FieldError msg={errors.company} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <input
            id="email"
            name="email"
            type="email"
            className={cn(fieldBase, errors.email ? "border-red-400/60" : "border-line")}
            placeholder="jane@company.com"
            required
          />
          <FieldError msg={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <input
            id="phone"
            name="phone"
            className={cn(fieldBase, "border-line")}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="country">Country</Label>
          <input
            id="country"
            name="country"
            className={cn(fieldBase, "border-line")}
            placeholder="United States"
          />
        </div>
        <div>
          <Label htmlFor="quantity">Estimated Quantity</Label>
          <input
            id="quantity"
            name="quantity"
            className={cn(fieldBase, "border-line")}
            placeholder="e.g. 5,000 units"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="productLine" required>
          Product Line
        </Label>
        <select
          id="productLine"
          name="productLine"
          defaultValue=""
          className={cn(
            fieldBase,
            "appearance-none",
            errors.productLine ? "border-red-400/60" : "border-line",
          )}
          required
        >
          <option value="" disabled>
            Select a product line…
          </option>
          {productLineValues.map((v) => (
            <option key={v} value={v} className="bg-surface text-cream">
              {productLineLabels[v]}
            </option>
          ))}
        </select>
        <FieldError msg={errors.productLine} />
      </div>

      <div>
        <Label htmlFor="message" required>
          Project Details
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(fieldBase, "resize-y", errors.message ? "border-red-400/60" : "border-line")}
          placeholder="Tell us about your product, materials, timeline and any branding requirements."
          required
        />
        <FieldError msg={errors.message} />
      </div>

      {state && !state.ok && state.message && (
        <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/5 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-4 text-base font-medium text-ink transition-all hover:brightness-110 disabled:opacity-60"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Sending…" : "Submit Request"}
      </button>

      <p className="text-xs text-faint">
        By submitting, you agree to be contacted about your enquiry. We never
        share your details.
      </p>
    </form>
  );
}
