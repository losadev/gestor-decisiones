import z from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'El email es obligatorio' }) // valida no vacío con mensaje personalizado
        .email({ message: 'Correo inválido' }), // valida formato email
    password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
});
