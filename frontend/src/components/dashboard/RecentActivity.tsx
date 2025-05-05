export const recentDecisions = [
    {
        id: '1',
        title: 'Cambiar de trabajo',
        category: 'Carrera',
        status: 'evaluated',
    },
    {
        id: '2',
        title: 'Mudarse a otra ciudad',
        category: 'Vida personal',
        status: 'progress',
    },
    {
        id: '3',
        title: 'Comprar un coche eléctrico',
        category: 'Finanzas',
        status: 'evaluated',
    },
    {
        id: '4',
        title: 'Empezar un máster',
        category: 'Educación',
        status: 'progress',
    },
    {
        id: '5',
        title: 'Invertir en bolsa',
        category: 'Finanzas',
        status: 'evaluated',
    },
];

const RecentActivity = () => {
    return (
        <div className="rounded-lg bg-white shadow-md py-4 px-8 inline-flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Actividad reciente</h1>
            <p className="text-gray-500">Tus últimas decisiones evaluadas / creadas</p>
            <div>
                {recentDecisions.map((decision) => (
                    <div
                        key={decision.id}
                        className="flex flex-col gap-2 p-4 border-b border-b-gray-300">
                        <h3 className="font-semibold">{decision.title}</h3>
                        <div className="flex gap-2">
                            <span className="rounded-xl border text-blue-200 bg-blue-800 px-2">
                                {decision.category}
                            </span>
                            <span
                                className={`rounded-xl border ${
                                    decision.status === 'evaluated'
                                        ? 'text-green-200 bg-green-800'
                                        : 'text-orange-500'
                                } px-2`}>
                                {decision.status === 'evaluated' ? 'Evaluado' : 'En progreso'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;
