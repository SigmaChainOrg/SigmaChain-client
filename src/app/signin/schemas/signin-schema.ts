import { z } from "zod";

export const emailPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const secureCodeSchema = z.object({
  secureCode: z.string().length(6, {
    message: "Validation code must be exactly 6 characters",
  }),
});
