import { z } from 'zod';
import { proConSchema } from './proCon.schema';

export const decisionFormSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'El título es obligatorio' })
        .max(255, { message: 'Máximo 255 caracteres' }),
    category: z.string().min(1, { message: 'La categoría es obligatoria' }),
    prosCons: z.array(proConSchema).min(1, { message: 'Debe haber al menos un pro o contra' }),
});
