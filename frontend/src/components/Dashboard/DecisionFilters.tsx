const DecisionFilters = () => {
    return (
        <div className="inline-flex bg-gray-100 my-4 p-2 text-sm sm:text-lg items-center justify- rounded-lg">
            <ul className="flex flex-row font-medium items-center text-gray-800">
                <li className=" px-3 py-1 rounded cursor-pointer hover:bg-gray-200 transition">
                    Todas
                </li>
                <li className="bg-orange-500 px-3 py-1 rounded cursor-pointer hover:bg-gray-200 transition">
                    Pendientes
                </li>
                <li className=" px-3 py-1 rounded cursor-pointer hover:bg-gray-200 transition">
                    Evaluadas
                </li>
            </ul>
        </div>
    );
};

export default DecisionFilters;
