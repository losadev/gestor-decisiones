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
        <div className="w-full min-h-screen relative ">
            <div className="w-full flex flex-col py-4 2xl:px-4 ">
                <div className="flex flex-col w-full ">
                    <header className="flex flex-col justify-between items-center px-0 py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                        <h1 className="text-2xl font-bold text-center sm:text-3xl">
                            Gestor de decisiones personales
                        </h1>
                        <NewDecisionButton onClick={openModal} />
                    </header>
                    <section className="grid grid-cols-1 gap-4 my-4 p-0 md:grid-cols-2 md:grid-rows-1 md:items-stretch xl:grid-cols-3 xl:grid-rows-1 min-h-[300px] ">
                        <AnalyticsResumeCard />
                        <RecentActivity />
                        <QuickStatsCard />
                    </section>

                    <DecisionForm isOpen={modal} onClose={closeModal} />
                </div>
                <DecisionsTable />
            </div>
        </div>
    );
};

export default Overview;
