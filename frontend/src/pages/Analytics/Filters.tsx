import { LiaFilterSolid } from 'react-icons/lia';
import { CategoryType } from '../../types/decision.types';

const Filters = () => {
    const categories: string[] = Object.values(CategoryType);

    return (
        <div className="flex justify-between mt-8 ">
            <div className="flex gap-2">
                <div className="flex gap-2 items-center">
                    <LiaFilterSolid size={20} />
                    <span className="font-medium">Filtros: </span>
                </div>
                <div className="flex gap-4">
                    <select
                        name=""
                        className="border border-gray-300 bg-white px-2 py-2 rounded w-40">
                        <option defaultChecked>Todas las categorías</option>
                        {categories.map((c) => (
                            <option value={c}>{c}</option>
                        ))}
                    </select>
                    <select
                        name=""
                        className="border bg-white border-gray-300 px-2 py-1 rounded w-40">
                        <option value="">Todo</option>
                        <option value="">Últimos 30 días</option>
                        <option value="">Últimos 3 meses</option>
                        <option value="">Últimos 6 meses</option>
                        <option value="">Último año</option>
                    </select>
                </div>
            </div>
            <button type="button" className="border bg-white border-gray-300 px-4 py-2 rounded">
                Reset filters
            </button>
        </div>
    );
};

export default Filters;
