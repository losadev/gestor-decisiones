import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Trabajo', buenas: 4, malas: 2 },
    { name: 'Salud', buenas: 3, malas: 1 },
    { name: 'Finanzas', buenas: 5, malas: 0 },
    { name: 'Personal', buenas: 2, malas: 3 },
    { name: 'Familia', buenas: 4, malas: 2 },
    { name: 'Otros', buenas: 1, malas: 4 },
];

const TinyBarChart = () => {
    return (
        <div className="flex flex-col h-full gap-4 w-full 2xl:p-8 bg-white shadow-sm border border-gray-300 p-4">
            <h1 className="text-xl lg:text-3xl font-semibold">Decisiones por categoría</h1>
            <div className="w-full min-h-[300px] h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="buenas" stackId="a" fill="#82ca9d" name="Buenas" />
                        <Bar dataKey="malas" stackId="a" fill="#FF4C4C" name="Malas" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TinyBarChart;
