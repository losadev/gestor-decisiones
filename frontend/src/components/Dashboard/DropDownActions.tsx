import { forwardRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DropDownActions = forwardRef(function DropDownActions(
    {
        open,
        openUpward,
        id,
    }: {
        open: boolean;
        openUpward: boolean;
        id: string;
    },
    ref: React.Ref<HTMLDivElement>
) {
    const navigate = useNavigate();

    return (
        <div
            ref={ref}
            className={`border absolute z-10 border-gray-200 bg-white rounded-lg ${open ? 'block' : 'hidden'}`}
            style={{
                // Establece la posición dinámica del dropdown
                top: openUpward ? 'auto' : '100%',
                bottom: openUpward ? '100%' : 'auto',
                left: -36, // Asegúrate de que se alinee con el botón de acción
                width: 'fit-content', // Asegúrate de que el ancho se ajuste al contenido
            }}>
            <ul className="flex flex-col gap-2 px-4 py-2 font-medium text-sm">
                <li>

                    <button
                        onClick={() => navigate(`/dashboard/decisions/${id}`)}
                        className="hover:underline">
                    <button onClick={() => navigate(`${id}`)} className="hover:underline">
                        Ver detalles
                    </button>
                </li>
                <li>
                    <button className="flex items-center gap-2 w-full rounded group cursor-pointer">
                        <FaRegEdit />
                        <span className="group-hover:underline">Edit</span>
                    </button>
                </li>
                <li>
                    <button className="text-red-600 flex gap-2 items-center group cursor-pointer">
                        <RiDeleteBin6Line />
                        <span className="group-hover:underline">Delete</span>
                    </button>
                </li>
            </ul>
        </div>
    );
});
export default DropDownActions;
