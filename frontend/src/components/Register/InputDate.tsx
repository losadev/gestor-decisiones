import { IoIosCalendar } from 'react-icons/io';

type Props = {
    label: string;
    name: string;
    placeholder: string;
};

const InputDate = ({ label, name, placeholder }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-medium">
                {label}
            </label>
            <div className="flex items-center gap-4 text-gray-500 border border-gray-300 rounded px-3 py-2 hover:bg-amber-50 hover:text-black hover:duration-100 duration-100">
                <IoIosCalendar />
                <input type="date" name={name} placeholder={placeholder} />
            </div>
        </div>
    );
};

export default InputDate;
