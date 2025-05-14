import { useEffect, useState } from 'react';
import DecisionForm from '../Decision/DecisionForm';
import NewDecisionButton from './NewDecisionButton';
import QuickStatsCard from './QuickStatsCard';
import RecentActivity from './RecentActivity';
import DecisionsTable from './DecisionsTable';
import AnalyticsResumeCard from './AnalyticsResumeCard';

const Overview = () => {
    const [modal, setModal] = useState<boolean>(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        const main = document.getElementById('main-scroll');
        if (main) {
            main.style.overflow = modal ? 'hidden' : 'auto';
        }
    }, [modal]);

    return (
        <div className="w-full flex flex-col p-8">
            <div className="flex flex-col w-full relative">
                <header className="flex flex-col justify-between items-center px-4 py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                    <h1 className="text-2xl font-bold text-center sm:text-3xl">
                        Gestor de decisiones personales
                    </h1>
                    <NewDecisionButton onClick={openModal} />
                </header>
                <section className="grid grid-cols-1 items-center sm:flex sm:flex-wrap justify-center gap-4 mt-2 p-4 xl:grid-cols-3 xl:grid">
                    <AnalyticsResumeCard />
                    <RecentActivity />
                    <QuickStatsCard />
                </section>

                <DecisionForm isOpen={modal} onClose={closeModal} />
            </div>
            <DecisionsTable />
        </div>
    );
};

export default Overview;
