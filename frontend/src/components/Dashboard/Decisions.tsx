import DecisionsTable from './DecisionsTable';
import NewDecisionButton from './NewDecisionButton';

const Decisions = () => {
    return (
        <div className="flex flex-col w-full px-8 py-8 gap-4">
            <header className="flex flex-col justify-between items-center px-4 py-4 gap-8 sm:flex sm:flex-row sm:items-center md:flex md:flex-row :items-center">
                <h1 className="text-2xl font-bold text-center sm:text-3xl">
                    Gestor de decisiones personales
                </h1>
                <NewDecisionButton />
            </header>
            <main className="h-full ">
                <DecisionsTable />
            </main>
        </div>
    );
};

export default Decisions;
