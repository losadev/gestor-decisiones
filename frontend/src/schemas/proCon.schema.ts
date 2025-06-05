import { z } from 'zod';

export const proConSchema = z.object({
    description: z
        .string()
        .min(1, { message: 'La descripción es obligatoria' })
        .max(255, { message: 'Máximo 255 caracteres' }),
    type: z.enum(['Pro', 'Contra'], {
        errorMap: () => ({ message: 'Tipo inválido' }),
    }),
    weight: z
        .number()
        .min(0, { message: 'El peso mínimo es 1' })
        .max(10, { message: 'El peso máximo es 10' }),
});
