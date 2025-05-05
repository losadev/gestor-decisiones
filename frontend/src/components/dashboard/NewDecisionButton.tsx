import { FaPlusCircle } from 'react-icons/fa';

const NewDecisionButton = () => {
    return (
        <button className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2">
            <FaPlusCircle />
            <span>Nueva decisión</span>
        </button>
    );
};

export default NewDecisionButton;
