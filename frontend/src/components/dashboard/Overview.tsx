import NewDecisionButton from './NewDecisionButton';
import QuickStatsCard from './QuickStatsCard';
import RecentActivity from './RecentActivity';

const Overview = () => {
    return (
        <div className="flex flex-col w-full p-8">
            <header className="flex justify-between items-center ">
                <h1 className="text-5xl">Gestor de decisiones personales</h1>
                <NewDecisionButton />
            </header>
            <hr className="mt-8 border-1 border-gray-300" />
            <section className="grid grid-cols-3 gap-4 mt-8">
                <RecentActivity />
                <RecentActivity />
                <QuickStatsCard />
            </section>
            <section>LISTA Y FILTRADO DE DECISIONES</section>
        </div>
    );
};

export default Overview;
