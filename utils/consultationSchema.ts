import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name."),
  email: z.string().trim().email("Enter a valid email address."),
  destination: z.string().trim().min(2, "Choose or enter a destination."),
});

export type ConsultationValues = z.infer<typeof consultationSchema>;

