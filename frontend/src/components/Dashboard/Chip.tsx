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

const Chip = ({
    mode,
    category,
    className = '',
}: {
    mode: string;
    category?: string;
    className?: string;
}) => {
    if (mode === 'category') {
        categoryStyle.text = category || '';
        return <span className={`${categoryStyle.styles} ${className}`}>{categoryStyle.text}</span>;
    }

    const baseStyle = mode === 'evaluated' ? evaluated.styles : inProgress.styles;
    const text = mode === 'evaluated' ? 'Evaluado' : 'En progreso';
    const Icon = mode === 'evaluated' ? TiInputChecked : CgDanger;

    return (
        <span className={`inline-flex items-center gap-2 ${baseStyle} ${className}`}>
            <Icon />
            {text}
        </span>
    );
};
export default Chip;
