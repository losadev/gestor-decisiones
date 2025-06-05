import { ReactNode } from 'react';

type Props = {
    text: string;
    icon: ReactNode;
};

const Card = ({ text, icon }: Props) => {
    return (
        <div className="flex flex-col border-orange-100 border-1 shadow-lg items-center px-8 justify-center gap-8 text-center text-2xl rounded-lg h-[15em] md:w-[12em] bg-white font-medium hover:shadow-2xl hover:scale-110 hover:duration-200 duration-200 cursor-pointer">
            <span>{icon}</span>
            <span>{text}</span>
        </div>
    );
};

export default Card;
