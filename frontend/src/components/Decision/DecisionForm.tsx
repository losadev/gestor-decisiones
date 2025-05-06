import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { ProCon } from '../../types/proCon.types';
import axios from 'axios';
import { useState } from 'react';
import { DecisionCategoryType } from '../../types/decision.types';
import { ImCross } from 'react-icons/im';

type FormData = {
    title: string;
    category: string;
    prosCons: ProCon[];
};

type Props = {
    isOpen?: boolean;
    onClose: () => void;
};

const DecisionForm = ({ isOpen, onClose }: Props) => {
    const [message, setMessage] = useState<string>('');
    let categoryDecision = [];
    for (const category of Object.values(DecisionCategoryType)) {
        categoryDecision.push(category);
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: '',
            category: 'Trabajo', // valor por defecto
            prosCons: [
                {
                    description: '',
                    type: 'Pro', // valor por defecto
                    weight: 1, // mínimo permitido
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'prosCons',
    });

    const onSubmit = async (data: FormData) => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post('http://localhost:5000/api/decision', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage(res.data.message);
        } catch (error: any) {
            console.log(data);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div
            className={`${isOpen ? 'block' : 'hidden'} absolute z-1000 bg-black/30 w-full h-full flex justify-center items-center p-16`}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" h-[70%] shadow-2xl text-[15px] rounded-lg sm:w-[50%] sm:mx-auto md:w-[50%] md:mx-auto lg:w-[40%] xl:w-[30%] 2xl:w-[50%] flex flex-col gap-4">
                <button
                    onClick={onClose}
                    className="bg-black/50 py-3 px-4 rounded-lg transition duration-200 inline-flex hover:bg-black/40 cursor-pointer self-start">
                    <ImCross size={16} color="white" />
                </button>
                <div className="border border-gray-300 bg-white shadow-2xl overflow-y-scroll h-full text-[15px] rounded-lg  flex flex-col py-10 px-8 gap-4">
                    <h1 className="mx-auto text-4xl mb-4 font-semibold">Decisión</h1>
                    <Controller
                        name="title"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Título</label>
                                <input
                                    type="text"
                                    placeholder="Ej. Comprar coche eléctrico"
                                    {...field}
                                    className="border border-gray-300 rounded px-3 py-2"
                                    value={field.value ?? ''}
                                />
                            </div>
                        )}
                        control={control}
                    />

                    <Controller
                        name="category"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Categoría</label>
                                <select
                                    {...field}
                                    className="border h-[40px] border-gray-300 rounded">
                                    {categoryDecision.map((category) => (
                                        <option value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        control={control}
                    />

                    <ul className="flex flex-col mt-4">
                        <h1 className="mx-auto text-4xl font-semibold">Pros / Contras</h1>

                        {fields.map((field, index) => (
                            <li key={field.id}>
                                <div className="flex flex-col gap-4">
                                    <Controller
                                        name={`prosCons.${index}.description`}
                                        render={({ field }) => (
                                            <div className="flex flex-col gap-2">
                                                <label className="font-medium">Descripción</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ej. Menor consumo de gasolina"
                                                    {...field}
                                                    className="border border-gray-300 rounded px-3 py-2"
                                                    value={field.value ?? ''}
                                                />
                                            </div>
                                        )}
                                        control={control}
                                    />
                                    <Controller
                                        name={`prosCons.${index}.type`}
                                        render={({ field }) => (
                                            <div className="flex flex-col gap-2">
                                                <label className="font-medium">Tipo</label>
                                                <select
                                                    {...field}
                                                    className="border h-[40px] rounded border-gray-300">
                                                    <option value="Pro">Pro</option>
                                                    <option value="Contra">Contra</option>
                                                </select>
                                            </div>
                                        )}
                                        control={control}
                                    />
                                    <Controller
                                        name={`prosCons.${index}.weight`}
                                        render={({ field }) => (
                                            <div className="flex flex-col gap-2">
                                                <label className="font-medium">Importancia</label>
                                                <input
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                    type="number"
                                                    {...field}
                                                    className="border border-gray-300 rounded px-3 py-2"
                                                    value={field.value ?? 1}
                                                />
                                            </div>
                                        )}
                                        control={control}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 mx-auto border p-2 rounded border-red-300 hover:bg-red-500 hover:text-white cursor-pointer duration-200 hover:duration-200 hover:scale-125 ">
                                        <FaTrash size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="bg-orange-500 hover:bg-orange-400 active:bg-amber-600 text-white rounded-lg flex grow justify-center py-2 mt-4 font-semibold cursor-pointer duration-100 hover:duration-100 px-2"
                        type="button"
                        onClick={() => append({ description: '', type: 'Pro', weight: 1 })}>
                        Añadir más pro/contra +
                    </button>

                    <button
                        className="bg-black/90 hover:bg-black/80 active:bg-amber-600 text-white rounded-lg flex grow justify-center py-2 mt-4 font-semibold cursor-pointer duration-100 hover:duration-100 px-2"
                        type="submit">
                        Crear decisión
                    </button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default DecisionForm;
