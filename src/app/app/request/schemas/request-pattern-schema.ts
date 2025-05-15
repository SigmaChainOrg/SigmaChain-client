import { z } from "zod";

export const RequestPatternSchema = z.object({
  name: z.string().min(5, { message: "El nombre es muy corto o está vacío" }),
});

//cambiar la validación a que se ajuste al tipo de campo, por ahora lo dejaré así ya que de momento no estamos haciendo que estos campos sean dinámicos
export const RequestPatternFieldDescriptionSchema = z.object({
  description: z
    .string()
    .min(5, { message: "La descripción es muy corta o está vacía. Una descripción es requerida" }),
});
export const RequestPatternFieldRequesterGroupSchema = z.object({
  requesterGroup: z
    .array(z.string(), {
      message: "Al menos un grupo solicitante es requerido",
    })
    .min(0, { message: "Seleccione al menos un grupo solicitante" }),
});

export const ActivityFieldSchema = z.object({
  name: z.string().min(5, { message: "El nombre es muy corto o está vacío" }),
  reviewerGroup: z.string().min(1, { message: "Un grupo revisor es requerido" }),
  responsable: z.string().min(1, { message: "Un responsable es requerido" }),
});
