import { consultationSchema } from "@/utils/consultationSchema";

it("rejects an invalid consultation request", () => {
  const result = consultationSchema.safeParse({ name: "", email: "bad", destination: "" });
  expect(result.success).toBe(false);
});

it("accepts a complete consultation request", () => {
  const result = consultationSchema.safeParse({ name: "Asha", email: "asha@example.com", destination: "United Kingdom" });
  expect(result.success).toBe(true);
});
