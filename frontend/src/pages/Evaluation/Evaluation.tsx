import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProCon } from '../../types/proCon.types';
import { DecisionData } from '../../types/decision.types';

const Evaluation = () => {
    const [decision, setDecision] = useState<DecisionData | null>(null);
    const [prosCons, setProsCons] = useState<ProCon[] | null>(null);
    const { id } = useParams();
    const createdAt = decision?.createdAt.split('T')[0];
    const navigate = useNavigate();
    const [greenBar, setGreenBar] = useState<number>(0);
    const [redBar, setRedBar] = useState<number>(0);
    const [neutralBar, setNeutralBar] = useState<number>(0);

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
    return (
        <main className="2xl:p-8 w-full h-full flex flex-col">
            <h1 className="text-4xl font-semibold w-full">Evalúa la decision: {decision?.title}</h1>
            <section className="2xl:flex 2xl:flex-col w-full border rounded-lg bg-white border-gray-300 shadow-sm 2xl:p-8 2xl:mt-8 2xl:w-full 2xl:h-full">
                <h1 className="text-2xl font-semibold">Resumen de la decisión</h1>
                <ul className="mt-8 text-xl flex flex-col gap-4">
                    <li>Título: {decision?.title}</li>
                    <li>Categoría: {decision?.category}</li>
                    <li>Fecha de creación: {createdAt}</li>
                    <li>Descripción: [description]</li>
                </ul>
                <div className="w-full my-8">
                    <label className="font-medium text-xl">Notas de la evaluación</label>
                    <textarea
                        className="border w-full rounded border-gray-300 mt-2 min-h-32 p-2"
                        placeholder="Describe los resultados de tu decisión y lo que aprendiste..."></textarea>
                </div>
                <div className="w-[50%] flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-semibold">Evaluación de Resultados</h1>
                        <p className="text-gray-600">
                            Ajusta los deslizadores para indicar el porcentaje de resultados buenos,
                            malos y neutros de esta decisión. El total debe sumar 100%.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 justify-between">
                            <h1 className="text-green-700">Buenos resultados</h1>
                            <span>{greenBar}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={greenBar}
                            className="w-full text-green-400 green-bar"
                            onChange={(e) => setGreenBar(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 justify-between">
                            <h1 className="text-red-700">Malos resultados</h1>
                            <span>{redBar}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={redBar}
                            className="w-full red-bar"
                            onChange={(e) => setRedBar(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center justify-between">
                            <h1 className="text-yellow-600">Resultados neutrales</h1>
                            <span>{neutralBar}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={neutralBar}
                            className="w-full neutral-bar"
                            onChange={(e) => setNeutralBar(Number(e.target.value))}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Evaluation;
