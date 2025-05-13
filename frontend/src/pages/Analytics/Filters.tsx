import { LiaFilterSolid } from 'react-icons/lia';

const Filters = () => {
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
                        <option value="All categories">All categories</option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <select
                        name=""
                        className="border bg-white border-gray-300 px-2 py-1 rounded w-40">
                        <option value="">Todos</option>
                        <option value=""></option>
                        <option value=""></option>
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
