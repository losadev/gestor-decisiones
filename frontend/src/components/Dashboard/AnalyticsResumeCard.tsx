import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Evaluation } from '../../types/decision.types';

const EvaluationType = ({ color, text }: { color: string; text: string }) => {
    return (
        <div className="flex gap-4 items-center">
            <span className="rounded-full h-4 w-4" style={{ backgroundColor: color }}></span>
            <p className="text-gray-500">{text}</p>
        </div>
    );
};

const AnalyticsResumeCard = () => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

    const COLORS = ['#0088FE', '#FFBB28', '#FF4C4C']; // Positivas, Neutras, Negativas

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                className="font-bold text-xl p-4"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/evaluation', { withCredentials: true })
            .then((response) => {
                setEvaluations(response.data.data);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        if (!Array.isArray(evaluations)) return;

        const good = evaluations.filter((e) => Number(e.score) >= 6);
        const neutral = evaluations.filter((e) => Number(e.score) === 5);
        const bad = evaluations.filter((e) => Number(e.score) <= 4);

        setChartData([
            { name: 'good', value: good.length },
            { name: 'neutral', value: neutral.length },
            { name: 'bad', value: bad.length },
        ]);
    }, [evaluations]);

    return (
        <div className="rounded-lg bg-white shadow-md p-8 flex flex-col md:h-full md:flex-1 border border-gray-300">
            <h1 className="text-3xl font-semibold">Resumen análisis</h1>
            <p className="text-gray-500">Ratio de evaluaciones</p>
            <div className="flex justify-center items-center grow">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            //label={renderCustomizedLabel}
                            outerRadius={110}
                            fill="#8884d8"
                            dataKey="value">
                            {chartData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
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
