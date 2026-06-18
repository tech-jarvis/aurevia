"use server";

import { prisma } from "@/lib/db";
import { quoteSchema } from "@/lib/validation";
import { sendLeadNotification } from "@/lib/resend";

export type QuoteFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Handle a Request-a-Quote submission: validate, persist, notify.
 * Returns a typed state consumed by the client form via useActionState.
 */
export async function submitQuote(
  _prev: QuoteFormState | null,
  formData: FormData,
): Promise<QuoteFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = quoteSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await prisma.quoteRequest.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        productLine: data.productLine,
        quantity: data.quantity || null,
        message: data.message,
      },
    });
  } catch (err) {
    console.error("Failed to save quote request:", err);
    return {
      ok: false,
      message:
        "Something went wrong saving your request. Please try again or email us directly.",
    };
  }

  // Fire-and-forget email; failure here should not block the success response.
  await sendLeadNotification(data);

  return {
    ok: true,
    message:
      "Thank you — your request has been received. Our team will be in touch shortly.",
  };
}
