import { ReactNode, useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineTrendingUp } from 'react-icons/hi';
import { MdOutlineWatchLater } from 'react-icons/md';
import Filters from './Filters';
import AnalyticsResumeCard from '../../components/Dashboard/AnalyticsResumeCard';
import TinyBarChart from './TinyBarChart';
import LineChartDecisionStats from './LineChartDecisionStats';
import { LuCircleAlert } from 'react-icons/lu';
import axios from 'axios';
import { DecisionData, Evaluation } from '../../types/decision.types';

interface Props {
    title: string;
    content: string;
    icon: ReactNode;
    description: string;
    className?: string;
}

const AnalyticsCard = ({ title, content, icon, description, className }: Props) => {
    return (
        <div className="border bg-white border-gray-300 rounded-lg p-8 flex flex-col gap-6 grow">
            <div className="flex w-full">
                <div className="flex flex-col gap-2 flex-1">
                    <span className="font-medium text-gray-600">{title}</span>
                    <span className={`text-4xl font-semibold lg:text-3xl flex-1 ${className}`}>
                        {content}
                    </span>
                </div>
                <span className={`${className}`}>{icon}</span>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const Analytics = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [decisions, setDecisions] = useState<DecisionData[]>([]);
    const [numberOfDecisions, setNumberOfDecisions] = useState<number>(0);
    const [pending, setPending] = useState<DecisionData[]>([]);
    const [improvement, setImprovement] = useState<number>(0);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/evaluation', { withCredentials: true })
            .then((response) => {
                const evals: Evaluation[] = response.data.data;
                setEvaluations(evals);

                // Agrupar por mes
                const evaluationsByMonth = evals.reduce(
                    (acc, evaluation) => {
                        const month = new Date(evaluation.createdAt).toISOString().slice(0, 7); // "YYYY-MM"
                        if (!acc[month]) acc[month] = [];
                        acc[month].push(evaluation);
                        return acc;
                    },
                    {} as Record<string, Evaluation[]>
                );

                // Calcular tasas de éxito mensuales
                const successRateByMonth = Object.entries(evaluationsByMonth).map(
                    ([month, evals]) => {
                        const total = evals.length;
                        const successes = evals.filter((e) => e.score > 6).length;
                        return {
                            month,
                            rate: total > 0 ? successes / total : 0,
                        };
                    }
                );

                // Calcular mejora
                if (successRateByMonth.length >= 2) {
                    const sorted = successRateByMonth.sort((a, b) =>
                        a.month.localeCompare(b.month)
                    );
                    const first = sorted[0].rate;
                    const last = sorted[sorted.length - 1].rate;

                    if (first > 0) {
                        const improvementPercentage = ((last - first) / first) * 100;
                        setImprovement(improvementPercentage);
                    }
                }
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/decision', { withCredentials: true })
            .then((response) => {
                const decisions = response.data.decisions;
                setDecisions(decisions);
                setNumberOfDecisions(decisions.length);
                const pending = decisions.filter((d: DecisionData) => d.status === 'progress');
                setPending(pending);
            })
            .catch(console.log);
    }, []);

    return (
        <div className="w-full p-4 pr-8 h-full">
            <header className="flex flex-col px-0 py-4 gap-2">
                <h1 className="text-3xl font-bold">Panel de Análisis de Datos</h1>
                <p className="text-gray-600 font-medium mt-2">
                    Obtén información sobre tus patrones y resultados en la toma de decisiones
                </p>
            </header>

            <div className="flex flex-col my-8 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                    content={String(numberOfDecisions)}
                    description={`${evaluations.length} evaluadas • ${pending.length} pendientes`}
                    icon={<IoMdCheckmarkCircleOutline className="bg-gray-200 rounded-full p-2" />}
                    title="Decisiones totales"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content="61%"
                    description="Basado en 4 decisiones evaluadas"
                    icon={
                        <HiOutlineTrendingUp className="bg-green-400 rounded-full text-green-200 p-2" />
                    }
                    title="Ratio de éxito"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content="5.2 días"
                    description="Tiempo medio desde la consideración hasta la decisión"
                    icon={
                        <MdOutlineWatchLater className="bg-green-200 rounded-full text-green-400 p-2" />
                    }
                    title="Tiempo medio para decidir"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content={`${improvement.toFixed(0)}%`}
                    description="Mejora en los resultados de las decisiones a lo largo del tiempo"
                    icon={<LuCircleAlert className="rounded-full text-red-600 bg-red-200 p-2" />}
                    title="Tendencia de mejora"
                />
            </div>

            <Filters />

            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 pb-4">
                <AnalyticsResumeCard />
                <TinyBarChart />
                <LineChartDecisionStats />
            </div>
        </div>
    );
};

export default Analytics;
