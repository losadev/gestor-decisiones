import { CgDanger } from 'react-icons/cg';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const evaluated = {
    styles: 'rounded-xl border text-green-200 bg-green-800 px-2',
    text: 'Evaluado',
};
const inProgress = { styles: 'rounded-xl border text-orange-500 px-2', text: 'En progreso' };
const categoryStyle = { styles: 'rounded-xl border text-blue-200 bg-blue-800 px-2', text: '' };

export const Chip = ({ mode, category }: { mode: string; category?: string }) => {
    if (mode === 'category') {
        categoryStyle.text = category || '';
        return <span className={`${categoryStyle.styles}`}>{categoryStyle.text}</span>;
    }
    return (
        <span
            className={`flex items-center gap-2 text-sm ${mode === 'evaluated' ? evaluated.styles : inProgress.styles}`}>
            {mode === 'evaluated' ? <IoMdCheckmarkCircleOutline /> : <CgDanger />}
            {mode === 'evaluated' ? 'Evaluado' : 'En progreso'}
        </span>
    );
};
