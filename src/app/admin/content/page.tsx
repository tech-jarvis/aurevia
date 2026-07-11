import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { blobConfigured } from "@/lib/blob";
import { getAllEditableContent } from "@/lib/site-content";
import { isAdminAuthed } from "../actions";
import { LoginForm } from "../login-form";
import { HeroForm } from "./hero-form";
import { SectionForm } from "./section-form";
import { ImageForm } from "./image-form";

export const metadata: Metadata = {
  title: "Manage Content",
  robots: { index: false, follow: false },
};

// Always render fresh — reflects the latest admin edits.
export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const authed = await isAdminAuthed();

  if (!authed) {
    return (
      <Container className="flex min-h-[70vh] items-center justify-center py-20">
        <LoginForm redirectTo="/admin/content" />
      </Container>
    );
  }

  const { heroes, sections, images } = await getAllEditableContent();

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Lead Inbox
          </Link>
          <span className="eyebrow mt-4 block">Manage Content</span>
          <h1 className="mt-2 heading text-3xl text-cream">
            Section names & images
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Edit the eyebrow, title and lead copy for every hero and section
            across the site, and replace photos and the logo.
          </p>
        </div>
      </div>

      {!blobConfigured && (
        <p className="mt-8 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-sm text-gold">
          Image uploads are disabled until <code>BLOB_READ_WRITE_TOKEN</code> is
          set (see README). Text edits below still work.
        </p>
      )}

      <section className="mt-10">
        <h2 className="heading text-xl text-cream">Page heroes</h2>
        <div className="mt-4 flex flex-col gap-4">
          {heroes.map((hero) => (
            <HeroForm
              key={hero.key}
              heroKey={hero.key}
              label={hero.label}
              eyebrow={hero.eyebrow}
              title={hero.title}
              lead={hero.lead}
              imageUrl={hero.imageUrl}
              imageAlt={hero.imageAlt}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="heading text-xl text-cream">Section headings</h2>
        <div className="mt-4 flex flex-col gap-4">
          {sections.map((section) => (
            <SectionForm
              key={section.key}
              sectionKey={section.key}
              label={section.label}
              eyebrow={section.eyebrow}
              title={section.title}
              lead={section.lead}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="heading text-xl text-cream">Other images</h2>
        <div className="mt-4 flex flex-col gap-4">
          {images.map((image) => (
            <ImageForm
              key={image.key}
              imageKey={image.key}
              label={image.label}
              url={image.url}
              alt={image.alt}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
