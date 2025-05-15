import { CgDanger } from 'react-icons/cg';
import { TiInputChecked } from 'react-icons/ti';

const evaluated = {
    styles: 'rounded-xl border text-green-200 bg-green-800 px-2 font-medium',
    text: 'Evaluado',
};
const inProgress = {
    styles: 'rounded-xl border text-black bg-orange-200 border-orange-50 px-2 font-medium',
    text: 'En progreso',
};
const categoryStyle = {
    styles: 'rounded-xl border px-2 border-gray-300 bg-gray-200 text-gray-500  font-medium',
    text: '',
};

export const Chip = ({ mode, category }: { mode: string; category?: string }) => {
    if (mode === 'category') {
        categoryStyle.text = category || '';
        return <span className={`${categoryStyle.styles}`}>{categoryStyle.text}</span>;
    }
    return (
        <span
            className={`inline-flex items-center gap-2 font-medium ${mode === 'evaluated' ? evaluated.styles : inProgress.styles}`}>
            {mode === 'evaluated' ? <TiInputChecked /> : <CgDanger />}
            {mode === 'evaluated' ? 'Evaluado' : 'En progreso'}
        </span>
    );
};
