import { z } from "zod";

export const productLineValues = [
  "MEDICAL",
  "WORKWEAR",
  "ACTIVE",
  "PRIVATE_LABEL",
  "OTHER",
] as const;

export const productLineLabels: Record<
  (typeof productLineValues)[number],
  string
> = {
  MEDICAL: "Aurevia Medical",
  WORKWEAR: "Aurevia Workwear",
  ACTIVE: "Aurevia Active",
  PRIVATE_LABEL: "Private Label",
  OTHER: "Other / Not sure",
};

/** Shared schema for the Request a Quote form (client + server). */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: z.string().trim().min(2, "Please enter your company.").max(160),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  productLine: z.enum(productLineValues, {
    message: "Please choose a product line.",
  }),
  quantity: z.string().trim().max(60).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (10+ characters).")
    .max(4000),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
