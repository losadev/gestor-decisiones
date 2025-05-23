import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import DropDownActions from './DropDownActions';
import { DecisionData } from '../../types/decision.types';
import axios from 'axios';
import { Chip } from './Chip';

function DecisionsTable() {
    const [data, setData] = useState<DecisionData[]>([]);
    const [showActions, setShowActions] = useState<number | null>(null);
    const [openUpwardIndex, setOpenUpwardIndex] = useState<number | null>(null);
    const [searchDecision, setSearchDecision] = useState<string>('');
    const [searchFilterItems, setSearchFilterItems] = useState<DecisionData[]>(data);
    const [active, setActive] = useState<number>(1);
    const [message, setMessage] = useState<string>('');

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

            const shouldOpenUpward =
                distanceToBottom < dropdownHeight && distanceToTop > dropdownHeight;
            setOpenUpwardIndex(shouldOpenUpward ? index : null);
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/decision', { withCredentials: true })
            .then((response) => {
                setData(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, [data]);

    useEffect(() => {
        let filtered = [...data];

        if (searchDecision.trim() !== '') {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchDecision.toLowerCase())
            );
        }

        if (active === 2) {
            filtered = filtered.filter((d) => d.status === 'progress');
        } else if (active === 3) {
            filtered = filtered.filter((d) => d.status === 'evaluated');
        }

        setSearchFilterItems(filtered);
    }, [searchDecision, active, data]);

    const deleteDecision = (id: string) => {
        axios
            .delete(`http://localhost:5000/api/decision/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setMessage(error.message);
            });
    };

    return (
        <section className="w-full h-full min-h-20 0">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:px-8 w-full min-h-20 h-full">
                <h2 className="text-2xl font-semibold">Tus decisiones</h2>
                <p className="mt-1 text-gray-600">
                    Gestiona y haz seguimiento de todas tus decisiones
                </p>

                <div className="my-4">
                    <input
                        type="search"
                        placeholder="Busca tu decisión aquí..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-96"
                        value={searchDecision}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchDecision(e.target.value)
                        }
                    />
                </div>

                <div className="inline-flex bg-gray-100 my-4 p-2 text-sm sm:text-base items-center rounded-lg">
                    <ul className="flex flex-row font-medium items-center text-gray-800 gap-2 sm:gap-4">
                        <li
                            className={`${active === 1 ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer transition`}
                            onClick={() => setActive(1)}>
                            Todas
                        </li>
                        <li
                            className={`${active === 2 ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer transition`}
                            onClick={() => setActive(2)}>
                            Pendientes
                        </li>
                        <li
                            className={`${active === 3 ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'} px-3 py-1 rounded cursor-pointer transition`}
                            onClick={() => setActive(3)}>
                            Evaluadas
                        </li>
                    </ul>
                </div>

                <div className="rounded-lg w-full overflow-x-auto shadow-sm !min-h-20">
                    <table className="min-w-max w-full text-sm sm:text-base " ref={tableRef}>
                        <thead className="bg-orange-500 text-black h-12">
                            <tr className="text-left">
                                <th className="px-4 sm:px-6 py-3">Título</th>
                                <th className="px-4 sm:px-6 py-3">Categoría</th>
                                <th className="px-4 sm:px-6 py-3">Fecha</th>
                                <th className="px-4 sm:px-6 py-3">Estado</th>
                                <th className="px-4 sm:px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchFilterItems.map((decision, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition">
                                    <td className="px-4 sm:px-6 py-3">{decision.title}</td>
                                    <td className="px-4 sm:px-6 py-3">{decision.category}</td>
                                    <td className="px-4 sm:px-6 py-3">
                                        {decision.createdAt.split('T')[0]}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3">
                                        <Chip mode={decision.status} />
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 relative">
                                        <button
                                            type="button"
                                            className="cursor-pointer hover:bg-orange-200 rounded-lg p-2"
                                            onClick={() => handleActions(index)}>
                                            <IoEllipsisHorizontalOutline />
                                        </button>
                                        <DropDownActions
                                            id={decision.id}
                                            ref={(el) => {
                                                refs.current[index] = el;
                                            }}
                                            key={index}
                                            open={showActions === index}
                                            openUpward={openUpwardIndex === index}
                                            onDelete={deleteDecision}
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
