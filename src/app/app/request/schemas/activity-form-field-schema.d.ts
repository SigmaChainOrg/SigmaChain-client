import { z } from "zod";

export const activityFormSectionSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(5, { message: "El nombre es muy corto" }),
  description: z.string().optional(),
});

// short answer
export const activityFormFieldSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(5, { message: "El nombre es muy corto" }),
  description: z.string().optional(),
  isRequired: z.boolean().default(false),
});

//single choice y multiple choice
export const activityFormChoiceSchema = z.object({
  ...activityFormFieldSchema.shape,
  options: z
    .array(z.string().min(5, { message: "El nombre es muy corto" }))
    .min(1, { message: "Debe agregar al menos una opción" }),
});

export const activityFormUploadFilesSchema = z.object({
  ...activityFormFieldSchema.shape,
  acceptedFiles: z
    .array(z.enum(["file", "image", "video"]))
    .min(1, { message: "Debe seleccionar al menos un tipo de archivo permitido" }),
  maxSize: z
    .number({ message: "Debe seleccionar un tamaño máximo" })
    .min(20, { message: "El tamaño mínimo es de 20MB" }),
});
