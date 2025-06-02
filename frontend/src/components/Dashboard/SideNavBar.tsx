import { FaLightbulb } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { HiMiniSquares2X2 } from 'react-icons/hi2';
import { IoIosLogOut, IoMdAnalytics, IoMdSettings } from 'react-icons/io';
import { FaGitAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useAuth } from '../../hooks/useAuth';
import { FcSettings } from 'react-icons/fc';

const SideNavBar = () => {
    const { data: user, isLoading } = useUser();
    const { logout } = useAuth();
    console.log('USUARIO', user);

    return (
        <nav className="min-h-screen bg-orange-500 pt-4 pb-8 px-4 2xl:flex 2xl:flex-col hidden">
            <NavLink to="/" className="bg-orange-600 rounded">
                <img src={'/favicon.ico'} alt="logo" height={800} />
            </NavLink>

            <div className="text-xl mt-8 flex flex-col gap-4 flex-1 font-medium">
                <hr className="bg-orange-300 border-none h-[2px]" />
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex-1 gap-2 flex flex-col">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${isActive ? 'bg-orange-400' : ''}`
                            }>
                            <GoHomeFill />
                            <span>Inicio</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/overview"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 hover:bg-orange-400 rounded items-center ${isActive ? 'bg-orange-400' : ''}`
                            }>
                            <HiMiniSquares2X2 />
                            <span>Resumen</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/decisions"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 hover:bg-orange-400 items-center ${isActive ? 'bg-orange-400' : ''}`
                            }>
                            <FaGitAlt />
                            <span>Decisiones</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/analytics"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${isActive ? 'bg-orange-400' : ''}`
                            }>
                            <IoMdAnalytics />
                            <span>Análisis</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/recommendations"
                            className={({ isActive }) =>
                                `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${isActive ? 'bg-orange-400' : ''}`
                            }>
                            <FaLightbulb />
                            <span>Recomendaciones</span>
                        </NavLink>
                    </div>
                    <NavLink
                        to={'/dashboard/profile'}
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-400 rounded ${isActive ? 'bg-orange-400' : ''}`
                        }>
                        <IoMdSettings />
                        <span>Perfil</span>
                    </NavLink>
                </div>
                <hr className="bg-orange-300 border-none h-[2px]" />
                {!isLoading && user && (
                    <div className="flex items-center gap-2 mt-4  p-2 rounded">
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
                        <button onClick={logout}>
                            <IoIosLogOut size={26} className="hover:scale-125 transition" />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SideNavBar;
