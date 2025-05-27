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

interface CategoryData {
    name: string;
    buenas: number;
    malas: number;
}

interface Props {
    data: CategoryData[];
}

const TinyBarChart = ({ data }: Props) => {
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
