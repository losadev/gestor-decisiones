import { ReactNode } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { HiOutlineTrendingUp } from 'react-icons/hi';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FiAlertCircle } from 'react-icons/fi';
import Filters from './Filters';
import AnalyticsResumeCard from '../../components/Dashboard/AnalyticsResumeCard';
import TinyBarChart from './TinyBarChart';
import LineChartDecisionStats from './LineChartDecisionStats';
import { LuCircleAlert } from 'react-icons/lu';

interface Props {
    title: string;
    content: string;
    icon: ReactNode;
    description: string;
    className?: string;
}

const AnalyticsCard = ({ title, content, icon, description, className }: Props) => {
    return (
        <div className="border bg-white border-gray-300 rounded-lg p-8 flex flex-col gap-6 grow">
            <div className="flex  w-full">
                <div className="flex flex-col gap-2 flex-1 ">
                    <span className="font-medium text-gray-600">{title}</span>
                    <span className={`text-4xl font-semibold lg:text-3xl flex-1 ${className}`}>
                        {content}
                    </span>
                </div>
                <span className={`${className} `}>{icon}</span>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const Analytics = () => {
    return (
        <div className="w-full p-4">
            <h1 className="text-3xl font-bold">Panel de Análisis de Datos</h1>
            <p className="text-gray-600 font-medium mt-2">
                Obtén información sobre tus patrones y resultados en la toma de decisiones
            </p>
            <div className="flex flex-col my-8 gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard
                    content="8"
                    description="4 evaluated • 4 pending"
                    icon={<IoMdCheckmarkCircleOutline className="bg-gray-200 rounded-full p-2" />}
                    title="Decisiones totales"
                    className="text-5xl"
                />
                <AnalyticsCard
                    content="61%"
                    description="Based on 4 evaluated decisions"
                    icon={
                        <HiOutlineTrendingUp className="bg-green-400 rounded-full text-green-200 p-2" />
                    }
                    title="Ratio de éxito"
                    className="text-5xl"
                />
                <AnalyticsCard
                    content="5.2 días"
                    description="Average time from consideration to decision"
                    icon={
                        <MdOutlineWatchLater className="bg-green-200 rounded-full text-green-400 p-2" />
                    }
                    title="Media de tiempo para decidir"
                    className="text-5xl"
                />
                <AnalyticsCard
                    content="12%"
                    description="Improvement in decision outcomes over tim"
                    icon={<LuCircleAlert className=" rounded-full text-red-600 bg-red-200 p-2" />}
                    title="Tendencia de Mejora"
                />
            </div>
            <Filters />
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-2">
                <AnalyticsResumeCard />
                <TinyBarChart />
                <LineChartDecisionStats />
            </div>
        </div>
    );
};

export default Analytics;
