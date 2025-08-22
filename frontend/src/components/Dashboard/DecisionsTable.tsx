import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';
import DropDownActions from './DropDownActions';
import { DecisionData } from '../../types/decision.types';
import api from '../../utils/api';
import Chip from '../../components/Dashboard/Chip';
import DecisionForm from '../Decision/DecisionForm';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useSnackbarStore } from '../../store/snackbarStore';

function DecisionsTable({
    refreshTrigger,
    onRefresh,
}: {
    refreshTrigger: number;
    onRefresh?: () => void;
}) {
    const [data, setData] = useState<DecisionData[]>([]);
    const [showActions, setShowActions] = useState<number | null>(null);
    const [openUpwardIndex, setOpenUpwardIndex] = useState<number | null>(null);
    const [searchDecision, setSearchDecision] = useState<string>('');
    const [searchFilterItems, setSearchFilterItems] = useState<DecisionData[]>(data);
    const [active, setActive] = useState<number>(1);
    const [message, setMessage] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [modal, setModal] = useState<boolean>(false);
    const { showSnackbar } = useSnackbarStore();

    const refs = useRef<(HTMLButtonElement | null)[]>([]);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [editDecisionId, setEditDecisionId] = useState<string | null>(null);

    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(
        null
    );
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSuccess, setSnackbarSuccess] = useState(true);
    console.log(snackbarMessage, snackbarSuccess);
    const totalPages = Math.ceil(searchFilterItems.length / itemsPerPage);

    const paginatedItems = searchFilterItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchDecision, active]);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const handleEdit = (id: string) => {
        setEditDecisionId(id);
        openModal();
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const buttonElements = refs.current;
            // Si no hay dropdown abierto, no hacer nada
            if (showActions === null) return;

            // Verificar si clic fue fuera del dropdown y fuera del botón
            const clickedOutsideDropdown =
                dropdownRef.current && !dropdownRef.current.contains(target);
            const clickedOutsideButton = !buttonElements[showActions]?.contains(target);

            if (clickedOutsideDropdown && clickedOutsideButton) {
                setShowActions(null);
                setOpenUpwardIndex(null);
                setDropdownPosition(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showActions]);

    console.log(message);

    const handleActions = (index: number) => {
        if (showActions === index) {
            setShowActions(null);
            setOpenUpwardIndex(null);
            setDropdownPosition(null);
            return;
        }

        setShowActions(index);

        const actionEl = refs.current[index];
        const tableEl = tableRef.current;

        if (actionEl && tableEl) {
            const actionRect = actionEl.getBoundingClientRect();

            const dropdownHeight = 150;

            const distanceToBottom = window.innerHeight - actionRect.bottom;
            const distanceToTop = actionRect.top;

            const shouldOpenUpward =
                distanceToBottom < dropdownHeight && distanceToTop > dropdownHeight;
            setOpenUpwardIndex(shouldOpenUpward ? index : null);

            const dropdownMargin = 0; // espacio extra para no quedar pegado

            const top = shouldOpenUpward
                ? actionRect.top + window.scrollY - dropdownHeight - dropdownMargin
                : actionRect.bottom + window.scrollY;

            const left = actionRect.left + window.scrollX - 36;
            setDropdownPosition({ top, left });
        }
    };

    useEffect(() => {
        api
            .get('/decision')
            .then((response) => {
                setData(response.data.decisions);
            })
            .catch((error) => console.log(error));
    }, [refreshTrigger]);

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
        api
            .delete(`/decision/${id}`)
            .then((response) => {
                setMessage(response.data.message);
                showSnackbar(response.data.message);
                onRefresh?.();
            })
            .catch((error) => {
                setMessage(error.message);
            });
    };

    return (
        <section className="flex flex-col flex-1 min-h-0 w-full h-full pb-4">
            <div className="flex-1 flex flex-col overflow-hidden bg-white shadow-md rounded-lg p-4 sm:p-6 lg:px-8 border border-gray-300">
                <h2 className="text-2xl sm:text-3xl font-semibold">Tus decisiones</h2>
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

                <div className="inline-flex bg-gray-100 my-4 p-2 text-sm sm:text-base items-center rounded-lg max-w-max">
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

                <div className="flex-1 flex flex-col overflow-y-auto rounded-lg min-h-100">
                    <table className="w-full text-sm sm:text-base custom-table" ref={tableRef}>
                        <thead className="bg-orange-500 text-black h-12 !rounded-lg">
                            <tr className="text-left">
                                <th className="px-4 sm:px-6 py-3">Título</th>
                                <th className="px-4 sm:px-6 py-3">Categoría</th>
                                <th className="px-4 sm:px-6 py-3">Fecha</th>
                                <th className="px-4 sm:px-6 py-3">Estado</th>
                                <th className="px-4 sm:px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedItems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-500 py-12">
                                        Aún no hay decisiones
                                    </td>
                                </tr>
                            ) : (
                                paginatedItems.map((decision, index) => (
                                    <tr key={index} className="hover:bg-gray-100 transition">
                                        <td className="px-4 sm:px-6 py-3">{decision.title}</td>
                                        <td className="px-4 sm:px-6 py-3">{decision.category}</td>
                                        <td className="px-4 sm:px-6 py-3 min-w-[150px]">
                                            {decision.createdAt.split('T')[0]}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 min-w-[170px]">
                                            <Chip mode={decision.status} />
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 relative">
                                            <button
                                                type="button"
                                                ref={(el) => {
                                                    refs.current[index] = el;
                                                }}
                                                className="cursor-pointer hover:bg-orange-200 rounded-lg p-2"
                                                onClick={() => handleActions(index)}>
                                                <IoEllipsisHorizontalOutline />
                                            </button>

                                            <DropDownActions
                                                ref={dropdownRef}
                                                id={decision.id}
                                                open={showActions === index}
                                                openUpward={openUpwardIndex === index}
                                                position={
                                                    showActions === index ? dropdownPosition : null
                                                }
                                                onDelete={deleteDecision}
                                                onEdit={handleEdit}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {paginatedItems.length === 0 ? (
                        ''
                    ) : (
                        <div className="flex gap-4 mx-auto justify-center items-center mt-auto py-4">
                            <button
                                className="px-4 cursor-pointer py-2 bg-gray-200 rounded disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}>
                                <BsArrowLeft />
                            </button>
                            <span className="text-gray-700">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                className="px-4 py-2 cursor-pointer bg-gray-200 rounded disabled:opacity-50"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}>
                                <BsArrowRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {editDecisionId && (
                <DecisionForm
                    onMessage={(msg, success = true) => {
                        setSnackbarMessage(msg);
                        setSnackbarSuccess(success);
                        closeModal();
                        if (onRefresh) onRefresh();
                    }}
                    isOpen={modal}
                    onClose={() => {
                        closeModal();
                        setEditDecisionId(null);
                    }}
                    decisionId={editDecisionId}
                />
            )}
        </section>
    );
}

export default DecisionsTable;
