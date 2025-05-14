//import { useState } from 'react';

const DecisionFilters = ({
    active,
    setActive,
}: {
    active: number;
    setActive: (index: number) => void;
}) => {
    //const [active, setActive] = useState<number>(1);
    return (
        <div className="inline-flex bg-gray-100 my-4 p-2 text-sm sm:text-lg items-center justify- rounded-lg">
            <ul className="flex flex-row font-medium items-center text-gray-800">
                <li
                    className={`${active === 1 ? 'bg-orange-500' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer  transition`}
                    onClick={() => setActive(1)}>
                    Todas
                </li>
                <li
                    className={`${active === 2 ? 'bg-orange-500' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer  transition`}
                    onClick={() => setActive(2)}>
                    Pendientes
                </li>
                <li
                    className={`${active === 3 ? 'bg-orange-500' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer  transition`}
                    onClick={() => setActive(3)}>
                    Evaluadas
                </li>
            </ul>
        </div>
    );
};

export default DecisionFilters;
