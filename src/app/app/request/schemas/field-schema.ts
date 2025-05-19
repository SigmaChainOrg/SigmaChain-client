import { z } from "zod";

export const textFieldSchema = z.object({
  //This includes textArea or Input
  value: z
    .string({ message: "Este campo es obligatorio" })
    .min(5, { message: "El texto es muy corto o está vacío" }),
});

export const optionsFieldSchema = z.object({
  // for checkBoxes or fields that needs at least one option
  value: z
    .array(z.string(), {
      message: "Este campo es obligatorio",
    })
    .min(1, { message: "Seleccione al menos una opción" }),
});

export const optionFieldSchema = z.object({
  // for radioButtons, comboboxes or fields that needs only one option
  value: z
    .array(z.string(), { message: "Este campo es obligatorio" })
    .length(1, { message: "Seleccione una opción" }),
});
