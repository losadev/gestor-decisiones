import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRegisterValues, registerFormSchema } from '../schemas/register.schema';
import ModalNavBar from '../modal/ModalNavBar';
import Input from '../components/Input';
import InputFile from '../components/InputFile';
import Button from '../components/Button';
import LoginLink from '../components/register/LoginLink';
const FormRegister = () => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormRegisterValues>({
        resolver: zodResolver(registerFormSchema),
        mode: 'onBlur',
        criteriaMode: 'all',
    });

    const onSubmit = async (data: {
        name: string;
        lastName: string;
        email: string;
        password: string;
        birthDate: Date;
        avatar?: FileList;
    }) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);

        const formattedDate = data.birthDate.toISOString().split('T')[0];
        formData.append('birthDate', formattedDate); // 'YYYY-MM-DD'
        if (data && data.avatar) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            const req = await axios.post('http://localhost:5000/api/register', formData);
            setMessage(req.data.message);
            navigate('/login');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error al registrar el usuario');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:px-16 sm:pb-16 pt-0">
            <ModalNavBar />

            <div className="hidden sm:flex justify-center items-center ">
                <img src="/logo.svg" alt="logo" className="h-[200px] " />
            </div>

            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="sm:border h-full flex flex-col bg-white border-gray-300 sm:shadow-2xl text-[15px] sm:rounded-lg p-4 sm:mx-auto">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Registro</h1>
                    <p className="text-gray-600">
                        Crea una nueva cuenta para acceder a nuestra plataforma
                    </p>
                </div>
                <div className="flex flex-col gap-1 mt-8 ">
                    <div className="flex flex-col sm:flex-row gap-2">
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

                    <div className="flex flex-col sm:flex-row gap-2">
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
                            label="Fecha de nacimiento"
                            name="birthDate"
                            placeholder="Selecciona una fecha"
                            type="date"
                            error={errors.birthDate}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
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
                    <InputFile label="Avatar" name="avatar" control={control} />
                    {message && <p className="text-red-600">{message}</p>}
                    <Button text={loading ? 'Registrando...' : 'Registrarse'} type="submit" />
                    <LoginLink />
                </div>
            </form>
        </div>
    );
};

export default FormRegister;
