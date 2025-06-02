import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/Input';
import InputFile from '../../components/Register/InputFile';
import Button from '../../components/Button';
import axios from 'axios';
import { useState } from 'react';
import { User } from '../../components/Button';

const editProfileSchema = z.object({
    name: z
        .string({
            required_error: 'El nombre es obligatorio',
        })
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),

    lastName: z
        .string({
            required_error: 'El apellido es obligatorio',
        })
        .min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),

    email: z
        .string({
            required_error: 'El correo electrónico es obligatorio',
        })
        .email({ message: 'El correo electrónico no es válido' }),

    birthDate: z.string({
        required_error: 'La fecha de nacimiento es obligatoria',
    }),

    avatar: z.any().optional(),
});

type EditProfileValues = z.infer<typeof editProfileSchema>;

type Props = {
    user: User;
};

const EditProfileForm = ({ user }: Props) => {
    const [message, setMessage] = useState('');
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<EditProfileValues>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            birthDate: user.birthDate?.toString(),
        },
    });

    const onSubmit = async (data: EditProfileValues) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('birthDate', data.birthDate);

        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(res.data.message || 'Perfil actualizado');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Error al actualizar');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 max-w-xl mx-auto my-auto border border-gray-300 shadow-sm p-8 rounded-lg w-[70%]">
            <Input control={control} name="name" label="Nombre" type="text" error={errors.name} />
            <Input
                control={control}
                name="lastName"
                label="Apellido"
                type="text"
                error={errors.lastName}
            />
            <Input
                control={control}
                name="email"
                label="Correo electrónico"
                type="email"
                error={errors.email}
            />
            <Input
                control={control}
                name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                error={errors.birthDate}
            />
            <InputFile control={control} name="avatar" label="Avatar" />
            <Button type="submit" text="Guardar cambios" />
            {message && <p className="text-center text-sm">{message}</p>}
        </form>
    );
};

export default EditProfileForm;
