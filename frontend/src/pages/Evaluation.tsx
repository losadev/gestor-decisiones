import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DecisionData } from '../types/decision.types';
import { useSnackbarStore } from '../store/snackbarStore';
import { ProCon } from '../types/proCon.types';

const schema = z
    .object({
        greenBar: z.number().min(0),
        redBar: z.number().min(0),
        neutralBar: z.number().min(0),
        notes: z.string().min(1, { message: 'Las notas son obligatorias' }),
    })
    .refine((data) => data.greenBar + data.redBar + data.neutralBar === 100, {
        message: 'La suma de los porcentajes debe ser exactamente 100%',
        path: ['neutralBar'],
    });

type FormData = z.infer<typeof schema>;

const Evaluation = () => {
    const [message, setMessage] = useState<string>('');
    const [decision, setDecision] = useState<DecisionData | null>(null);
    const [prosCons, setProsCons] = useState<ProCon[] | null>(null);
    const { id } = useParams();
    const createdAt = decision?.createdAt.split('T')[0];
    const [greenBar, setGreenBar] = useState<number>(0);
    const [redBar, setRedBar] = useState<number>(0);
    const [neutralBar, setNeutralBar] = useState<number>(0);
    const [totalPercentage, setTotalPercentage] = useState<number>(0);
    const isDisabled = totalPercentage === 100;
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbarStore();

    console.log(message);

    const {
        control,
        handleSubmit,
        reset,

        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            greenBar: 0,
            redBar: 0,
            neutralBar: 0,
            notes: '',
        },
    });

    const total = greenBar + neutralBar + redBar;
    const weighted = total === 0 ? 0 : (greenBar * 10 + neutralBar * 5 + redBar * 0) / total;
    const finalScore = Math.max(1, Math.round(weighted));

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/proscons/${id}`, { withCredentials: true })
            .then((res) => setProsCons(res.data.prosCons))
            .catch((err) => console.error('Error fetching pros and cons:', err));
    }, [id]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/decision/${id}`, { withCredentials: true })
            .then((res) => setDecision(res.data.decision))
            .catch((err) => console.error('Error fetching decision details:', err));
    }, [id]);

    const updateBar = (
        newValue: number,
        currentValues: { green: number; red: number; neutral: number },
        target: 'green' | 'red' | 'neutral'
    ) => {
        const newTotals = {
            green: target === 'green' ? newValue : currentValues.green,
            red: target === 'red' ? newValue : currentValues.red,
            neutral: target === 'neutral' ? newValue : currentValues.neutral,
        };

        const total = newTotals.green + newTotals.red + newTotals.neutral;
        if (total <= 100) {
            setGreenBar(newTotals.green);
            setRedBar(newTotals.red);
            setNeutralBar(newTotals.neutral);
            setTotalPercentage(total);

            setValue('greenBar', newTotals.green);
            setValue('redBar', newTotals.red);
            setValue('neutralBar', newTotals.neutral);
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            if (!decision?.id) return;

            const response = await axios.post(
                'http://localhost:5000/api/evaluation',
                {
                    result: data.notes,
                    score: finalScore,
                    decisionId: decision.id,
                },
                { withCredentials: true }
            );
            await axios.patch(
                `http://localhost:5000/api/decision/${decision.id}`,
                {
                    status: 'evaluated',
                },
                {
                    withCredentials: true,
                }
            );
            showSnackbar(response.data.message);
            setMessage(response.data.message);
            reset();
            setGreenBar(0);
            setRedBar(0);
            setNeutralBar(0);
            setTotalPercentage(0);

            navigate(`/dashboard/decisions/${decision.id}`);
            await axios.post(
                'http://localhost:5000/api/recommendation',
                { decisionId: decision.id },
                { withCredentials: true }
            );
        } catch (error: any) {
            showSnackbar(error);
            setMessage('Error al crear evaluación');
        }
    };

    return (
        <main className="w-full flex flex-col gap-6 scroll-custom ">
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Evalúa la decisión:{' '}
                <span className="font-medium font-mulish">{decision?.title}</span>
            </h1>

            <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 sm:p-6 flex flex-col gap-6">
                <div className=" flex flex-col gap-4 md:flex-row flex-1 items-stretch">
                    <div className="border border-gray-300 rounded p-4 min-h-[250px] shadow-md sm:p-6 flex flex-col gap-4 flex-1 hover:shadow-xl transition hover:scale-105 bg-white">
                        <h2 className="text-xl sm:text-2xl font-semibold text-center">
                            Resumen de la decisión
                        </h2>
                        <ul className="text-base sm:text-lg text-center space-y-2 mt-4">
                            <li>
                                <span className="text-gray-600">Título:</span> {decision?.title}
                            </li>
                            <li>
                                <span className="text-gray-600">Categoría:</span>{' '}
                                {decision?.category}
                            </li>
                            <li>
                                <span className="text-gray-600">Fecha de creación:</span>{' '}
                                {createdAt}
                            </li>
                            <li>
                                <span className="text-gray-600">Descripción:</span>{' '}
                                {decision?.description}
                            </li>
                        </ul>
                    </div>
                    <div className="border border-gray-300 rounded p-4 min-h-[250px] sm:p-6 shadow-md hover:shadow-xl transition hover:scale-105 bg-white flex flex-col gap-4 flex-1 items-center">
                        <h2 className="text-xl sm:text-2xl font-semibold">Pros y Contras</h2>
                        <ul className="space-y-2 mt-4">
                            {prosCons?.map((item) => (
                                <li key={item.id} className="flex items-center gap-2">
                                    <span
                                        className={
                                            item.type === 'Pro' ? 'text-green-600' : 'text-red-600'
                                        }>
                                        {item.type === 'Pro' ? '✔️' : '❌'}
                                    </span>
                                    {item.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Evaluación de Resultados</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                Ajusta los deslizadores para indicar el porcentaje de resultados
                                buenos, malos y neutros de esta decisión. El total debe sumar 100%.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/*CONTROLLER AYUDA A MANEJAR EL ESTADO AUTOMATICAMENTE*/}
                            <Controller
                                name="greenBar"
                                control={control}
                                render={() => (
                                    <>
                                        <label className="flex justify-between font-medium mb-1 text-green-700">
                                            Buenos resultados <span>{greenBar}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={greenBar}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                updateBar(
                                                    value,
                                                    {
                                                        green: greenBar,
                                                        red: redBar,
                                                        neutral: neutralBar,
                                                    },
                                                    'green'
                                                );
                                            }}
                                            className={`w-full green-bar`}
                                            style={{
                                                background: `linear-gradient(to right, green ${greenBar}%, #ccc ${greenBar}%)`,
                                            }}
                                        />
                                    </>
                                )}
                            />
                            {errors.greenBar && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.greenBar.message}
                                </p>
                            )}

                            <Controller
                                name="redBar"
                                control={control}
                                render={() => (
                                    <>
                                        <label className="flex justify-between font-medium mb-1 text-red-700">
                                            Malos resultados <span>{redBar}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={redBar}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                updateBar(
                                                    value,
                                                    {
                                                        green: greenBar,
                                                        red: redBar,
                                                        neutral: neutralBar,
                                                    },
                                                    'red'
                                                );
                                            }}
                                            className={`w-full red-bar `}
                                            style={{
                                                background: `linear-gradient(to right, red ${redBar}%, #ccc ${redBar}%)`,
                                            }}
                                        />
                                    </>
                                )}
                            />
                            {errors.redBar && (
                                <p className="text-red-600 text-sm mt-1">{errors.redBar.message}</p>
                            )}

                            <Controller
                                name="neutralBar"
                                control={control}
                                render={() => (
                                    <>
                                        <label className="flex justify-between font-medium mb-1 text-yellow-600">
                                            Resultados neutrales <span>{neutralBar}%</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={neutralBar}
                                            className={`w-full neutral-bar `}
                                            style={{
                                                background: `linear-gradient(to right, yellow ${neutralBar}%, #ccc ${neutralBar}%)`,
                                            }}
                                            disabled={isDisabled}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                updateBar(
                                                    value,
                                                    {
                                                        green: greenBar,
                                                        red: redBar,
                                                        neutral: neutralBar,
                                                    },
                                                    'neutral'
                                                );
                                            }}
                                        />
                                    </>
                                )}
                            />
                            {errors.neutralBar && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.neutralBar.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                            <>
                                <label className="block text-lg font-semibold sm:text-2xl mb-2">
                                    Notas de la evaluación
                                </label>
                                <textarea
                                    {...field}
                                    className="border w-full rounded border-gray-300 min-h-[120px] p-3 resize-y"
                                    placeholder="Describe los resultados de tu decisión y lo que aprendiste..."
                                />
                                {errors.notes && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.notes.message}
                                    </p>
                                )}
                            </>
                        )}
                    />

                    <button
                        type="submit"
                        className="mx-auto bg-black text-white py-2 px-16 hover:bg-gray-950 transition hover:cursor-pointer hover:scale-110 rounded">
                        Evaluar
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Evaluation;
