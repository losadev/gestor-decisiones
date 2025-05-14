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
            .get('http://localhost:5000/api/decision', {
                withCredentials: true,
            })
            .then((response) => {
                setData(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        let filtered = [...data];

        // Filtrar por texto
        if (searchDecision.trim() !== '') {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchDecision.toLowerCase())
            );
        }

        // Filtrar por estado
        if (active === 2) {
            filtered = filtered.filter((d) => d.status === 'progress');
        } else if (active === 3) {
            filtered = filtered.filter((d) => d.status === 'evaluated');
        }

        setSearchFilterItems(filtered);
    }, [searchDecision, active, data]);

    useEffect(() => {
        setSearchFilterItems(data);
    }, [data]);

    return (
        <section className="px-4 pb-8 h-full ">
            <div className="bg-white shadow-md rounded-lg p-6 lg:px-8 w-full h-full">
                <h1 className="text-3xl font-semibold">Tus decisiones</h1>
                <p className="mt-1 text-gray-600">
                    Gestiona y haz seguimiento todas tus decisiones
                </p>
                <div className="my-4">
                    <input
                        type="search"
                        placeholder="Busca tu decisión aquí..."
                        className="border border-gray-300 rounded-lg px-4 py-1"
                        value={searchDecision}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSearchDecision(e.target.value)
                        }
                    />
                </div>
                {/*<DecisionFilters active={} setActive={}/>*/}
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
                <div className="rounded-lg  w-full overflow-auto shadow-sm">
                    <table className="w-full min-h-20 custom-table" ref={tableRef}>
                        <thead className=" text-white h-12">
                            <tr className="text-left">
                                <th className="px-8 py-2">Título</th>
                                <th className="px-8 py-2">Categoría</th>
                                <th className="px-8 py-2">Fecha</th>
                                <th className="px-8 py-2">Estado</th>
                                <th className="px-8 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchFilterItems?.map((decision, index) => (
                                <tr key={index} className="hover:bg-gray-200 transition">
                                    <td className="px-8 py-2">{decision.title}</td>
                                    <td className="px-8 py-2">{decision.category}</td>
                                    <td className="px-8 py-2">
                                        {decision.createdAt.split('T')[0]}
                                    </td>
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
                                            id={decision.id}
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
