import { forwardRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface DropDownActionsProps {
    open: boolean;
    position: { top: number; left: number } | null;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    id: string;
    openUpward: boolean;
}

const DropDownActions = forwardRef<HTMLDivElement, DropDownActionsProps>(
    ({ open, position, onDelete, id, openUpward, onEdit }, ref) => {
        const navigate = useNavigate();

        if (!open || !position) return null;

        return (
            <div
                ref={ref}
                className="border absolute z-50 border-gray-200 bg-white rounded-lg shadow-lg"
                style={{
                    position: 'fixed',
                    top: position.top,
                    left: position.left,
                    width: 'fit-content',
                    transformOrigin: openUpward ? 'bottom left' : 'top left',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                <ul className="flex flex-col gap-2 px-4 py-2 font-medium text-sm">
                    <li>
                        <button
                            onClick={() => navigate(`/dashboard/decisions/${id}`)}
                            className="hover:underline">
                            Ver detalles
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex items-center gap-2 w-full rounded group cursor-pointer"
                            onClick={() => onEdit(id)}>
                            <FaRegEdit />
                            <span className="group-hover:underline">Edit</span>
                        </button>
                    </li>
                    <li>
                        <button
                            className="text-red-600 flex gap-2 items-center group cursor-pointer"
                            onClick={() => onDelete(id)}>
                            <RiDeleteBin6Line />
                            <span className="group-hover:underline">Delete</span>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
);

export default DropDownActions;
