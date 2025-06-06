import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const registerFormSchema = z
    .object({
        name: z.string().min(1, 'El nombre es obligatorio'),
        lastName: z.string().min(2, 'El apellido es obligatorio'),
        email: z.string().email('Correo inválido').min(1, { message: 'El correo es obligatorio' }),
        password: z.string().min(6, 'La contraseña de tener al menos 6 caracteres'),
        confirmPassword: z.string().min(6, 'La confirmación debe tener al menos 6 caracteres'),
        birthDate: z.coerce.date({
            errorMap: () => ({ message: 'La fecha es inválida' }),
        }),
        avatar: z
            .any()
            .optional()
            .refine(
                (files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
                'La imagen debe pesar menos de 5MB.'
            )
            .refine(
                (files) =>
                    !files ||
                    files.length === 0 ||
                    ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type),
                'Solo se permiten imágenes .jpg, .jpeg, .png y .webp.'
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas son inválidas',
        path: ['confirmPassword'],
    });

export type FormRegisterValues = z.infer<typeof registerFormSchema>;

