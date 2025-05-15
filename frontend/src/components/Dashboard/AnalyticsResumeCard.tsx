import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const EvaluationType = ({ color, text }: { color: string; text: string }) => {
    return (
        <div className="flex gap-4 items-center">
            <span className="rounded-full h-4 w-4" style={{ backgroundColor: color }}></span>
            <p className="text-gray-500">{text}</p>
        </div>
    );
};

const AnalyticsResumeCard = () => {
    const data = [
        { name: 'good', value: 400 },
        { name: 'bad', value: 300 },
        { name: 'neutral', value: 300 },
    ];

    const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
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

    return (
        <div className="rounded-lg bg-white shadow-md py-8 px-8 flex flex-col md:h-full md:flex-1">
            <h1 className="text-3xl font-semibold">Resumen análisis</h1>
            <p className="text-gray-500">Ratio de evaluaciones</p>
            <div className="flex justify-center items-center grow">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value">
                            {data.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div>
                <EvaluationType color={COLORS[0]} text="Evaluaciones positivas" />
                <EvaluationType color={COLORS[1]} text="Evaluaciones negativas" />
                <EvaluationType color={COLORS[2]} text="Evaluaciones neutras" />
            </div>
        </div>
    );
};

export default AnalyticsResumeCard;
