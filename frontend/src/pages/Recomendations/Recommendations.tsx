import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';

type Recommendation = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
};
//#

const Recommendations = () => {
    const [recomendations, setRecomendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecomendations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/recommendation', {
                    withCredentials: true,
                });
                setRecomendations(response.data.recommendations);
            } catch (err: any) {
                setError('Error al cargar las recomendaciones');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecomendations();
    }, []);

    if (loading) return <p>Cargando recomendaciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col h-full w-full">
            <header className="flex flex-col pt-4 pb-2 gap-2 sm:flex md:flex">
                <h1 className="text-2xl font-bold  sm:text-3xl">Recomendaciones personalizadas</h1>
                <p className="text-gray-600 font-medium mt-2">
                    Deja que nuestra Inteligencia artificial personalizada te ayude tomar mejores
                    decisiones futuras
                </p>
            </header>
            <div className=" h-full w-full mt-8 sm:border-gray-300 rounded-lg 2xl:flex 2xl:flex-row pb-4">
                {recomendations.length === 0 ? (
                    <div className="flex  h-full justify-center items-center">
                        <p className="text-center text-gray-600 font-semibold text-xl">
                            No hay recomendaciones aún.
                        </p>
                    </div>
                ) : (
                    <ul className="grid md:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-2 gap-4 pb-4">
                        {recomendations.map((rec) => (
                            <li
                                key={rec.id}
                                className="border transition bg-white p-4 hover:shadow-lg rounded border-gray-300 shadow-sm flex flex-col gap-4">
                                <h3 className="font-semibold text-xl flex flex-row justify-between items-center">
                                    <span>{rec.title}</span>
                                    <FaLightbulb color="orange" />
                                </h3>
                                <p className="flex-1">{rec.content}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Fecha: {new Date(rec.createdAt).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
