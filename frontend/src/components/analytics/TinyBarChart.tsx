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
import { DecisionData } from '../../types/decision.types';
import { Evaluation } from '../../types/evaluation.types';

interface CategoryData {
    name: string;
    buenas: number;
    malas: number;
}

interface Props {
    evaluations: Evaluation[];
    decisions: DecisionData[];
}

const allCategories = ['Trabajo', 'Salud', 'Finanzas', 'Personal', 'Familia', 'Otros'];

const TinyBarChart = ({ evaluations, decisions }: Props) => {
    // Agrupa evaluaciones por categoría y cuenta buenas y malas
    const categoryData: CategoryData[] = allCategories.map((category) => {
        let buenas = 0;
        let malas = 0;

        evaluations.forEach((evaluation) => {
            const decision = decisions.find((d) => d.id === evaluation.decisionId);
            if (decision?.category.trim() === category) {
                if (evaluation.score > 6) buenas += 1;
                else malas += 1;
            }
        });

        return { name: category, buenas, malas };
    });

    return (
        <div className="flex flex-col h-full gap-4 w-full rounded-lg md:p-8 bg-white shadow-sm border border-gray-300 p-4">
            <h1 className="text-xl sm:text-2xl font-semibold">Decisiones por categoría</h1>
            <div className="w-full min-h-[300px] h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} margin={{ top: 30 }}>
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
