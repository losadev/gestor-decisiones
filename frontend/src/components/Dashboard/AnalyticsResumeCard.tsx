import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Evaluation } from '../../types/decision.types';

interface Props {
    evaluations: Evaluation[];
}

const EvaluationType = ({ color, text }: { color: string; text: string }) => {
    return (
        <div className="flex gap-4 items-center">
            <span className="rounded-full h-4 w-4" style={{ backgroundColor: color }}></span>
            <p className="text-gray-500">{text}</p>
        </div>
    );
};

const AnalyticsResumeCard = ({ evaluations }: Props) => {
    const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

    const COLORS = ['#0088FE', '#FFBB28', '#FF4C4C']; // Positivas, Neutras, Negativas

    useEffect(() => {
        if (!Array.isArray(evaluations)) {
            setChartData([]);
            return;
        }

        const good = evaluations.filter((e) => Number(e.score) >= 6);
        const neutral = evaluations.filter((e) => Number(e.score) === 5);
        const bad = evaluations.filter((e) => Number(e.score) <= 4);

        setChartData([
            { name: 'good', value: good.length },
            { name: 'neutral', value: neutral.length },
            { name: 'bad', value: bad.length },
        ]);
    }, [evaluations]);

    const total = chartData.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="rounded-lg bg-white shadow-sm p-8 flex flex-col md:h-full md:flex-1 border border-gray-300">
            <h1 className="text-3xl font-semibold">Resumen análisis</h1>
            <p className="text-gray-500">Ratio de evaluaciones</p>
            <div className="flex justify-center items-center grow min-h-[400px]">
                {total > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value">
                                {chartData.map((_entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-400 text-lg">Aún no hay evaluaciones disponibles.</p>
                )}
            </div>
            <div>
                <EvaluationType color={COLORS[0]} text="Evaluaciones positivas" />
                <EvaluationType color={COLORS[1]} text="Evaluaciones neutras" />
                <EvaluationType color={COLORS[2]} text="Evaluaciones negativas" />
            </div>
        </div>
    );
};

export default AnalyticsResumeCard;
