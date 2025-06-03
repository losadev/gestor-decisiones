import { useEffect, useState } from 'react';
import DecisionsTable from './DecisionsTable';
import NewDecisionButton from './NewDecisionButton';
import DecisionForm from '../Decision/DecisionForm';
import Snackbar from '../SnackBar';

const Decisions = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSuccess, setSnackbarSuccess] = useState(true);

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
        <div className="flex flex-col gap-4 w-full h-full 2xl:pr-4">
            <header className="flex flex-col justify-between items-center py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                <h1 className="text-2xl font-bold text-center sm:text-3xl">
                    Gestor de decisiones personales
                </h1>
                <NewDecisionButton onClick={openModal} />
            </header>
            <main className="flex-1 w-full ">
                <DecisionsTable />
            </main>
            <DecisionForm
                isOpen={modal}
                onClose={closeModal}
                onMessage={(msg, success = true) => {
                    setSnackbarMessage(msg);
                    setSnackbarSuccess(success);
                    closeModal();
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
