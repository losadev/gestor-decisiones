import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Chip } from './Chip';
import { Decision, DecisionData } from '../../types/decision.types';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const recentDecisions = [
    {
        id: '1',
        title: 'Cambiar de trabajo',
        category: 'Carrera',
        status: 'evaluated',
    },
    {
        id: '2',
        title: 'Mudarse a otra ciudad',
        category: 'Vida personal',
        status: 'progress',
    },
    {
        id: '3',
        title: 'Comprar un coche eléctrico',
        category: 'Finanzas',
        status: 'evaluated',
    },
    {
        id: '4',
        title: 'Empezar un máster',
        category: 'Educación',
        status: 'progress',
    },
    {
        id: '5',
        title: 'Invertir en bolsa',
        category: 'Finanzas',
        status: 'evaluated',
    },
];

const RecentActivity = () => {
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get<Decision[]>('http://localhost:5000/api/decision', {
                withCredentials: true,
            })
            .then((response) => {
                setDecisions(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, []);
    const recentDecisions =
        decisions?.slice(0, 5).map((decision) => {
            return {
                id: decision.id,
                title: decision.title,
                category: decision.category,
                status: decision.evaluation ? 'evaluated' : 'progress',
            };
        }) || [];
    return (
        <div className="rounded-lg bg-white shadow-md py-8 px-4 inline-flex flex-col gap-1 flex-1 grow h-full lg:px-8">
            <h1 className="text-3xl font-semibold">Actividad reciente</h1>
            <p className="text-gray-500">Tus últimas decisiones evaluadas / creadas</p>
            <div>
                {recentDecisions ? (
                    recentDecisions.map((decision) => (
                        <div
                            key={decision.id}
                            className="flex flex-col gap-2 py-4 px-1 border-b border-b-gray-300">
                            <div className="flex gap-2 items-center">
                                <div className="grow gap-2">
                                    <h3 className="font-semibold text-lg">{decision.title}</h3>
                                    <div className="flex gap-2 mt-2">
                                        <Chip category={decision.category} mode="category" />
                                        <Chip mode={decision.status} />
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`decisions/${decision.id}`)}
                                    className="p-2 hover:bg-gray-100 rounded hover:cursor-pointer">
                                    <FaArrowRight className="text-gray-500 text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col gap-2 py-4 px-1 border-b border-b-gray-300">
                        <p className="text-gray-500">No hay decisiones recientes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
