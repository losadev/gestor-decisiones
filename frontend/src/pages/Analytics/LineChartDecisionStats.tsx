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
// Simulación de datos agregados por mes
const data = [
    { month: 'Ene', buenas: 4, malas: 1 },
    { month: 'Feb', buenas: 3, malas: 2 },
    { month: 'Mar', buenas: 5, malas: 0 },
    { month: 'Abr', buenas: 2, malas: 3 },
    { month: 'May', buenas: 6, malas: 1 },
];
const LineChartDecisionStats = () => {
    return (
        <div className="w-full flex flex-col justify-center gap-4 bg-white rounded p-8 2xl:col-span-2 shadow-sm h-[300px] border border-gray-300">
            <h1 className="text-3xl font-semibold">Tendencia de Decisiones Buenas vs Malas</h1>
            <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
