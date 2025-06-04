import { useEffect, useState } from 'react';
import { useAnimation } from '../../hooks/useAnimtation';
import { DecisionData, Evaluation } from '../../types/decision.types';
import axios from 'axios';

const QuickStatsCard = () => {
    const [data, setData] = useState<DecisionData[] | []>([]);
    const [evaluations, setEvaluation] = useState<Evaluation[] | []>([]);

    const [numberOfDecisions, setNumberOfDecisions] = useState<number>(0);
    const [pendingDecisions, setPendingDecisions] = useState<DecisionData[]>([]);

    const [goodDecisions, setGoodDecisions] = useState<number>(0);
    const [badDecisions, setBadDecisions] = useState<number>(0);

    const [targetGood, setTargetGood] = useState<number>(0);
    const [targetBad, setTargetBad] = useState<number>(0);

    // Animación de los porcentajes
    useAnimation(targetGood, setGoodDecisions);
    useAnimation(targetBad, setBadDecisions);

    console.log(targetBad, targetGood);
    console.log(data);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/decision', { withCredentials: true })
            .then((response) => {
                const decisions = response.data.decisions;
                setData(decisions);
                setNumberOfDecisions(decisions.length);
                const pending = decisions.filter((d: DecisionData) => d.status === 'progress');
                setPendingDecisions(pending);
            })
            .catch(console.log);
    }, []);
    console.log('Evaluations: ', evaluations);
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/evaluation', { withCredentials: true })
            .then((response) => {
                setEvaluation(response.data.data);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        console.log('Evaluations changed: ', evaluations);
        if (evaluations && evaluations.length === 0) {
            setTargetGood(0);
            setTargetBad(0);
            return;
        }

        const good = evaluations?.filter((evalItem) => Number(evalItem.score) >= 6);
        const bad = evaluations?.filter((evalItem) => Number(evalItem.score) < 6);

        const goodPct = Math.round((good.length / evaluations.length) * 100);
        const badPct = Math.round((bad.length / evaluations.length) * 100);

        setTargetGood(goodPct);
        setTargetBad(badPct);
    }, [evaluations]);

    return (
        <div className="rounded-lg bg-white border p-4 sm:p-8 border-gray-300 shadow-md inline-flex flex-col gap-1 sm:w-full md:col-span-2 xl:col-span-1 lg:px-8 xl:h-full">
            <div className="flex flex-col gap-2 border-b-amber-100">
                <h1 className="text-2xl font-semibold sm:text-3xl">Estadísticas rápidas</h1>
                <p className="text-gray-500">Tus últimas decisiones evaluadas / creadas</p>

                <div className="grid grid-cols-2 grid-rows-[1fr 1fr] gap-4 mt-4 font-medium">
                    <div className="flex flex-col justify-between text-center gap-4 border border-gray-300 shadow-md rounded-lg py-6 px-2">
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
