import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';
import { FaLightbulb } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { FaGitAlt } from 'react-icons/fa';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';

const SideNavBar = () => {
    const [dropDownMenu, setDropDownMenu] = useState<boolean>(true);

    const handleDropDownMenu = () => {
        setDropDownMenu((prev) => !prev);
    };
    return (
        <nav className=" min-h-screen  bg-orange-500 pt-4 pb-8 px-4 2xl:flex 2xl:flex-col hidden">
            <NavLink to="/" className=" bg-orange-600 rounded">
                <img src={'/favicon.ico'} alt="logo" height={800} />
            </NavLink>

            <div className="text-xl mt-8 flex flex-col gap-4 flex-1 font-medium">
                <hr className="bg-orange-300 border-none h-[2px]" />
                <div className="flex flex-col  flex-1 gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <GoHomeFill />
                        <span>Inicio</span>
                    </NavLink>
                    {/* { <button
                        onClick={handleDropDownMenu}
                        className={` flex gap-2 items-center hover:bg-orange-300 rounded p-2 cursor-pointer`}>
                        <div className="flex-1 gap-2 flex items-center ">
                            <MdSpaceDashboard />
                            <span>Panel</span>
                        </div>
                        <HiChevronDown
                            className={`text-3xl self-end transition duration-200 ${dropDownMenu ? 'rotate-180 transition duration-200' : ''}`}
                        />
                    </button>} */}
                    {/* {<div
                        className={`origin-top transition-all duration-300 ease-out bg-orange-400 ${
                            dropDownMenu
                                ? 'opacity-100 scale-y-100 max-h-40'
                                : 'opacity-0 scale-y-0 max-h-0'
                        }`}></div>} */}
                    <NavLink
                        to="/dashboard/overview"
                        className={({ isActive }) =>
                            `p-2 pl-2 text-black flex gap-2 hover:bg-orange-300 rounded items-center ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <HiMiniSquares2X2 />
                        <span>Resumen</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/decisions"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <FaGitAlt />
                        <span>Decisiones</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/analytics"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <IoMdAnalytics />
                        <span>Análisis</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/recommendations"
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
