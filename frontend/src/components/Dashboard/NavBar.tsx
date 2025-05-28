import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { IoMdAnalytics, IoMdSettings } from 'react-icons/io';
import { FaLightbulb, FaGitAlt } from 'react-icons/fa';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';

// Array con los links e íconos
const links = [
    { to: '/', label: 'Inicio', icon: <GoHomeFill /> },
    { to: '/dashboard/overview', label: 'Resumen', icon: <HiMiniSquares2X2 /> },
    { to: '/dashboard/decisions', label: 'Decisiones', icon: <FaGitAlt /> },
    { to: '/dashboard/analytics', label: 'Análisis', icon: <IoMdAnalytics /> },
    { to: '/dashboard/recommendations', label: 'Recomendaciones', icon: <FaLightbulb /> },
    { to: 'settings', label: 'Configuración', icon: <IoMdSettings /> },
];

// NavBar móvil con menú desplegable
const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="bg-orange-500 2xl:hidden w-full relative">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">[LOGO]</h1>
                {menuOpen ? (
                    <RxCross1
                        onClick={toggleMenu}
                        className="font-medium text-xl cursor-pointer"
                        aria-label="Toggle menu"
                    />
                ) : (
                    <HiBars3
                        onClick={toggleMenu}
                        className="font-medium text-xl cursor-pointer"
                        aria-label="Toggle menu"
                    />
                )}
            </div>

            {menuOpen && (
                <div
                    className={`flex flex-col gap-2 p-4 bg-orange-400 border-t border-orange-300 absolute top-full left-0 w-full z-50
            transition-opacity duration-200 ease-out transform
            ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                    {links.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${
                                    isActive ? 'bg-orange-300 rounded' : ''
                                }`
                            }>
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
