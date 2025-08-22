import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { IoFilterSharp } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { useSnackbarStore } from '../store/snackbarStore';
import { DecisionData } from '../types/decision.types';
import Chip from '../components/Chip';
import ProsConsTable from '../components/decisionDetails/ProsConsTable';
import Snackbar from '../components/SnackBar';
import DecisionForm from '../components/DecisionForm';
import { ProCon } from '../types/proCon.types';
import { Evaluation } from '../types/evaluation.types';

const DecisionDetails = () => {
    const [decision, setDecision] = useState<DecisionData | null>(null);
    const [prosCons, setProsCons] = useState<ProCon[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
    const { id } = useParams();
    const createdAt = decision?.createdAt.split('T')[0];
    const navigate = useNavigate();
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSuccess, setSnackbarSuccess] = useState(true);
    const { showSnackbar } = useSnackbarStore();

    console.log(message);

    const [modal, setModal] = useState<boolean>(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };
    useEffect(() => {
        const main = document.getElementById('main-scroll');
        if (main) {
            main.style.overflow = modal ? 'hidden' : 'auto';
        }
    }, [modal]);

    useEffect(() => {
        const res = api.get(`/proscons/${id}`);
        res.then((response) => {
            setProsCons(response.data.prosCons);
            console.log(response.data.prosCons);
        }).catch((error) => {
            console.error('Error fetching pros and cons:', error);
        });
    }, [id]);

    const fetchDecision = () => {
        api
            .get(`/decision/${id}`)
            .then((response) => {
                const decision = response.data.decision;
                setDecision(decision);
                setIsEvaluated(decision.status === 'evaluated');
            })
            .catch((error) => {
                console.error('Error fetching decision details:', error);
            });
    };

    useEffect(() => {
        fetchDecision();
    }, [id]);

    const deleteDecision = () => {
        const res = api.delete(`/decision/${id}`);
        res.then((response) => {
            setMessage(response.data.message);
            showSnackbar(response.data.message);
        }).catch((error) => {
            setMessage(error);
            showSnackbar(error);
        });
    };

    useEffect(() => {
        api
            .get(`/evaluation/${id}`)
            .then((res) => {
                setEvaluation(res.data.data);
            })
            .catch((err) => {
                console.error('Error al obtener la evaluación:', err);
            });
    }, [id]);

    // Pros
    const pros = prosCons?.filter((item) => item.type === 'Pro') || [];
    // Contras
    const cons = prosCons?.filter((item) => item.type === 'Contra') || [];

    return (
        <div className="flex w-full h-full flex-col gap-4">
            <header className="pt-4 pb-2">
                <h1 className="text-2xl font-semibold">Detalles de la decisión</h1>
                <p className="text-gray-600">Mira y gestiona esta decisión</p>
            </header>
            <div className="bg-white 2xl:h-full border border-gray-300 shadow-sm  flex flex-col w-full rounded-lg p-4 2xl:p-8 gap-4">
                <div>
                    <h1 className="text-xl 2xl:text-4xl font-semibold">{decision?.title}</h1>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="mt-4 flex flex-col gap-2">
                        <span className="flex gap-2">
                            <Chip
                                className="text-sm"
                                category={decision?.category}
                                mode="category"
                            />
                            <Chip
                                className="text-sm"
                                mode={decision?.evaluation ? 'evaluated' : 'progress'}
                            />
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                            {createdAt ? 'Creado el ' + createdAt : 'Fecha no disponible'}
                        </span>
                    </div>
                    <div className="sm:flex justify-end gap-2 hidden">
                        {isEvaluated ? (
                            ''
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="bg-black text-white font-medium rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition duration-200 ease-in-out"
                                    onClick={() => navigate(`/dashboard/evaluation/${id}`)}>
                                    <IoMdCheckmarkCircleOutline />
                                    <span>Evaluar</span>
                                </button>
                                <button
                                    type="button"
                                    className=" font-medium rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-200 border border-gray-300 cursor-pointer transition duration-200 ease-in-out"
                                    onClick={openModal}>
                                    <BsPencilSquare />
                                    <span>Editar</span>
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            className=" font-medium rounded px-4 py-2 flex border border-red-600 items-center gap-2 hover:bg-red-100 cursor-pointer transition duration-200 ease-in-out"
                            onClick={() => {
                                deleteDecision();
                                navigate('/dashboard/overview');
                            }}>
                            <MdDelete className="text-red-600" />
                            <span className="text-red-600">Eliminar</span>
                        </button>
                    </div>
                    <div className="relative sm:hidden inline-block text-right">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify gap-2 items-center  rounded-md px-4 py-2 font-medium text-black border border-gray-300 hover:bg-gray-100"
                                onClick={() => setShowMobileMenu(!showMobileMenu)}>
                                <span>Acciones</span>{' '}
                                <IoFilterSharp className="text-xl font-medium" />
                            </button>
                        </div>

                        {showMobileMenu && (
                            <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none font-medium">
                                <div className="py-1">
                                    {isEvaluated ? (
                                        ''
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    navigate(`/dashboard/evaluation/${id}`);
                                                }}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-100">
                                                <IoMdCheckmarkCircleOutline className="inline mr-2" />
                                                Evaluar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setShowMobileMenu(false);
                                                    openModal();
                                                }}
                                                className="w-full px-4 py-2 text-left  hover:bg-gray-100">
                                                <BsPencilSquare className="inline mr-2" />
                                                Editar
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => {
                                            setShowMobileMenu(false);
                                            deleteDecision();
                                            navigate('/dashboard/overview');
                                        }}
                                        className="w-full px-4 py-2 text-left  text-red-600 hover:bg-red-100">
                                        <MdDelete className="inline mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="border-none h-[1px] bg-gray-300 my-4" />
                <div className="flex flex-col gap-4 2xl:flex-row  h-full">
                    <div className="flex gap-4 flex-col items-center text-center 2xl:flex-2 h-full 2xl:border rounded-lg 2xl:border-gray-300 2xl:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2  h-full w-full gap-4 ">
                            <ProsConsTable items={pros} title="Pros" color="green" />
                            <ProsConsTable items={cons} title="Contras" color="red" />
                        </div>
                    </div>
                    <hr className="border-none h-[1px] bg-gray-300 my-4" />

                    <div className="border flex justify-center rounded-lg p-4 border-gray-300 md:p-8 2xl:flex-1">
                        {isEvaluated ? (
                            <div className="overflow-x-auto  flex flex-col w-full">
                                <h2 className="text-xl md:text-2xl font-semibold text-center mb-4 flex justify-center gap-4">
                                    <span className="text-center">Evaluación completada</span>
                                    <FaCheckCircle className="text-green-600" size={28} />
                                </h2>
                                <table className="min-w-full table-fixed rounded-t-lg border-gray-200 rounded-lg my-auto">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="w-1/3 py-3 px-4 rounded-tl-lg bg-black text-left text-gray-100 font-semibold">
                                                Campo
                                            </th>
                                            <th className="py-3 px-4 bg-black text-left rounded-tr-lg text-gray-100 font-semibold">
                                                Valor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="py-3 px-4 font-medium text-gray-700">
                                                Resultado
                                            </td>
                                            <td className="py-3 px-4 break-words">
                                                {evaluation?.result}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium text-gray-700">
                                                Puntuación
                                            </td>
                                            <td className="py-3 px-4 break-words">
                                                {evaluation?.score}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-medium text-gray-700">
                                                Fecha
                                            </td>
                                            <td className="py-3 px-4 break-words">
                                                {evaluation?.date
                                                    ? new Date(evaluation.date).toLocaleDateString()
                                                    : 'No disponible'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="inline-flex flex-col items-center gap-8">
                                <div className=" flex flex-col gap-0 justify-center text-center">
                                    <h1 className="font-semibold  text-2xl">
                                        Evaluación pendiente
                                    </h1>
                                    <p className="text-gray-600 font-medium mt-2">
                                        Esta decisión no ha sido evaluada todavía
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <span className="my-4 flex  items-center">
                                        <HiOutlineMenuAlt3 className="rotate-90 text-7xl text-gray-400" />
                                    </span>
                                    <p className="text-gray-600 font-medium mt-2 text-center">
                                        Evalúa esta decisión para hacer seguimiento de sus
                                        resultados y obtener recomendaciones personalizadas.
                                    </p>
                                    <button
                                        type="button"
                                        className="bg-black text-white font-medium mt-4 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-800 border border-gray-300 cursor-pointer transition duration-200 ease-in-out"
                                        onClick={() => navigate(`/dashboard/evaluation/${id}`)}>
                                        <IoMdCheckmarkCircleOutline />
                                        <span>Evalúa ahora</span>
                                    </button>
                                </div>
                            </div>
                        )}
                        <DecisionForm
                            isOpen={modal}
                            onClose={closeModal}
                            onMessage={(msg: string, success = true) => {
                                setSnackbarMessage(msg);
                                setSnackbarSuccess(success);
                                fetchDecision();
                                closeModal();
                            }}
                            decisionId={id}
                        />
                    </div>
                </div>
                <Snackbar
                    message={snackbarMessage}
                    onClose={() => setSnackbarMessage('')}
                    open={!!snackbarMessage}
                    success={snackbarSuccess}
                />
            </div>
        </div>
    );
};

export default DecisionDetails;
