import { z } from "zod";

export const RequestPatternSchema = z.object({
  name: z.string().min(5, { message: "El nombre es muy corto o está vacío" }),
});

export const FieldSchema = z.object({
  text: z.string().min(5, { message: "El texto es muy corto o esta vacío" }),
  options: z.array(z.string()).length(0, { message: "Seleccione una opción" }),
});

export const TextFieldSchema = z.object({
  text: z.string().min(5, { message: "El texto es muy corto o esta vacío" }),
});

export const ChoiceFieldSchema = z.object({
  options: z.array(z.string()).length(0, { message: "Seleccione una opción" }),
});

export const MultipleChoiceFieldSchema = z.object({
  options: z.array(z.string()).min(1, { message: "Seleccione al menos una opción" }),
});

export const ActivityFieldSchema = z.object({
  name: z.string().min(5, { message: "El nombre es muy corto o está vacío" }),
  reviewerGroup: z.string().min(1, { message: "Un grupo revisor es requerido" }),
  responsable: z.string().min(1, { message: "Un responsable es requerido" }),
});
