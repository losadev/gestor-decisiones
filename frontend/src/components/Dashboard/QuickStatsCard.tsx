const QuickStatsCard = () => {
    return (
        <div className="rounded-lg bg-white shadow-md py-4 px-2 inline-flex flex-col gap-1 sm:w-full lg:px-8 xl:h-full">
            <div className="flex flex-col gap-2 p-4 border-b-amber-100">
                <h1 className="text-2xl font-semibold sm:text-3xl">Estadísticas rápidas</h1>
                <p className="text-gray-500">Tus últimas decisiones evaluadas / creadas</p>

                <div className="grid grid-cols-2 grid-rows-[1fr 1fr] gap-4 mt-4 font-medium ">
                    <div className="flex flex-col justify-between text-center gap-4 border border-gray-300 shadow-md  rounded-lg py-6 px-2">
                        <span>Total de decisiones</span>
                        <span className="text-3xl font-bold">10</span>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border border-gray-300 text-center shadow-md rounded-lg py-6 px-2">
                        <span>Decisiones pendientes</span>
                        <span className="text-3xl font-bold">5</span>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border border-gray-300 shadow-md rounded-lg py-6 px-2 text-center">
                        <span>Buenas decisiones</span>
                        <span className="text-3xl font-bold text-green-700">68%</span>
                    </div>
                    <div className="flex justify-between flex-col gap-4 border border-gray-300 shadow-md rounded-lg py-6 px-2 text-center">
                        <span>Malas decisiones</span>
                        <span className="text-3xl font-bold text-red-700">32%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickStatsCard;
