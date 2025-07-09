import { ReactNode, useEffect, useState, useMemo } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineTrendingUp } from 'react-icons/hi';
import { MdOutlineWatchLater } from 'react-icons/md';
import Filters from './Filters';
import AnalyticsResumeCard from '../../components/Dashboard/AnalyticsResumeCard';
import TinyBarChart from './TinyBarChart';
import LineChartDecisionStats from './LineChartDecisionStats';
import { LuCircleAlert, LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import axios from 'axios';
import { DecisionData } from '../../types/decision.types';
import { Evaluation } from '../../types/evaluation.types';

interface Props {
    title: string;
    content: string;
    icon: ReactNode;
    description: string;
    className?: string;
}

const AnalyticsCard = ({ title, content, icon, description, className }: Props) => {
    return (
        <div className="border bg-white border-gray-300 rounded-lg p-8 flex flex-col gap-6  shadow-sm">
            <div className="flex w-full">
                <div className="flex flex-col gap-2 flex-1">
                    <span className="font-medium text-gray-600">{title}</span>
                    <span className={`text-[1.75rem]  font-semibold flex-1 ${className}`}>
                        {content}
                    </span>
                </div>
                <span className={`${className}`}>{icon}</span>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};

const Analytics = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [decisions, setDecisions] = useState<DecisionData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
    const [selectedTimeRange, setSelectedTimeRange] = useState('Todo');

    const filteredEvaluations = useMemo(() => {
        return evaluations.filter((evaluation) => {
            const decision = decisions.find((d) => d.id === evaluation.decisionId);
            if (!decision) return false;

            const inCategory =
                selectedCategory === 'Todas las categorías' ||
                decision.category === selectedCategory;

            const inDateRange = (() => {
                if (selectedTimeRange === 'Todo') return true;
                const days = parseInt(selectedTimeRange);
                const evaluationDate = new Date(evaluation.createdAt);
                const limitDate = new Date();
                limitDate.setDate(limitDate.getDate() - days);
                return evaluationDate >= limitDate;
            })();

            return inCategory && inDateRange;
        });
    }, [evaluations, decisions, selectedCategory, selectedTimeRange]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [evalRes, decRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/evaluation', { withCredentials: true }),
                    axios.get('http://localhost:5000/api/decision', { withCredentials: true }),
                ]);
                setEvaluations(evalRes.data.data);
                setDecisions(decRes.data.decisions);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const filteredDecisionIds = new Set(filteredEvaluations.map((e) => e.decisionId));
    const filteredDecisions = decisions.filter((d) => filteredDecisionIds.has(d.id));
    const numberOfDecisions = filteredDecisions.length;

    const pending = useMemo(() => {
        return filteredDecisions.filter((d) => d.status === 'progress');
    }, [filteredDecisions]);

    const averageDecisionTime = useMemo(() => {
        if (filteredEvaluations.length === 0 || decisions.length === 0) return 0;

        const timeDiffs = filteredEvaluations
            .map((evaluation) => {
                const decision = decisions.find(
                    (d) => String(d.id) === String(evaluation.decisionId)
                );
                if (!decision) return null;

                const createdDecision = new Date(decision.createdAt);
                const createdEvaluation = new Date(evaluation.createdAt);

                if (isNaN(createdDecision.getTime()) || isNaN(createdEvaluation.getTime()))
                    return null;

                const diffInDays =
                    (createdEvaluation.getTime() - createdDecision.getTime()) /
                    (1000 * 60 * 60 * 24);

                return diffInDays >= 0 ? diffInDays : null;
            })
            .filter((d): d is number => d !== null);

        if (timeDiffs.length === 0) return 0;

        const sum = timeDiffs.reduce((acc, curr) => acc + curr, 0);
        return sum / timeDiffs.length;
    }, [evaluations, decisions]);

    const improvementLinear = useMemo(() => {
        if (filteredEvaluations.length === 0) return 0;

        // Fecha límite hace 6 meses
        const limitDate = new Date();

        limitDate.setMonth(limitDate.getMonth() - 3);

        // Filtrar evaluaciones solo de los últimos 6 meses
        const recentEvaluations = filteredEvaluations.filter((evaluation) => {
            const evalDate = new Date(evaluation.createdAt);
            return evalDate >= limitDate;
        });

        if (recentEvaluations.length === 0) return 0;

        // Agrupar evaluaciones por mes (solo recientes)
        const evaluationsByMonth: Record<string, Evaluation[]> = recentEvaluations.reduce(
            (acc, evaluation) => {
                const month = new Date(evaluation.createdAt).toISOString().slice(0, 7);
                if (!acc[month]) acc[month] = [];
                acc[month].push(evaluation);
                return acc;
            },
            {} as Record<string, Evaluation[]>
        );

        const successRateByMonth = Object.entries(evaluationsByMonth).map(
            ([month, evals], index) => {
                const total = evals.length;
                const successes = evals.filter((e) => e.score > 6).length;
                return {
                    month,
                    rate: total > 0 ? successes / total : 0,
                    index,
                };
            }
        );

        if (successRateByMonth.length < 2) {
            return 0;
        }

        const n = successRateByMonth.length;
        const sumX = successRateByMonth.reduce((acc, cur) => acc + cur.index, 0);
        const sumY = successRateByMonth.reduce((acc, cur) => acc + cur.rate, 0);
        const sumXY = successRateByMonth.reduce((acc, cur) => acc + cur.index * cur.rate, 0);
        const sumX2 = successRateByMonth.reduce((acc, cur) => acc + cur.index * cur.index, 0);

        const numerator = n * sumXY - sumX * sumY;
        const denominator = n * sumX2 - sumX * sumX;

        if (denominator === 0) return 0;

        const slope = numerator / denominator;
        const improvementPercent = slope * 100;

        return improvementPercent;
    }, [evaluations]);

    let improvementClass = 'text-gray-600';
    if (improvementLinear > 0) improvementClass = 'text-green-600';
    else if (improvementLinear < 0) improvementClass = 'text-red-600';

    const improvementIcon =
        improvementLinear > 0 ? (
            <LuTrendingUp className="p-2 rounded-full" />
        ) : improvementLinear < 0 ? (
            <LuTrendingDown className="p-2 rounded-full" />
        ) : (
            <LuCircleAlert className="p-2 rounded-full" />
        );

    const successfulEvaluations = useMemo(
        () => filteredEvaluations.filter((e) => e.score > 6).length,
        [filteredEvaluations]
    );
    const totalEvaluations = filteredEvaluations.length;

    const successRate = totalEvaluations > 0 ? (successfulEvaluations / totalEvaluations) * 100 : 0;

    return (
        <div className="w-full h-full">
            <header className="flex flex-col pt-4 pb-2 gap-2 sm:flex md:flex">
                <h1 className="text-2xl font-bold  sm:text-3xl">Análisis de las evaluaciones</h1>
                <p className="text-gray-600 font-medium mt-2">
                    Obtén información sobre tus patrones y resultados en la toma de decisiones
                </p>
            </header>

            <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
            />

            <div className="flex flex-col my-4 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                    content={String(numberOfDecisions)}
                    description={`${totalEvaluations} evaluadas • ${pending.length} pendientes`}
                    icon={<IoMdCheckmarkCircleOutline className="bg-gray-200 rounded-full p-2 " />}
                    title="Decisiones totales"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content={`${successRate.toFixed(0)}%`}
                    description={`Basado en ${totalEvaluations} decisiones evaluadas`}
                    icon={
                        <HiOutlineTrendingUp className="bg-green-400 rounded-full text-green-200 p-2 " />
                    }
                    title="Ratio de éxito"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content={`${averageDecisionTime.toFixed(1)} días`}
                    description="Tiempo medio desde la consideración hasta la decisión"
                    icon={
                        <MdOutlineWatchLater className="bg-green-200 rounded-full text-green-400 p-2" />
                    }
                    title="Tiempo medio para decidir"
                    className="text-5xl"
                />

                <AnalyticsCard
                    content={`${improvementLinear.toFixed(0)}%`}
                    description="Mejora en los resultados de las decisiones en los últimos 3 meses"
                    icon={improvementIcon}
                    title="Mejora"
                    className={`text-5xl ${improvementClass}`}
                />
            </div>

            <section className="grid lg:grid-cols-2 gap-4 pb-4">
                <TinyBarChart decisions={decisions} evaluations={filteredEvaluations} />
                <AnalyticsResumeCard evaluations={filteredEvaluations} />
                <LineChartDecisionStats evaluations={filteredEvaluations} />
            </section>
        </div>
    );
};

export default Analytics;
