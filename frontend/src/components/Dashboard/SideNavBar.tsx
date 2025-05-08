import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { IoMdAnalytics } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io';

const SideNavBar = () => {
    return (
        <nav className="w-60 min-h-screen  bg-orange-500 py-8 px-4 2xl:flex 2xl:flex-col hidden">
            <NavLink to="/" className="text-2xl font-bold">
                [LOGO]
            </NavLink>

            <div className="text-xl mt-16 flex flex-col gap-4 flex-1 font-medium">
                <div className="flex flex-col gap-4 flex-1">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `p-2 text-black flex gap-2 items-center hover:bg-orange-300 rounded ${isActive ? ' bg-orange-300 rounded' : ''}`
                        }>
                        <MdSpaceDashboard />
                        <span>Dashboard</span>
                    </NavLink>
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
                        <IoMdAnalytics />
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
