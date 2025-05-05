import { PiArrowLineRightBold } from 'react-icons/pi';
import { CgDanger } from 'react-icons/cg';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { Link } from 'react-router';

type Props = {
    title: string;
    category: string;
    status: string;
};

export const RecentDecisionCard = ({ category, status, title }: Props) => {
    const evaluated = {
        styles: 'rounded-xl border text-green-200 bg-green-800 px-2',
        text: 'Evaluado',
    };
    const inProgress = { styles: 'rounded-xl border text-orange-500 px-2', text: 'En progreso' };
    const categoryStyle = { styles: 'rounded-xl border text-blue-200 bg-blue-800 px-2', text: '' };

    const Chip = ({ mode }: { mode: string }) => {
        if (mode === 'category') {
            categoryStyle.text = category;
            return <span className={`${categoryStyle.styles}`}>{categoryStyle.text}</span>;
        }
        return (
            <span className={`chip ${mode === 'evaluated' ? evaluated.styles : inProgress.styles}`}>
                {mode === 'evaluated' ? <IoMdCheckmarkCircleOutline /> : <CgDanger />}
                {mode === 'evaluated' ? 'Evaluado' : 'En progreso'}
            </span>
        );
    };

    return (
        <div className="flex flex-col gap-2 p-4  border-b-amber-100">
            <div>
                <h2 className="font-semibold">{title}</h2>
                <div className="flex gap-2">
                    <Chip mode="category" />
                    <Chip mode={status} />
                </div>
            </div>
            <div>
                <Link to="/decision/1" className="text-blue-500 hover:underline">
                    <PiArrowLineRightBold />
                </Link>
            </div>
        </div>
    );
};
