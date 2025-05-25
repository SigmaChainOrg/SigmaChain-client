import { z } from "zod";

export const emailPasswordSchema = z
  .object({
    email: z.string().email({
      message: "Email is invalid",
    }),
    password: z
      .string()
      .min(8, {
        message: "la contraseña debe tener al menos 8 caracteres",
      })
      .regex(/[a-z]/, "la contraseña debe tener al menos una letra minúscula")
      .regex(/[A-Z]/, "la contraseña debe tener al menos una letra mayúscula")
      .regex(/[0-9]/, "la contraseña debe tener al menos un número")
      .regex(/[@$!%_*?&-]/, "la contraseña debe tener al menos un símbolo especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"],
  });

export const secureCodeSchema = z.object({
  secureCode: z
    .string()
    .length(6, {
      message: "El código de verificación debe tener 6 caracteres",
    })
    .regex(/^\d+$/, "La identificación debe contener solo números"),
});

export const additionalDetailsSchema = z.object({
  firstName: z.string().min(1, {
    message: "El nombre es obligatorio",
  }),
  lastName: z.string().min(1, {
    message: "El apellido es obligatorio",
  }),
  idType: z.string().min(1, {
    message: "Seleccione un tipo de identificación",
  }),
  idNumber: z
    .string()
    .length(10, { message: "La identificación debe tener 10 dígitos" })
    .regex(/^\d+$/, "La identificación debe contener solo números"),
  birthDate: z.date({
    required_error: "La fecha de nacimiento es obligatoria",
  }),
  /*.max(new Date("1960-01-01"), {
      message: "Fecha inválida",
    })
    .min(new Date("2006-12-31"), { message: "Fecha inválida" }),*/
});
