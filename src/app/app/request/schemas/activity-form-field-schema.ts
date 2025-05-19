import { z } from "zod";

export const activityFormSectionSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(5, { message: "El nombre es muy corto o está vacío" }),
  description: z.string().optional(),
});

// short answer
export const activityFormTextFieldSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(5, { message: "El nombre es muy corto" }),
  description: z.string().optional(),
});

//single choice y multiple choice
export const activityFormChoiceFieldSchema = z.object({
  ...activityFormTextFieldSchema.shape,
  options: z
    .array(z.string().min(5, { message: "El nombre es muy corto" }))
    .min(1, { message: "Debe agregar al menos una opción" }),
});

export const activityFormUploadFilesSchema = z.object({
  ...activityFormTextFieldSchema.shape,
  options: z
    .array(z.string())
    .min(1, { message: "Debe seleccionar al menos un tipo de archivo permitido" }),
  uploadFileSize: z.number().min(20, { message: "El tamaño mínimo es de 20MB" }),
});
