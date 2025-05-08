import { forwardRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DropDownActions = forwardRef(function DropDownActions(
    {
        open,
        openUpward,
    }: {
        open: boolean;
        openUpward: boolean;
    },
    ref: React.Ref<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            className={`border absolute right-42 ${openUpward ? 'bottom-13' : 'top-13'} w-30 z-10 border-gray-200 bg-white rounded-lg ${open ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-2 px-4 py-2 font-medium text-sm">
                <li>
                    <Link to={''} className="hover:underline">
                        Ver detalles
                    </Link>
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
