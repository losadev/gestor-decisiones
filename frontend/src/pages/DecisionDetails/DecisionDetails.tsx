import { useNavigate, useParams } from 'react-router-dom';
import { DecisionData } from '../../types/decision.types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chip } from '../../components/Dashboard/Chip';
import Button from '../../components/Button';
import { ProCon } from '../../types/proCon.types';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { response } from 'express';

const DecisionDetails = () => {
    const [decision, setDecision] = useState<DecisionData | null>(null);
    const [prosCons, setProsCons] = useState<ProCon[] | null>(null);
    const [message, setMessage] = useState<string>('');
    const { id } = useParams();
    const createdAt = decision?.createdAt.split('T')[0];
    const navigate = useNavigate();

    useEffect(() => {
        const res = axios.get(`http://localhost:5000/api/proscons/${id}`, {
            withCredentials: true,
        });
        res.then((response) => {
            setProsCons(response.data.prosCons);
            console.log(response.data.prosCons);
        }).catch((error) => {
            console.error('Error fetching pros and cons:', error);
        });
    }, [id]);

    useEffect(() => {
        const res = axios.get(`http://localhost:5000/api/decision/${id}`, {
            withCredentials: true,
        });
        res.then((response) => {
            setDecision(response.data.decision);
            console.log(response.data.decision);
        }).catch((error) => {
            console.error('Error fetching decision details:', error);
        });
    }, [id]);

    const deleteDecision = () => {
        const res = axios.delete(`http://localhost:5000/api/decision/${id}`, {
            withCredentials: true,
        });
        res.then((response) => {
            setMessage(response.data.message);
        }).catch((error) => {
            setMessage(error);
        });
    };

    // Pros
    const pros = prosCons?.filter((item) => item.type === 'Pro') || [];
    // Contras
    const cons = prosCons?.filter((item) => item.type === 'Contra') || [];

    return (
        <main className="px-4 pb-8 flex w-full  flex-col gap-4 m-8">
            <h1 className="text-4xl font-semibold">{decision?.title}</h1>
            <div className="bg-white border border-gray-300 shadow-sm h-full flex flex-col w-full rounded-lg p-8 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold">Detalles de la decisión</h1>
                    <p className="text-gray-600">Mira y gestiona esta decisión</p>
                </div>
                <div className="flex justify-between ">
                    <div className="mt-4 flex flex-col gap-2">
                        <span className="flex gap-2">
                            <Chip category={decision?.category} mode="category" />
                            <Chip mode={decision?.evaluation ? 'evaluated' : 'progress'} />
                        </span>
                        <span className="font-medium text-gray-600">
                            {createdAt ? 'Creado el ' + createdAt : 'Fecha no disponible'}
                        </span>
                    </div>
                    <div className="flex items-end gap-2">
                        <button
                            type="button"
                            className="bg-black text-white font-medium rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition duration-200 ease-in-out">
                            <IoMdCheckmarkCircleOutline />
                            <span>Evaluar</span>
                        </button>
                        <button
                            type="button"
                            className=" font-medium rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-200 border border-gray-300 cursor-pointer transition duration-200 ease-in-out">
                            <BsPencilSquare />
                            <span>Editar</span>
                        </button>
                        <button
                            type="button"
                            className=" font-medium rounded px-4 py-2 flex border border-red-600 items-center gap-2 hover:bg-red-100 cursor-pointer transition duration-200 ease-in-out"
                            onClick={() => {
                                deleteDecision();
                                navigate('/dashboard');
                            }}>
                            <MdDelete className="text-red-600" />
                            <span className="text-red-600">Eliminar</span>
                        </button>
                    </div>
                </div>
                <hr className="my-2 border-none h-[1px] bg-gray-300" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-4 justify-evenly ">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-semibold">Pros</h1>
                            <ul className="text-gray-600">
                                {pros.map((pro) =>
                                    pro.type === 'Pro' ? (
                                        <li key={pro.id}>{pro.description}</li>
                                    ) : (
                                        <li>No hay ningún pro</li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-semibold">Contras</h1>
                            <ul className="text-gray-600">
                                {cons.map((con) =>
                                    con.type === 'Contra' ? (
                                        <li key={con.id}>{con.description}</li>
                                    ) : (
                                        <li>No hay ningún contra</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="border rounded-lg border-gray-300 p-8">
                        <h1 className="font-semibold  text-2xl">Evaluación pendiente</h1>
                        <p className="text-gray-600 font-medium mt-2">
                            Esta decisión no ha sido evaluada todavía
                        </p>
                        <div className="flex flex-col items-center justify-center mt-4">
                            <span className="my-4">
                                <HiOutlineMenuAlt3 className="rotate-90 text-7xl text-gray-400" />
                            </span>
                            <p className="text-gray-600 font-medium mt-2 text-center">
                                Evalúa esta decisión para hacer seguimiento de sus resultados y
                                obtener recomendaciones personalizadas.
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
                </div>
            </div>
        </main>
    );
};

export default DecisionDetails;
