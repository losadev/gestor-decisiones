// DropDownActions.tsx también debe aceptar `ref` como prop
import { forwardRef } from 'react';

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
            <ul className="flex flex-col gap-2 px-4 py-2">
                <li>Ver detalles</li>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    );
});
export default DropDownActions;
