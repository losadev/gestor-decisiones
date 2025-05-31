import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { ProCon } from '../../types/proCon.types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DecisionCategoryType, DecisionData } from '../../types/decision.types';
import { ImCross } from 'react-icons/im';
import { RxCross1 } from 'react-icons/rx';

type FormData = {
    title: string;
    category: string;
    prosCons: ProCon[];
};

type Props = {
    isOpen?: boolean;
    onClose: () => void;
    decisionId?: string;
    onMessage: (msg: string, success?: boolean) => void;
};

const DecisionForm = ({ isOpen, onClose, decisionId, onMessage }: Props) => {
    const [loading, setLoading] = useState(false);
    const [decision, setDecision] = useState<DecisionData | null>(null);
    const [prosCons, setProsCons] = useState<ProCon[]>([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            title: decision ? decision.title : '', // Si hay una decisión, se usa su título, si no, se deja vacío
            category: decision ? decision.category : 'Trabajo',
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

    let categoryDecision = [];
    for (const category of Object.values(DecisionCategoryType)) {
        categoryDecision.push(category);
    }

    useEffect(() => {
        if (decision) {
            reset({
                title: decision.title,
                category: decision.category,
                prosCons: prosCons.length
                    ? prosCons
                    : [
                          {
                              description: '',
                              type: 'Pro',
                              weight: 1,
                          },
                      ],
            });
        }
    }, [decision, prosCons, reset]);

    useEffect(() => {
        if (!decisionId) return;

        // Carga la decisión
        axios
            .get(`http://localhost:5000/api/decision/${decisionId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setDecision(response.data.decision);
            })
            .catch((error) => {
                console.error('Error fetching decision:', error);
            });

        // Carga los pros y contras
        axios
            .get(`http://localhost:5000/api/proscons/${decisionId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setProsCons(response.data.prosCons);
            })
            .catch((error) => {
                console.error('Error fetching pros and cons:', error);
            });
    }, [decisionId]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            let res;

            if (decisionId) {
                // editando una decisión existente
                res = await axios.put(`http://localhost:5000/api/decision/${decisionId}`, data, {
                    withCredentials: true,
                });
            } else {
                // creando una nueva
                res = await axios.post('http://localhost:5000/api/decision', data, {
                    withCredentials: true,
                });
            }
            onMessage(res.data.message, true);
            if (!decisionId) {
                reset({
                    title: '',
                    category: 'Trabajo',
                    prosCons: [{ description: '', type: 'Pro', weight: 1 }],
                });
                setProsCons([{ description: '', type: 'Pro', weight: 1 }]);
            }
        } catch (error: any) {
            onMessage('Error al guardar la decisión', false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`${isOpen ? 'block' : 'hidden'} fixed top-0 left-0 z-1000 bg-black/10 w-full h-screen flex justify-center items-center`}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" sm:h-[80%] w-full h-full shadow-2xl text-[15px] md:rounded-lg sm:w-[80%] sm:mx-auto md:w-[70%] md:mx-auto lg:w-[60%] xl:w-[50%] 2xl:w-[50%] flex flex-col gap-4 ">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-black/50 py-3 hidden px-4 rounded-lg relative transition duration-200 sm:inline-flex hover:bg-black/40 cursor-pointer self-start">
                    <ImCross size={16} color="white" />
                </button>
                <div className="border border-gray-300 bg-white shadow-2xl overflow-y-scroll scroll-custom h-full text-[15px] md:rounded-lg  flex flex-col py-10 px-8 gap-4 2xl:px-32">
                    <button
                        type="button"
                        onClick={onClose}
                        className=" py-3 absolute px-4 sm:hidden rounded-lg top-2 right-4 transition duration-200  hover:bg-black/10 cursor-pointer self-start">
                        <RxCross1 size={24} color="black" />
                    </button>
                    <h1 className="mx-auto text-4xl mb-4 font-semibold">Decisión</h1>
                    <Controller
                        name="title"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <label className="font-bold text-xl">Título</label>
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
                                <label className="font-bold text-xl">Categoría</label>
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
                    <ul className="flex flex-col mt-16">
                        <h1 className="mx-auto text-4xl font-semibold mb-8">Pros / Contras</h1>
                        {fields.map((field, index) => (
                            <li key={field.id}>
                                <div className="flex flex-col gap-4">
                                    <Controller
                                        name={`prosCons.${index}.description`}
                                        render={({ field }) => (
                                            <div className="flex flex-col gap-2">
                                                <label className="font-bold text-xl">
                                                    Descripción
                                                </label>
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
                                                <label className="font-bold text-xl">Tipo</label>
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
                                                <label className="font-bold text-xl">
                                                    Importancia
                                                </label>
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
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 mx-auto border p-2 rounded border-red-300 hover:bg-red-500 hover:text-white cursor-pointer duration-200 hover:duration-200 hover:scale-125 ">
                                            <FaTrash size={20} />
                                        </button>
                                    )}
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
                        {loading
                            ? 'Guardando...'
                            : decisionId
                              ? 'Actualizar decisión'
                              : 'Crear decisión'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DecisionForm;
