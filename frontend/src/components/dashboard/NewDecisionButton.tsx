import { FaPlusCircle } from 'react-icons/fa';

type Props = {
    onClick?: () => void;
    isOpen?: boolean;
};

const NewDecisionButton = ({ onClick, isOpen }: Props) => {
    return (
        <button
            className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 transition duration-200 hover:bg-orange-400 active:bg-amber-600  font-semibold cursor-pointer"
            type="button"
            onClick={onClick}>
            <FaPlusCircle />
            <span>Nueva decisión</span>
        </button>
    );
};

export default NewDecisionButton;
