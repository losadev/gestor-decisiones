import { useState } from 'react';
import { FormLoginValues, loginFormSchema } from '../../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Button from '../Button';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Dashboard/NavBar';
import ModalNavBar from '../../modal/ModalNavBar';
import RegisterLink from './RegisterLink';

const LoginForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: { email: string; password: string }) => {
        console.log(data);
        try {
            const response = await axios.post('http://localhost:5000/api/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            navigate('/dashboard/overview');
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response.data.message);
        }
    };
    return (
        <div className="h-screen flex flex-col items-center w-full">
            <ModalNavBar />
            <div className="hidden sm:flex justify-center items-center ">
                <img src="/logo.svg" alt="logo" className="h-[200px] " />
            </div>
            <h1 className="font-semibold text-2xl mt-4 mb-2 text-left flex w-full px-4">
                Inicia sesión
            </h1>
            <p className="w-full text-left px-4 mb-4 text-gray-600">
                Si ya tienes cuenta inicia sesión
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:border sm:border-gray-300 bg-white sm:shadow-2xl text-[15px] rounded-lg p-4 sm:w-[50%] sm:mx-auto md:w-[50%] md:mx-auto lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
                <Input
                    control={control}
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="example@gmail.com"
                    type="email"
                />
                <Input
                    control={control}
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    type="password"
                />
                <div
                    className={`min-h-[1.25rem] text-sm text-red-700 transition-opacity duration-200 ease-in-out ${
                        errors ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                <div className="flex justify-center">
                    <Button text="Iniciar sesión" type="submit" />
                </div>
                <RegisterLink />
            </form>
        </div>
    );
};

export default LoginForm;
