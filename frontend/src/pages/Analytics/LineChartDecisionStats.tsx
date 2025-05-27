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

const data = [
    { month: 'Ene', buenas: 4, malas: 1 },
    { month: 'Feb', buenas: 3, malas: 2 },
    { month: 'Mar', buenas: 5, malas: 0 },
    { month: 'Abr', buenas: 2, malas: 3 },
    { month: 'May', buenas: 6, malas: 1 },
];

const LineChartDecisionStats = () => {
    return (
        <div className="w-full flex flex-col justify-center gap-4 bg-white rounded p-8 lg:col-span-2 shadow-sm border border-gray-300">
            <h1 className="text-2xl lg:text-3xl font-semibold">
                Tendencia de Decisiones Buenas vs Malas
            </h1>
            <div className="w-full h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 30, left: 0, bottom: 0, right: 0 }}>
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
