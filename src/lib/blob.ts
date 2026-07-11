import { put } from "@vercel/blob";

const token = process.env.BLOB_READ_WRITE_TOKEN;

/** True once Vercel Blob is configured; image uploads are disabled without it. */
export const blobConfigured = Boolean(token);

/** Upload an admin-supplied image to Vercel Blob and return its public URL. */
export async function uploadSiteImage(file: File, keyPrefix: string): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(`site/${keyPrefix}-${Date.now()}.${ext}`, file, {
    access: "public",
    token,
    addRandomSuffix: true,
  });
  return blob.url;
}
