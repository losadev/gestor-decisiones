import Input from '../Input';
import InputFile from './InputFile';
import LoginLink from './LoginLink';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormRegisterValues, registerFormSchema } from '../../schemas/register.schema';
import Button from '../Button';
import axios from 'axios';
import { useState } from 'react';
const FormRegister = () => {
    const [message, setMessage] = useState<string>('');
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormRegisterValues>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: {
        name: string;
        lastName: string;
        email: string;
        password: string;
        birthDate: Date;
        avatar?: string;
    }) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);

        const formattedDate = data.birthDate.toISOString().split('T')[0];
        formData.append('birthDate', formattedDate); // 'YYYY-MM-DD'
        if (data && data.avatar) {
            formData.append('avatar', data.avatar[0]); // Aquí subes el archivo (muy importante)
        }

        try {
            const req = await axios.post('http://localhost:5000/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json', // ! NO FUNCIONA CON MULTIPART
                },
            });
            setMessage(req.data.message);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center ">
                <img src="/logo.svg" alt="logo" className="h-[200px] " />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-gray-300 shadow-2xl text-[15px] rounded-lg p-4 sm:w-[50%] sm:mx-auto md:w-[50%] md:mx-auto lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Registro</h1>
                    <p className="text-gray-600">
                        Crea una nueva cuenta para acceder a nuestra plataforma
                    </p>
                </div>
                <div className="flex flex-col gap-1 mt-8 ">
                    <div className="flex flex-col ">
                        <Input
                            control={control}
                            name="name"
                            label="Nombre"
                            type="text"
                            placeholder="John"
                            error={errors.name}
                        />
                        <Input
                            control={control}
                            label="Apellido"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            error={errors.lastName}
                        />
                    </div>

                    <div className="flex flex-col">
                        <Input
                            control={control}
                            label="Correo electrónico"
                            name="email"
                            type="email"
                            placeholder="john.doe@gmail.com"
                            error={errors.email}
                        />

                        <Input
                            control={control}
                            label="Contraseña"
                            name="password"
                            type="password"
                            error={errors.password}
                        />
                        <Input
                            control={control}
                            label="Confirma la contraseña"
                            name="confirmPassword"
                            type="password"
                            error={errors.confirmPassword}
                        />
                    </div>

                    <Input
                        control={control}
                        label="Fecha de nacimiento"
                        name="birthDate"
                        placeholder="Selecciona una fecha"
                        type="date"
                        error={errors.birthDate}
                    />
                    <InputFile label="Avatar" name="avatar" />
                    <Button text="Registarse" type="submit" />
                    <LoginLink />
                </div>
                {message && <p>{message}</p>}
            </form>
        </>
    );
};

export default FormRegister;
