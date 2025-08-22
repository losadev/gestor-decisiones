import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/Input';
import InputFile from '../../components/Register/InputFile';
import Button from '../../components/Button';
import api from '../../utils/api';
import { useState } from 'react';
import type { User } from '../../types/user.types';
import { useSnackbarStore } from '../../store/snackbarStore';

const editProfileSchema = z.object({
    name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    lastName: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
    email: z.string().email({ message: 'El correo electrónico no es válido' }),
    birthDate: z.string(),
    avatar: z.any().optional(),
});

type EditProfileValues = z.infer<typeof editProfileSchema>;

type Props = {
    user: User;
};

const EditProfileForm = ({ user }: Props) => {
    const [message, setMessage] = useState('');
    const [showCurrentPassModal, setShowCurrentPassModal] = useState(false);
    const [showNewPassModal, setShowNewPassModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockTime, setLockTime] = useState<number | null>(null);
    const { showSnackbar } = useSnackbarStore();

    const LOCK_DURATION = 10 * 60 * 1000;

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
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
            const res = await api.put(`/users/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            showSnackbar(res.data.message || 'Perfil actualizado');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error al actualizar';
            showSnackbar(msg);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await api.put(`/users/${user.id}/password`, { currentPassword, newPassword });
            const msg = 'Contraseña actualizada';
            showSnackbar(msg);
            setMessage('');
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error al actualizar la contraseña';
            showSnackbar(msg);
        } finally {
            setShowCurrentPassModal(false);
            setShowNewPassModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const verifyCurrentPassword = async () => {
        // Si está bloqueado y no ha pasado el tiempo, mostrar mensaje y salir
        if (lockTime) {
            const now = Date.now();
            if (now - lockTime < LOCK_DURATION) {
                setMessage('Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.');
                return;
            } else {
                // Ya pasó el bloqueo, resetear todo
                setFailedAttempts(0);
                setLockTime(null);
                setMessage('');
            }
        }

        if (failedAttempts >= 5) {
            // Aquí por si quedó algún estado raro, bloquear y guardar tiempo
            setLockTime(Date.now());
            setMessage('Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.');
            return;
        }

        try {
            await api.post(`/users/${user.id}/password/verify`, { password: currentPassword });
            setShowCurrentPassModal(false);
            setShowNewPassModal(true);
            setMessage('');
            setFailedAttempts(0);
            setLockTime(null);
        } catch (err: any) {
            setFailedAttempts((prev) => {
                const next = prev + 1;
                if (next >= 5) {
                    setLockTime(Date.now());
                    setMessage(
                        'Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.'
                    );
                } else {
                    setMessage(err.response?.data?.message || 'Contraseña incorrecta');
                }
                return next;
            });
        }
    };

    const isLocked = lockTime !== null && Date.now() - lockTime < LOCK_DURATION;

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4 sm:border sm:border-gray-300 rounded-lg sm:w-[70%] md:w-[50%] lg:w-[40%]">
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
                <Button type="submit" text="Guardar cambios" isDisabled={!isDirty} />

                <button
                    type="button"
                    onClick={() => setShowCurrentPassModal(true)}
                    className="text-orange-600 hover:text-orange-700 cursor-pointer underline text-sm mt-2">
                    Cambiar contraseña
                </button>
            </form>

            {/* modal que pide contrase actuall */}
            {showCurrentPassModal && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Confirma tu contraseña</h2>
                        <input
                            type="password"
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="border p-2 w-full mb-4 rounded-lg"
                            disabled={isLocked}
                        />
                        {message && <p className="text-red-600 text-sm my-2">{message}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowCurrentPassModal(false);
                                    setCurrentPassword('');
                                    setMessage('');
                                    setFailedAttempts(0);
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100">
                                Cancelar
                            </button>
                            <button
                                onClick={verifyCurrentPassword}
                                disabled={failedAttempts >= 5}
                                className={`px-4 py-2 rounded cursor-pointer ${
                                    failedAttempts >= 5
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-orange-600 text-white hover:bg-orange-400'
                                }`}>
                                Continuar
                            </button>
                        </div>
                        {failedAttempts >= 5 && (
                            <p className="text-red-600 mt-2 text-center text-sm">
                                Has alcanzado el límite de intentos. Por favor, inténtalo más tarde.
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* modal para nueva contraseña */}
            {showNewPassModal && (
                <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Nueva contraseña</h2>
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 w-full mb-4 rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border p-2 w-full mb-4 rounded-lg"
                        />
                        {message && <p className="text-red-600 text-sm my-2">{message}</p>}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowNewPassModal(false);
                                    setNewPassword('');
                                    setConfirmPassword('');
                                    setMessage('');
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100">
                                Cancelar
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500">
                                Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfileForm;
