import { useEffect, useState } from 'react';
import DecisionsTable from './DecisionsTable';
import NewDecisionButton from './NewDecisionButton';
import DecisionForm from '../Decision/DecisionForm';

const Decisions = () => {
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
        <div className="flex flex-col gap-4 py-4 w-full mx-auto">
            <header className="flex flex-col justify-between items-center px-0 py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                <h1 className="text-2xl font-bold text-center sm:text-3xl">
                    Gestor de decisiones personales
                </h1>
                <NewDecisionButton onClick={openModal} />
            </header>
            <main className="flex-1 w-full ">
                <DecisionsTable />
            </main>
            <DecisionForm isOpen={modal} onClose={closeModal} />
        </div>
    );
};

export default Decisions;
