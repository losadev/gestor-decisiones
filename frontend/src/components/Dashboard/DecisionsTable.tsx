import { useEffect, useRef, useState } from 'react';
import DecisionFilters from './DecisionFilters';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import DropDownActions from './DropDownActions';
import { Decision } from '../../types/decision.types';
import axios from 'axios';
import { Chip } from './Chip';

function DecisionsTable() {
    const [data, setData] = useState<Decision[] | null>(null);
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
            const distanceToTop = actionRect.top - tableRect.top;
            const dropdownHeight = 150;

            // Si el dropdown no cabe abajo, abre hacia arriba
            const shouldOpenUpward =
                distanceToBottom < dropdownHeight && distanceToTop > dropdownHeight;
            setOpenUpwardIndex(shouldOpenUpward ? index : null);
        }
    };

    useEffect(() => {
        axios
            .get<Decision[]>('http://localhost:5000/api/decision', {
                withCredentials: true,
            })
            .then((response) => {
                setData(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <section className="px-4">
            <div className="bg-white shadow-md rounded-lg p-6 lg:px-8 w-full h-full">
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
                <div className="rounded-lg  border border-gray-200 w-full shadow-sm overflow-auto">
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
                            {Array.isArray(data) ? (
                                data?.map((decision, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-300 hover:bg-gray-100 transition">
                                        <td className="px-8 py-2">{decision.title}</td>
                                        <td className="px-8 py-2">{decision.category}</td>
                                        <td className="px-8 py-2">fecha</td>
                                        <td className="px-8 py-2">
                                            <Chip mode={decision.status} />
                                        </td>
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
                                ))
                            ) : (
                                <tr className="text-center flex items-center flex-1">
                                    <td>No existen decisiones</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default DecisionsTable;
