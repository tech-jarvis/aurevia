"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { blobConfigured, uploadSiteImage } from "@/lib/blob";
import {
  pageHeroDefaults,
  imageDefaults,
  type PageHeroKey,
  type SectionKey,
  type ImageKey,
} from "@/lib/site-content";
import { isAdminAuthed } from "../actions";

export type ContentFormState = { ok: boolean; message: string } | null;

function readImageFile(formData: FormData): File | null {
  const file = formData.get("image");
  return file instanceof File && file.size > 0 ? file : null;
}

export async function updatePageHero(
  key: PageHeroKey,
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  if (!(await isAdminAuthed())) {
    return { ok: false, message: "Not authorized." };
  }

  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const lead = String(formData.get("lead") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim();

  if (!eyebrow || !title) {
    return { ok: false, message: "Eyebrow and title are required." };
  }

  const file = readImageFile(formData);
  let imageUrl: string | undefined;
  if (file) {
    if (!blobConfigured) {
      return {
        ok: false,
        message: "Image uploads need BLOB_READ_WRITE_TOKEN configured (see README).",
      };
    }
    try {
      imageUrl = await uploadSiteImage(file, `hero-${key}`);
    } catch (err) {
      console.error("Hero image upload failed:", err);
      return { ok: false, message: "Image upload failed. Please try again." };
    }
  }

  const fallback = pageHeroDefaults[key];
  await prisma.pageHero.upsert({
    where: { key },
    create: {
      key,
      eyebrow,
      title,
      lead: lead || null,
      imageUrl: imageUrl ?? fallback.imageUrl,
      imageAlt: imageAlt || fallback.imageAlt,
    },
    update: {
      eyebrow,
      title,
      lead: lead || null,
      ...(imageUrl ? { imageUrl } : {}),
      imageAlt: imageAlt || null,
    },
  });

  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function updateSectionHeading(
  key: SectionKey,
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  if (!(await isAdminAuthed())) {
    return { ok: false, message: "Not authorized." };
  }

  const eyebrow = String(formData.get("eyebrow") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const lead = String(formData.get("lead") ?? "").trim();

  if (!title) {
    return { ok: false, message: "Title is required." };
  }

  await prisma.sectionHeading.upsert({
    where: { key },
    create: { key, eyebrow: eyebrow || null, title, lead: lead || null },
    update: { eyebrow: eyebrow || null, title, lead: lead || null },
  });

  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function updateSiteImage(
  key: ImageKey,
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  if (!(await isAdminAuthed())) {
    return { ok: false, message: "Not authorized." };
  }

  const alt = String(formData.get("alt") ?? "").trim();
  const file = readImageFile(formData);

  const existing = await prisma.siteImage.findUnique({ where: { key } });
  const fallback = imageDefaults[key];

  if (!file && !existing && !fallback) {
    return { ok: false, message: "Please choose an image to upload." };
  }

  let url = existing?.url ?? fallback?.url;
  if (file) {
    if (!blobConfigured) {
      return {
        ok: false,
        message: "Image uploads need BLOB_READ_WRITE_TOKEN configured (see README).",
      };
    }
    try {
      url = await uploadSiteImage(file, `image-${key}`);
    } catch (err) {
      console.error("Site image upload failed:", err);
      return { ok: false, message: "Image upload failed. Please try again." };
    }
  }

  if (!url) {
    return { ok: false, message: "Please choose an image to upload." };
  }

  await prisma.siteImage.upsert({
    where: { key },
    create: { key, url, alt: alt || fallback?.alt || "" },
    update: { url, alt: alt || fallback?.alt || "" },
  });

  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}
