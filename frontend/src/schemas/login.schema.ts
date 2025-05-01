import z from 'zod';

export const loginFormSchema = z.object({
    email: z.string().email().min(1, { message: 'El email es obligatorio' }),
    password: z.string().min(1, { message: 'La contraseña es obligatoria' }),
});

export type FormLoginValues = z.infer<typeof loginFormSchema>;
