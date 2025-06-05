import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Chip from '../../components/Dashboard/Chip';
import { DecisionData } from '../../types/decision.types';
import { useEffect, useState } from 'react';
import axios from 'axios';

const RecentActivity = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [decisions, setDecisions] = useState<DecisionData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/decision', {
                withCredentials: true,
            })
            .then((response) => {
                setDecisions(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, [refreshTrigger]);

    const recentDecisions =
        decisions
            ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 4)
            .map((decision) => ({
                id: decision.id,
                title: decision.title,
                category: decision.category,
                status: decision.status,
            })) || [];

    return (
        <div className="rounded-lg border border-gray-300 h-full min-h-[300px] bg-white shadow-md p-4 sm:p-8 inline-flex flex-col gap-1 md:h-full md:flex-1 lg:px-8">
            <h1 className="text-2xl sm:text-3xl font-semibold">Actividad reciente</h1>
            <p className="text-gray-500">Tus últimas decisiones creadas</p>
            <div className=" flex flex-col flex-1">
                {recentDecisions.length > 0 ? (
                    recentDecisions.map((decision) => (
                        <div
                            key={decision.id}
                            className="inline-flex flex-col gap-2 mt-8 py-4 px-1 border-b  border-b-gray-300">
                            <div className="flex gap-2 items-center">
                                <div className="grow gap-2">
                                    <h3 className="font-semibold text-lg">{decision.title}</h3>
                                    <div className="flex gap-2 mt-2">
                                        <Chip category={decision.category} mode="category" />
                                        <Chip mode={decision.status} />
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/dashboard/decisions/${decision.id}`)}
                                    className="p-2 hover:bg-gray-100 rounded hover:cursor-pointer">
                                    <FaArrowRight className="text-gray-500 text-xl" />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col gap-2 py-4 px-1 m-auto">
                        <p className="text-gray-400 text-lg">Aún no hay decisiones.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
