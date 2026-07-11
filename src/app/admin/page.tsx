import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, LayoutTemplate } from "lucide-react";
import { prisma } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { productLineLabels } from "@/lib/validation";
import { isAdminAuthed, logout } from "./actions";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh — leads change and depend on the session cookie.
export const dynamic = "force-dynamic";

const statusStyles: Record<string, string> = {
  NEW: "border-gold/40 text-gold",
  CONTACTED: "border-blue-400/40 text-blue-300",
  CLOSED: "border-line text-faint",
};

export default async function AdminPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-20">
        <LoginForm />
      </Container>
    );
  }

  const leads = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <Container className="py-16">
      <div className="flex items-center justify-between">
        <div>
          <span className="eyebrow">Lead Inbox</span>
          <h1 className="mt-2 heading text-3xl text-cream">Quote Requests</h1>
          <p className="mt-1 text-sm text-muted">
            {leads.length} {leads.length === 1 ? "request" : "requests"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream hover:border-gold hover:text-gold"
          >
            <LayoutTemplate className="h-4 w-4" />
            Manage Content
          </Link>
          <form action={logout}>
            <button className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-cream hover:border-gold hover:text-gold">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-line bg-surface p-10 text-center text-sm text-muted">
          No quote requests yet.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-line bg-surface-2/60 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="heading text-lg text-cream">{lead.company}</span>
                  <span className="ml-3 text-sm text-muted">{lead.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      statusStyles[lead.status] ?? "border-line text-faint"
                    }`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-xs text-faint">
                    {lead.createdAt.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Email" value={lead.email} />
                <Field label="Phone" value={lead.phone ?? "—"} />
                <Field label="Country" value={lead.country ?? "—"} />
                <Field label="Quantity" value={lead.quantity ?? "—"} />
                <Field
                  label="Product line"
                  value={productLineLabels[lead.productLine]}
                />
              </div>

              <p className="mt-4 whitespace-pre-line rounded-xl border border-line bg-ink/40 p-4 text-sm text-muted">
                {lead.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-faint">{label}</div>
      <div className="mt-0.5 text-cream">{value}</div>
    </div>
  );
}
