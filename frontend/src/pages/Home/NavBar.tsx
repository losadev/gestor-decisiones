import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiBars3, HiMiniSquares2X2 } from 'react-icons/hi2';
import { IoMdAnalytics } from 'react-icons/io';
import { FaLightbulb, FaGitAlt } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { IoIosLogOut } from 'react-icons/io';
import { useAuth } from '../../hooks/useAuth';

const links = [
    { to: '/', label: 'Inicio', icon: <GoHomeFill /> },
    { to: '/dashboard/overview', label: 'Resumen', icon: <HiMiniSquares2X2 /> },
    { to: '/dashboard/decisions', label: 'Decisiones', icon: <FaGitAlt /> },
    { to: '/dashboard/analytics', label: 'Análisis', icon: <IoMdAnalytics /> },
    { to: '/dashboard/recommendations', label: 'Recomendaciones', icon: <FaLightbulb /> },
];

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <>
            {/* Nav para móviles */}
            <nav className="bg-orange-500 2xl:hidden w-full relative">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold">[LOGO]</h1>
                    {menuOpen ? (
                        <RxCross1
                            onClick={toggleMenu}
                            className="text-xl cursor-pointer"
                            aria-label="Toggle menu"
                        />
                    ) : (
                        <HiBars3
                            onClick={toggleMenu}
                            className="text-xl cursor-pointer"
                            aria-label="Toggle menu"
                        />
                    )}
                </div>

                {menuOpen && (
                    <div className="flex flex-col gap-2 p-4 bg-orange-400 border-t border-orange-300 absolute top-full left-0 w-full z-50">
                        {links.map(({ to, label, icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${
                                        isActive ? 'bg-orange-400' : ''
                                    }`
                                }>
                                {icon}
                                <span>{label}</span>
                            </NavLink>
                        ))}

                        {!loading && user && (
                            <div className="flex items-center gap-2 mt-4 p-2 rounded">
                                <img
                                    src={
                                        user.avatar && user.avatar.trim() !== ''
                                            ? `http://localhost:5000/uploads/${user.avatar}`
                                            : '/person.svg'
                                    }
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-black flex-1 ml-2">{user.name}</span>
                                <button onClick={handleLogout}>
                                    <IoIosLogOut size={26} className="hover:scale-125 transition" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Nav para escritorio */}
            <nav className="sm:flex hidden justify-between items-center w-full bg-orange-500 border-b border-b-gray-300 py-4 px-8 shadow-lg">
                <NavLink to="/">
                    <img src="/favicon.ico" alt="logo" height={400} />
                </NavLink>
                <div className="flex gap-8 items-center">
                    {!loading && user ? (
                        <>
                            <NavLink
                                to="/dashboard/overview"
                                className="bg-black text-white px-3 py-1 rounded font-medium">
                                Ir al panel
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="bg-orange-100 px-3 py-1 rounded font-medium hover:text-white">
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="bg-orange-100 px-3 py-1 rounded font-medium hover:text-white">
                                Iniciar sesión
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="bg-black text-white px-3 py-1 rounded font-medium">
                                Registrarme
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
