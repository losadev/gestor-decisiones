import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener mínimo 8 caracteres")
    .max(64)
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/\d.*\d/, "Debe contener al menos dos números")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un símbolo"),
  birthDate: z.string().nonempty("La fecha de nacimiento es obligatoria"),
});

export const validateZod = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        campo: err.path.join("."),
        mensaje: err.message,
      }));
      res.status(400).json({
        message: "Error de validación",
        errors,
      });
      return;
    }
    req.body = result.data;
    next();
  };
};

export const editUserSchema = userSchema.partial().extend({
  password: userSchema.shape.password.optional(),
  birthDate: userSchema.shape.birthDate.optional(),
});
