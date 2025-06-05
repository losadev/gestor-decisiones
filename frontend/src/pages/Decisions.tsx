import { useEffect, useState } from 'react';
import NewDecisionButton from '../components/NewDecisionButton';
import DecisionsTable from '../components/DecisionsTable';
import DecisionForm from '../components/DecisionForm';
import Snackbar from '../components/SnackBar';

const Decisions = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSuccess, setSnackbarSuccess] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const forceRefresh = () => setRefreshTrigger((prev) => prev + 1);

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
        <div className="flex flex-col gap-4 w-full h-full">
            <header className="flex flex-col justify-between items-center py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                <h1 className="text-2xl font-bold text-center sm:text-3xl">
                    Gestor de decisiones personales
                </h1>
                <NewDecisionButton onClick={openModal} />
            </header>
            <main className="flex-1 w-full ">
                <DecisionsTable refreshTrigger={refreshTrigger} onRefresh={forceRefresh} />
            </main>
            <DecisionForm
                isOpen={modal}
                onClose={closeModal}
                onMessage={(msg: string, success = true) => {
                    setSnackbarMessage(msg);
                    setSnackbarSuccess(success);
                    closeModal();
                    forceRefresh();
                }}
            />
            <Snackbar
                message={snackbarMessage}
                onClose={() => setSnackbarMessage('')}
                open={!!snackbarMessage}
                success={snackbarSuccess}
            />
        </div>
    );
};

export default Decisions;
