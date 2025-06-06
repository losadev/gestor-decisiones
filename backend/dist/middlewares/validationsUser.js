"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserSchema = exports.validateZod = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: zod_1.z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    email: zod_1.z.string().email("Correo inválido"),
    password: zod_1.z
        .string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .max(64)
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/\d.*\d/, "Debe contener al menos dos números")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener al menos un símbolo"),
    birthDate: zod_1.z.string().nonempty("La fecha de nacimiento es obligatoria"),
});
const validateZod = (schema) => {
    return (req, res, next) => {
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
exports.validateZod = validateZod;
exports.editUserSchema = exports.userSchema.partial().extend({
    password: exports.userSchema.shape.password.optional(),
    birthDate: exports.userSchema.shape.birthDate.optional(),
});
