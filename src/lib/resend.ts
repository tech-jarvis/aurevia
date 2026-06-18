import { Resend } from "resend";
import type { QuoteInput } from "./validation";
import { productLineLabels } from "./validation";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

/**
 * Email the team about a new quote request. No-ops (returns false) when
 * RESEND_API_KEY is not configured so the form still works in development.
 */
export async function sendLeadNotification(lead: QuoteInput): Promise<boolean> {
  if (!resend) return false;

  const to = process.env.LEADS_NOTIFY_EMAIL ?? "info@aureviaglobal.site";
  const from =
    process.env.LEADS_FROM_EMAIL ?? "Aurevia Global <onboarding@resend.dev>";

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `New quote request — ${lead.company}`,
      text: [
        `Name: ${lead.name}`,
        `Company: ${lead.company}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || "—"}`,
        `Country: ${lead.country || "—"}`,
        `Product line: ${productLineLabels[lead.productLine]}`,
        `Quantity: ${lead.quantity || "—"}`,
        "",
        "Message:",
        lead.message,
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
    return false;
  }
}
