import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { IoMdAnalytics } from 'react-icons/io';
import { FaLightbulb, FaGitAlt } from 'react-icons/fa';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { GoHomeFill } from 'react-icons/go';
import { RxCross1 } from 'react-icons/rx';
import { IoIosLogOut } from 'react-icons/io';
import { useUser } from '../../hooks/useUser';
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
    const navigate = useNavigate();
    const { data: user, isLoading } = useUser();
    const { logout } = useAuth();

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="bg-orange-500 2xl:hidden w-full relative">
            <div className="flex items-center justify-between p-4">
                <button onClick={() => navigate('/')}>
                    <img src="/logo-good.png" alt="" className="h-10" />
                </button>
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
                                `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${
                                    isActive ? 'bg-orange-400 rounded' : ''
                                }`
                            }>
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}

                    {!isLoading && user && (
                        <div
                            className="
                          flex items-center gap-2 mt-4 p-2 rounded
                         
                        ">
                            <img
                                src={
                                    user.avatar && user.avatar.trim() !== ''
                                        ? `http://localhost:5000/uploads/${user.avatar}`
                                        : '/person.svg'
                                }
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <span className="text-black flex-1 sm:flex-0 ml-2">{user.name}</span>
                            <button onClick={logout} className="cursor-pointer ml-2">
                                <IoIosLogOut size={26} className="hover:scale-125 transition" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
