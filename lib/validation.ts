import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon name is required"),
  description: z.string().min(1, "Description is required"),
});

export const planSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  monthlyPrice: z.number().nonnegative("Price must be a positive number"),
  currency: z.string().min(1, "Currency is required"),
  isPopular: z.boolean().default(false),
  features: z.array(z.string()).min(1, "At least one feature is required"),
});

export const testimonialSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  quote: z.string().min(1, "Quote is required"),
});

export const faqSchema = z.object({
  id: z.string().min(1, "ID is required"),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.number().int("Order must be an integer"),
});

export const demoRequestSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(1, "Phone number is required"),
  selectedPlan: z.string().min(1, "Please select a plan"),
  message: z.string().optional().nullable(),
});
