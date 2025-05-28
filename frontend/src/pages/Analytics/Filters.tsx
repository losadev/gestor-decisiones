import { LiaFilterSolid } from 'react-icons/lia';
import { CategoryType } from '../../types/decision.types';
import { TbWashDrycleanOff } from 'react-icons/tb';
import { MdDateRange } from 'react-icons/md';

interface FiltersProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTimeRange: string;
    setSelectedTimeRange: (range: string) => void;
}

const Filters = ({
    selectedCategory,
    setSelectedCategory,
    selectedTimeRange,
    setSelectedTimeRange,
}: FiltersProps) => {
    const categories: string[] = ['Categorías', ...Object.values(CategoryType)];

    return (
        <div className="flex items-center mt-8 pb-2 gap-2 justify-end md:justify-between">
            <button className="border flex gap-2 items-center bg-white border-gray-300 px-4 py-2 rounded md:hidden">
                <LiaFilterSolid />
                <span className="font-medium">Filtros: </span>
            </button>

            <div className="hidden md:flex">
                <div className="flex gap-2 items-center">
                    <LiaFilterSolid size={20} />
                    <span className="font-medium">Filtros: </span>
                </div>
                <div className="flex gap-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 bg-white px-2 py-2 rounded w-40 font-medium cursor-pointer hover:bg-gray-100 transition">
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="border bg-white border-gray-300 px-2 py-1 rounded w-40 cursor-pointer font-medium hover:bg-gray-100 transition">
                        <option value="Todo">Fechas</option>
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 3 meses</option>
                        <option value="180">Últimos 6 meses</option>
                        <option value="365">Último año</option>
                    </select>
                </div>
            </div>

            <button
                type="button"
                onClick={() => {
                    setSelectedCategory('Todas las categorías');
                    setSelectedTimeRange('Todo');
                }}
                className="border bg-white border-gray-300 px-4 py-2 rounded flex items-center gap-2 cursor-pointer font-medium hover:bg-gray-100 transition hover:shadow-sm">
                <TbWashDrycleanOff className="font-medium" />
                <span>Limpiar filtros</span>
            </button>
        </div>
    );
};

export default Filters;
