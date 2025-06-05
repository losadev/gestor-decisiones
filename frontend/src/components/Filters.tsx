import { useState } from 'react';
import { LiaFilterSolid } from 'react-icons/lia';
import { CategoryType } from '../../types/decision.types';
import { TbWashDrycleanOff } from 'react-icons/tb';

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
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const resetFilters = () => {
        setSelectedCategory('Todas las categorías');
        setSelectedTimeRange('Todo');
        setShowMobileFilters(false);
    };

    return (
        <div className="mt-8 pb-2">
            {/* para abrir el panel en mobile */}
            <div className="flex items-center justify-end md:justify-between gap-2 md:hidden">
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="border flex gap-2 items-center bg-white border-gray-300 px-4 py-2 rounded font-medium hover:bg-gray-100 transition">
                    <LiaFilterSolid />
                    <span>Filtros</span>
                </button>
            </div>

            {/* para pantallas pequeñas */}
            {showMobileFilters && (
                <div className="flex flex-col gap-4 mt-4 md:hidden">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 bg-white px-2 py-2 rounded font-medium cursor-pointer hover:bg-gray-100 transition">
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="border bg-white border-gray-300 px-2 py-2 rounded cursor-pointer font-medium hover:bg-gray-100 transition">
                        <option value="Todo">Fechas</option>
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 3 meses</option>
                        <option value="180">Últimos 6 meses</option>
                        <option value="365">Último año</option>
                    </select>

                    <button
                        type="button"
                        onClick={resetFilters}
                        className="border bg-white border-gray-300 px-4 py-2 rounded flex items-center gap-2 cursor-pointer font-medium hover:bg-gray-100 transition hover:shadow-sm">
                        <TbWashDrycleanOff />
                        <span>Limpiar filtros</span>
                    </button>
                </div>
            )}

            {/*para pantallas grandes */}
            <div className="hidden md:flex items-center gap-2">
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
                        className="border bg-white border-gray-300 px-2 py-2 rounded w-40 cursor-pointer font-medium hover:bg-gray-100 transition">
                        <option value="Todo">Fechas</option>
                        <option value="30">Últimos 30 días</option>
                        <option value="90">Últimos 3 meses</option>
                        <option value="180">Últimos 6 meses</option>
                        <option value="365">Último año</option>
                    </select>

                    <button
                        type="button"
                        onClick={resetFilters}
                        className="border bg-orange-100 border-orange-300 hover:bg-orange-200 px-4 py-2 rounded flex items-center gap-2 cursor-pointer font-medium  transition hover:shadow-sm">
                        <TbWashDrycleanOff />
                        <span>Limpiar filtros</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
