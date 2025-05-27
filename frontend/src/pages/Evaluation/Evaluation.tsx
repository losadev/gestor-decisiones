import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProCon } from '../../types/proCon.types';
import { DecisionData } from '../../types/decision.types';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    greenBar: number;
    redBar: number;
    neutralBar: number;
    notes: string;
};

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

    const {
        control,
        handleSubmit,
        //formState: { errors },
        reset,
    } = useForm<FormData>({
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
            axios.patch(
                `http://localhost:5000/api/decision/${decision.id}`,
                {
                    status: 'evaluated',
                },
                {
                    withCredentials: true,
                }
            );
            setMessage(response.data.message);
            reset();
            setGreenBar(0);
            setRedBar(0);
            setNeutralBar(0);
            setTotalPercentage(0);

            navigate(`/dashboard/decisions/${decision.id}`);
        } catch (error) {
            setMessage('Error al crear evaluación');
        }
    };

    return (
        <main className="p-4 w-full h-full flex flex-col gap-6 overflow-y-auto scroll-custom">
            <h1 className="text-2xl sm:text-3xl font-semibold">
                Evalúa la decisión: {decision?.title}
                {message}
            </h1>

            <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 sm:p-6 flex flex-col gap-6">
                <div className="space-y-4 flex flex-col flex-1">
                    <h2 className="text-2xl font-semibold text-center">Resumen de la decisión</h2>
                    <div className="inline-flex flex-col 2xl:w-[50%] mx-auto gap-4">
                        <div className="border border-gray-300 rounded p-4 shadow-md sm:p-6 flex flex-col gap-4 flex-1 hover:shadow-xl transition hover:scale-105 bg-white">
                            <ul className="text-base sm:text-lg space-y-2">
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
                        <div className="border border-gray-300 rounded p-4 sm:p-6 shadow-md hover:shadow-xl transition hover:scale-105 bg-white flex flex-col gap-4 flex-1 items-center">
                            <h3 className="text-lg font-semibold">Pros y Contras</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {prosCons?.map((item) => (
                                    <li key={item.id} className="flex items-center gap-2">
                                        <span
                                            className={
                                                item.type === 'Pro'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }>
                                            {item.type === 'Pro' ? '✔️' : '❌'}
                                        </span>
                                        {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                                                background: `linear-gradient(to right, green ${greenBar}%, #ccc ${greenBar}%)
                                            `,
                                            }}
                                        />
                                    </>
                                )}
                            />

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
                                                background: `linear-gradient(to right, red ${redBar}%, #ccc ${redBar}%)
                                            `,
                                            }}
                                        />
                                    </>
                                )}
                            />

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
                                                background: `linear-gradient(to right, yellow ${neutralBar}%, #ccc ${neutralBar}%)
                                            `,
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
