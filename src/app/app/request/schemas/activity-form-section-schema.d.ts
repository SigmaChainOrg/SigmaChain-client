import { z } from "zod";

export const activityFormSectionSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(5, { message: "El nombre es muy corto" }),
  description: z.string().optional(),
});
