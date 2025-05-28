import { ReactNode, useEffect, useState, useMemo } from 'react';
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
        <div className="border bg-white border-gray-300 rounded-lg p-8 flex flex-col gap-6  shadow-sm">
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

const allCategories = ['Trabajo', 'Salud', 'Finanzas', 'Personal', 'Familia', 'Otros'];

const Analytics = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [decisions, setDecisions] = useState<DecisionData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
    const [selectedTimeRange, setSelectedTimeRange] = useState('Todo');

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

    const numberOfDecisions = decisions.length;
    const pending = useMemo(() => decisions.filter((d) => d.status === 'progress'), [decisions]);
    const totalEvaluations = evaluations.length;

    const successfulEvaluations = useMemo(
        () => evaluations.filter((e) => e.score > 6).length,
        [evaluations]
    );

    const successRate = totalEvaluations > 0 ? (successfulEvaluations / totalEvaluations) * 100 : 0;

    const averageDecisionTime = useMemo(() => {
        if (evaluations.length === 0 || decisions.length === 0) return 0;

        const timeDiffs = evaluations
            .map((evaluation) => {
                const decision = decisions.find((d) => d.id === evaluation.decisionId);
                if (!decision) return null;
                const createdDecision = new Date(decision.createdAt);
                const createdEvaluation = new Date(evaluation.createdAt);
                const diffInDays =
                    (createdEvaluation.getTime() - createdDecision.getTime()) /
                    (1000 * 60 * 60 * 24);
                return diffInDays >= 0 ? diffInDays : null;
            })
            .filter((d): d is number => d !== null);

        if (timeDiffs.length === 0) return 0;
        return timeDiffs.reduce((acc, curr) => acc + curr, 0) / timeDiffs.length;
    }, [evaluations, decisions]);

    const improvement = useMemo(() => {
        if (evaluations.length === 0) return 0;

        const evaluationsByMonth = evaluations.reduce<Record<string, Evaluation[]>>(
            (acc, evaluation) => {
                const month = new Date(evaluation.createdAt).toISOString().slice(0, 7);
                if (!acc[month]) acc[month] = [];
                acc[month].push(evaluation);
                return acc;
            },
            {}
        );

        const successRateByMonth = Object.entries(evaluationsByMonth).map(([month, evals]) => {
            const total = evals.length;
            const successes = evals.filter((e) => e.score > 6).length;
            return {
                month,
                rate: total > 0 ? successes / total : 0,
            };
        });

        if (successRateByMonth.length < 2) return 0;

        const sorted = successRateByMonth.sort((a, b) => a.month.localeCompare(b.month));
        const first = sorted[0].rate;
        const last = sorted[sorted.length - 1].rate;

        if (first === 0) return 0;
        return ((last - first) / first) * 100;
    }, [evaluations]);

    const categoryData = useMemo(() => {
        if (evaluations.length === 0 || decisions.length === 0) return [];

        const categoriesMap: Record<string, { buenas: number; malas: number }> = {};
        allCategories.forEach((cat) => {
            categoriesMap[cat] = { buenas: 0, malas: 0 };
        });

        evaluations.forEach((evaluation) => {
            const decision = decisions.find((d) => d.id === evaluation.decisionId);
            if (!decision) return;

            const category = decision.category.trim();

            if (!categoriesMap[category]) return;

            const isGood = evaluation.score > 6;
            if (isGood) {
                categoriesMap[category].buenas += 1;
            } else {
                categoriesMap[category].malas += 1;
            }
        });

        return allCategories.map((name) => ({
            name,
            buenas: categoriesMap[name].buenas,
            malas: categoriesMap[name].malas,
        }));
    }, [evaluations, decisions]);

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

    console.log(filteredEvaluations);

    return (
        <div className="w-full p-4 pr-8 h-full">
            <header className="flex flex-col px-0 py-4 gap-2">
                <h1 className="text-3xl font-bold">Panel de Análisis de Datos</h1>
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
                    content={`${improvement.toFixed(0)}%`}
                    description="Mejora en los resultados de las decisiones a lo largo del tiempo"
                    icon={
                        <LuCircleAlert className="bg-orange-200 rounded-full text-orange-400 p-2" />
                    }
                    title="Mejora"
                    className="text-5xl"
                />
            </div>

            <section className="grid lg:grid-cols-2 gap-4">
                <TinyBarChart decisions={decisions} evaluations={filteredEvaluations} />
                <AnalyticsResumeCard evaluations={filteredEvaluations} />
                <LineChartDecisionStats evaluations={filteredEvaluations} />
            </section>
        </div>
    );
};

export default Analytics;
