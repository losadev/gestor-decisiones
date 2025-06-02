import Input from '../Input';
import InputFile from './InputFile';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRegisterValues, registerFormSchema } from '../../schemas/register.schema';
import Button, { User } from '../Button';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FormEditProfile = ({ user }: { user?: User }) => {
    const [message, setMessage] = useState('');
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormRegisterValues>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onBlur',
        defaultValues: {
            name: user?.name,
            lastName: user?.lastName,
            email: user?.email,
            birthDate: user?.birthDate,
        },
    });

    useEffect(() => {
        reset({
            name: user?.name,
            lastName: user?.lastName,
            email: user?.email,
            birthDate: user?.birthDate,
        });
    }, [user]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('birthDate', data.birthDate);

        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            const req = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData);
            setMessage('Perfil actualizado correctamente');
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold">Editar perfil</h1>

            <div className="flex gap-2 flex-col sm:flex-row">
                <Input
                    control={control}
                    name="name"
                    label="Nombre"
                    type="text"
                    error={errors.name}
                />
                <Input
                    control={control}
                    name="lastName"
                    label="Apellido"
                    type="text"
                    error={errors.lastName}
                />
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
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
            </div>

            <InputFile control={control} name="avatar" label="Avatar" />

            <Button text="Guardar cambios" type="submit" />

            {message && <p>{message}</p>}
        </form>
    );
};

export default FormEditProfile;
