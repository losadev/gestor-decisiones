import { useRef, useState } from 'react';
import DecisionFilters from './DecisionFilters';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import DropDownActions from './DropDownActions';

function DecisionsTable() {
    const [showActions, setShowActions] = useState<number | null>(null);
    const [openUpwardIndex, setOpenUpwardIndex] = useState<number | null>(null);

    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const tableRef = useRef<HTMLTableElement | null>(null);

    const handleActions = (index: number) => {
        setShowActions(index);

        const actionEl = refs.current[index];
        const tableEl = tableRef.current;

        if (actionEl && tableEl) {
            const actionRect = actionEl.getBoundingClientRect();
            const tableRect = tableEl.getBoundingClientRect();

            const distanceToBottom = tableRect.bottom - actionRect.bottom;
            const dropdownHeight = 150;

            const shouldOpenUpward = distanceToBottom < dropdownHeight;
            setOpenUpwardIndex(shouldOpenUpward ? index : null);
        }
    };

    const decisions = [
        {
            title: 'Elegir carrera universitaria',
            category: 'Educación',
            date: '2025-05-01',
            status: 'Pendiente',
        },
        {
            title: 'Comprar coche nuevo',
            category: 'Finanzas',
            date: '2025-04-20',
            status: 'Completada',
        },
        {
            title: 'Iniciar proyecto personal',
            category: 'Trabajo',
            date: '2025-05-03',
            status: 'En progreso',
        },
        {
            title: 'Mudanza a otra ciudad',
            category: 'Vida personal',
            date: '2025-03-15',
            status: 'Pendiente',
        },
        {
            title: 'Contratar seguro de salud',
            category: 'Salud',
            date: '2025-04-10',
            status: 'Completada',
        },
    ];

    return (
        <section className="px-8 pb-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-semibold">Tus decisiones</h1>
                <p className="mt-1 text-gray-600">
                    Gestiona y haz seguimiento todas tus decisiones
                </p>
                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Busca tu decisión aquí"
                        className="border border-gray-300 rounded-lg px-4 py-1"
                    />
                </div>
                <DecisionFilters />
                <div className="rounded-lg  border border-gray-200 w-full shadow-sm">
                    <table className="w-full custom-table" ref={tableRef}>
                        <thead className="bg-gray-100 h-12">
                            <tr className="text-left">
                                <th className="px-8 py-2">Título</th>
                                <th className="px-8 py-2">Categoría</th>
                                <th className="px-8 py-2">Fecha</th>
                                <th className="px-8 py-2">Estado</th>
                                <th className="px-8 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {decisions.map((decision, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-300 hover:bg-gray-100 transition">
                                    <td className="px-8 py-2">{decision.title}</td>
                                    <td className="px-8 py-2">{decision.category}</td>
                                    <td className="px-8 py-2">{decision.date}</td>
                                    <td className="px-8 py-2">{decision.status}</td>
                                    <td className="px-8 py-2 relative">
                                        <button
                                            type="button"
                                            className="cursor-pointer hover:bg-gray-200 rounded-lg p-3"
                                            onClick={() => handleActions(index)}>
                                            <IoEllipsisHorizontalOutline />
                                        </button>
                                        <DropDownActions
                                            ref={(el) => {
                                                refs.current[index] = el;
                                            }}
                                            key={index}
                                            open={showActions === index}
                                            openUpward={openUpwardIndex === index}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default DecisionsTable;
