import { useState } from 'react';
import DecisionForm from '../Decision/DecisionForm';
import NewDecisionButton from './NewDecisionButton';
import QuickStatsCard from './QuickStatsCard';
import RecentActivity from './RecentActivity';

const Overview = () => {
    const [modal, setModal] = useState<boolean>(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };
    return (
        <div className="flex flex-col w-full relative">
            <header className="flex justify-between items-center p-8">
                <h1 className="text-5xl">Gestor de decisiones personales</h1>
                <NewDecisionButton onClick={openModal} />
            </header>
            <hr className="mt-8 border-1 border-gray-300" />
            <section className="grid grid-cols-3 gap-4 mt-8 p-8">
                <RecentActivity />
                <RecentActivity />
                <QuickStatsCard />
            </section>
            <section>LISTA Y FILTRADO DE DECISIONES</section>
            <DecisionForm isOpen={modal} onClose={closeModal} />
        </div>
    );
};

export default Overview;
