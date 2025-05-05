import { useState } from 'react';
import { FormLoginValues, loginFormSchema } from '../../schemas/login.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Button from '../Button';
import Input from '../Input';
import { useNavigate } from 'react-router';

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

            navigate('/dashboard');
            setMessage(response.data.message);
        } catch (error: any) {
            setMessage(error.response.data.message);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border border-gray-300 shadow-2xl text-[15px] rounded-lg p-4 sm:w-[50%] sm:mx-auto md:w-[50%] md:mx-auto lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
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
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
