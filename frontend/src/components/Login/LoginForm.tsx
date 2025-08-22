import { useState, useEffect } from 'react';
import { FormLoginValues, loginFormSchema } from '../../schemas/login.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../utils/api';
import Button from '../Button';
import Input from '../Input';
import { useNavigate } from 'react-router-dom';
import ModalNavBar from '../../modal/ModalNavBar';
import RegisterLink from './RegisterLink';

const LOCK_DURATION = 10 * 60 * 1000; // 10 minutos
const MAX_FAILED_ATTEMPTS = 5;

const LoginForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockTime, setLockTime] = useState<number | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    console.log(failedAttempts);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormLoginValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onBlur',
    });

    // Verificar si está bloqueado al montar y actualizar estado
    useEffect(() => {
        if (lockTime) {
            const now = Date.now();
            if (now - lockTime < LOCK_DURATION) {
                setIsLocked(true);
                setMessage('Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.');
            } else {
                setIsLocked(false);
                setFailedAttempts(0);
                setLockTime(null);
                setMessage('');
            }
        }
    }, [lockTime]);

    const onSubmit: SubmitHandler<FormLoginValues> = async (data) => {
        if (isLocked) {
            setMessage('Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.');
            return;
        }

        try {
            await api.post('/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setFailedAttempts(0);
            setLockTime(null);
            setMessage('');
            navigate('/dashboard/overview');
        } catch (error: any) {
            setFailedAttempts((prev) => {
                const next = prev + 1;
                if (next >= MAX_FAILED_ATTEMPTS) {
                    setLockTime(Date.now());
                    setIsLocked(true);
                    setMessage(
                        'Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.'
                    );
                } else {
                    setMessage(error.response?.data?.message || 'Credenciales incorrectas');
                }
                return next;
            });
        }
    };

    return (
        <div className="h-screen flex flex-col items-center w-full">
            <ModalNavBar />
            <div className="hidden sm:flex justify-center items-center ">
                <img src="/logo.svg" alt="logo" className="h-[200px]" />
            </div>
            <h1 className="font-semibold sm:hidden text-2xl mt-4 mb-2 text-left flex w-full px-4">
                Inicia sesión
            </h1>
            <p className="w-full text-left sm:hidden px-4 mb-4 text-gray-600">
                Si ya tienes cuenta inicia sesión
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full sm:border sm:border-gray-300 bg-white sm:shadow-2xl text-[15px] rounded-lg p-4 sm:w-[50%] sm:mx-auto md:w-[50%] md:mx-auto lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
                <Input<FormLoginValues>
                    control={control}
                    label="Correo electrónico"
                    name="email"
                    error={errors.email}
                    placeholder="example@gmail.com"
                    type="email"
                    disabled={isLocked}
                />
                <Input<FormLoginValues>
                    control={control}
                    label="Contraseña"
                    name="password"
                    error={errors.password}
                    type="password"
                    disabled={isLocked}
                />
                {message && (
                    <p
                        className={`min-h-[1.25rem] text-sm ${
                            isLocked ? 'text-red-700' : 'text-orange-700'
                        } transition-opacity duration-200 ease-in-out`}>
                        {message}
                    </p>
                )}
                <div className="flex justify-center">
                    <Button text="Iniciar sesión" type="submit" isDisabled={isLocked} />
                </div>
                <RegisterLink />
            </form>
        </div>
    );
};

export default LoginForm;
