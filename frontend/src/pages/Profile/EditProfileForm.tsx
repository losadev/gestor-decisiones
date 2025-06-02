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

    const {
        control,
        handleSubmit,
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

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/api/users/${user.id}/password`,
                { currentPassword, newPassword },
                { withCredentials: true }
            );
            setMessage('Contraseña actualizada');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Error al actualizar la contraseña');
        } finally {
            setShowCurrentPassModal(false);
            setShowNewPassModal(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const verifyCurrentPassword = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/users/${user.id}/password/verify`,
                { password: currentPassword },
                { withCredentials: true }
            );

            setShowCurrentPassModal(false);
            setShowNewPassModal(true);
            setMessage('');
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Contraseña incorrecta');
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 max-w-xl mx-auto my-auto border border-gray-300 shadow-sm p-8 rounded-lg w-[70%]">
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
                <Button type="submit" text="Guardar cambios" />
                <button
                    type="button"
                    onClick={() => setShowCurrentPassModal(true)}
                    className="text-orange-600 hover:text-orange-700 cursor-pointer underline text-sm mt-2">
                    Cambiar contraseña
                </button>
                {message && <p className="text-center text-sm">{message}</p>}
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
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowCurrentPassModal(false);
                                    setCurrentPassword('');
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100">
                                Cancelar
                            </button>
                            <button
                                onClick={verifyCurrentPassword}
                                className="px-4 py-2 bg-orange-600 cursor-pointer text-white rounded hover:bg-orange-400">
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* modal para nuevaa contraseña */}
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
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowNewPassModal(false);
                                    setNewPassword('');
                                    setConfirmPassword('');
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
