import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { useState } from 'react';

function ModalNavBar() {
    const [open, setOpen] = useState<boolean>(false);

    const handleModal = () => {
        setOpen((prev) => !prev);
    };
    return (
        <div
            className={`flex w-full items-center justify-end sm:hidden relative ${open ? 'bg-black/40' : ''}`}>
            <nav className="p-4  shadow-sm w-full flex justify-between border-b border-gray-300 bg-orange-500">
                <NavLink to="/login">[LOGO]</NavLink>
                <button onClick={handleModal} className={`${open ? 'hidden' : 'block'}`}>
                    <HiBars3 className="font-medium text-xl cursor-pointer" />
                </button>
            </nav>
            <nav
                className={`transition-all duration-300 ease-in-out h-screen ${
                    open
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0 pointer-events-none'
                } w-full items-end flex bg-orange-500 shadow-2xl flex-col gap-4 absolute top-0 p-4 transform`}>
                <button onClick={() => setOpen(false)} className="cursor-pointer">
                    <RxCross2 className=" text-gray-500 text-xl text-semibold hover:text-gray-700" />
                </button>
                <NavLink to="/login">Iniciar sesión</NavLink>
                <NavLink to="/register">Registrarme</NavLink>
            </nav>
        </div>
    );
}

export default ModalNavBar;
