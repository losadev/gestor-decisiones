import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';
import { FaLightbulb } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { FaGitAlt } from 'react-icons/fa';
import { HiMiniSquares2X2 } from 'react-icons/hi2';

const SideNavBar = () => {
    const [dropDownMenu, setDropDownMenu] = useState<boolean>(true);

    const handleDropDownMenu = () => {
        setDropDownMenu((prev) => !prev);
    };
    return (
        <nav className="w-60 min-h-screen  bg-orange-500 pt-4 pb-8 px-4 2xl:flex 2xl:flex-col hidden">
            <NavLink to="/" className="text-2xl font-bold bg-orange-600 py-8 px-4 rounded">
                [LOGO]
            </NavLink>

            <div className="text-xl mt-8 flex flex-col gap-4 flex-1 font-medium">
                <hr className="bg-orange-300 border-none h-[2px]" />
                <div className="flex flex-col  flex-1">
                    <button
                        onClick={handleDropDownMenu}
                        className={`${dropDownMenu ? 'bg-orange-300 rounded-b-none' : ''} flex gap-2 items-center hover:bg-orange-300 rounded p-2 cursor-pointer`}>
                        <MdSpaceDashboard />
                        <span>Dashboard</span>
                        <HiChevronDown
                            className={`text-3xl grow self-end transition duration-200 ${dropDownMenu ? 'rotate-180 transition duration-200' : ''}`}
                        />
                    </button>
                    <div
                        className={`origin-top transition-all duration-300 ease-out bg-orange-400 ${
                            dropDownMenu
                                ? 'opacity-100 scale-y-100 max-h-40 pl-4'
                                : 'opacity-0 scale-y-0 max-h-0'
                        }`}>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center ${isActive ? ' underline' : ''}`
                            }>
                            <HiMiniSquares2X2 />
                            <span>Resumen</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/decisions"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center ${isActive ? ' underline' : ''}`
                            }>
                            <FaGitAlt />
                            <span>Decisiones</span>
                        </NavLink>
                    </div>
                    <NavLink
                        to="analytics"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <IoMdAnalytics />
                        <span>Análisis</span>
                    </NavLink>
                    <NavLink
                        to="recommendations"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <FaLightbulb />
                        <span>Recomendaciones</span>
                    </NavLink>
                </div>
                <NavLink
                    to="settings"
                    className={({ isActive }) =>
                        `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                    }>
                    <IoMdSettings />
                    <span>Configuración</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default SideNavBar;
