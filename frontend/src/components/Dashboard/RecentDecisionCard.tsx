import { PiArrowLineRightBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import Chip from './Chip';

type Props = {
    title: string;
    category: string;
    status: string;
};

export const RecentDecisionCard = ({ category, status, title }: Props) => {
    return (
        <div className="flex flex-col gap-2 p-4  border-b-amber-100">
            <div>
                <h2 className="font-semibold">{title}</h2>
                <div className="flex gap-2">
                    <Chip category={category} mode="category" />
                    <Chip category="" mode={status} />
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
