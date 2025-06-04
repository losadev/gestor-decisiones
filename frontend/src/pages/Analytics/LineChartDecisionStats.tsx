import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Evaluation } from '../../types/decision.types';
import { subMonths, format } from 'date-fns';

const getLastNMonths = (n: number): string[] => {
    const months: string[] = [];
    for (let i = n - 1; i >= 0; i--) {
        months.push(format(subMonths(new Date(), i), 'MMM'));
    }
    return months;
};

const countEvaluationsPerMonth = (evaluations: Evaluation[], months: string[]) => {
    const stats: Record<string, { buenas: number; malas: number }> = {};

    months.forEach((month) => {
        stats[month] = { buenas: 0, malas: 0 };
    });

    evaluations.forEach((evaluation) => {
        const month = format(new Date(evaluation.createdAt), 'MMM');
        if (months.includes(month)) {
            if (evaluation.score >= 6) stats[month].buenas += 1;
            else if (evaluation.score < 5) stats[month].malas += 1;
        }
    });

    return months.map((month) => ({
        month,
        buenas: stats[month].buenas,
        malas: stats[month].malas,
    }));
};

const LineChartDecisionStats = ({ evaluations }: { evaluations: Evaluation[] }) => {
    const [chartData, setChartData] = useState<{ month: string; buenas: number; malas: number }[]>(
        []
    );

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:5000/api/evaluation', { withCredentials: true })
    //         .then((response) => {
    //             const data = response.data.data as Evaluation[];
    //             // setEvaluation(data);

    //             const months = getLastNMonths(5);
    //             const stats = countEvaluationsPerMonth(data, months);
    //             setChartData(stats);
    //         })
    //         .catch(console.log);
    // }, []);

    useEffect(() => {
        const months = getLastNMonths(5);
        const stats = countEvaluationsPerMonth(evaluations, months);
        setChartData(stats);
    }, [evaluations]);

    return (
        <div className="w-full flex flex-col justify-center gap-4 bg-white rounded-lg p-4 md:p-8 lg:col-span-2 shadow-sm border border-gray-300">
            <h1 className="text-xl sm:text-2xl font-semibold">
                Tendencia de Decisiones Buenas vs Malas
            </h1>
            <div className="w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 30, left: 0, bottom: 0, right: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="buenas"
                            stroke="#22c55e"
                            strokeWidth={3}
                            name="Buenas"
                        />
                        <Line
                            type="monotone"
                            dataKey="malas"
                            stroke="#ef4444"
                            strokeWidth={3}
                            name="Malas"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChartDecisionStats;
