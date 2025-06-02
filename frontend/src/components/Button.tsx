export interface User {
    id?: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    avatar?: string;
}

type Props = {
    text: string;
    type: 'submit' | 'reset' | 'button' | undefined;
    onClick?: () => void;
    styles?: any;
    //createUser: (user: User) => void;
};

const Button = ({ text, type, onClick, styles }: Props) => {
    return (
        <button
            style={{ ...styles }}
            type={type}
            onClick={onClick}
            className="bg-black/90 hover:bg-black/80 active:bg-amber-600 text-white rounded-lg flex grow justify-center py-2 mt-4 font-semibold cursor-pointer duration-100 hover:duration-100">
            {text}
        </button>
    );
};

export default Button;
