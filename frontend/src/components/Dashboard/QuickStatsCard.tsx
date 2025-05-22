import { useEffect, useState } from 'react';
import { useAnimation } from '../../hooks/useAnimtation';
import { DecisionData } from '../../types/decision.types';
import axios from 'axios';

const QuickStatsCard = () => {
    const [data, setData] = useState<DecisionData[] | []>([]);
    const [evaluation, setEvaluation] = useState<any[] | []>([]);
    const [goodDecisions, setGoodDecisions] = useState<number>(0);
    const [badDecisions, setBadDecisions] = useState<number>(0);
    const [numberOfDecisions, setNumberOfDecisions] = useState<number>(0);
    const [pendingDecisions, setPendingDecisions] = useState<DecisionData[] | []>([]);
    useAnimation(setGoodDecisions, 68);
    useAnimation(setBadDecisions, 32);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/decision', {
                withCredentials: true,
            })
            .then((response) => {
                const decisions = response.data.decisions;
                setData(decisions);
                setNumberOfDecisions(decisions.length); // <- Aquí se actualiza correctamente
                const pending = decisions.filter(
                    (decision: DecisionData) => decision.status === 'progress'
                );
                setPendingDecisions(pending);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/evaluation', {
                withCredentials: true,
            })
            .then((response) => {
                setEvaluation(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, []);

    const getPendingDecision = () => {
        const pending = data.filter((decision) => decision.status === 'progress');
        setPendingDecisions(pending);
    };

    useEffect(() => {
        getPendingDecision();
        setNumberOfDecisions(data.length);
    }, [data]);

    return (
        <div className="rounded-lg bg-white shadow-md py-4 px-2 inline-flex flex-col gap-1 sm:w-full md:col-span-2 xl:col-span-1 lg:px-8 xl:h-full">
            <div className="flex flex-col gap-2 p-4 border-b-amber-100">
                <h1 className="text-2xl font-semibold sm:text-3xl">Estadísticas rápidas</h1>
                <p className="text-gray-500">Tus últimas decisiones evaluadas / creadas</p>

                <div className="grid grid-cols-2 grid-rows-[1fr 1fr] gap-4 mt-4 font-medium ">
                    <div className="flex flex-col justify-between text-center gap-4 border border-gray-300 shadow-md  rounded-lg py-6 px-2">
                        <span>Total de decisiones</span>
                        <span className="text-3xl font-bold">{numberOfDecisions}</span>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border border-gray-300 text-center shadow-md rounded-lg py-6 px-2">
                        <span>Decisiones pendientes</span>
                        <span className="text-3xl font-bold">{pendingDecisions.length}</span>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border border-gray-300 shadow-md rounded-lg py-6 px-2 text-center">
                        <span>Buenas decisiones</span>
                        <span className="text-3xl font-bold text-green-700">{goodDecisions}%</span>
                    </div>
                    <div className="flex justify-between flex-col gap-4 border border-gray-300 shadow-md rounded-lg py-6 px-2 text-center">
                        <span>Malas decisiones</span>
                        <span className="text-3xl font-bold text-red-700">{badDecisions}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickStatsCard;
