import { HiBars3 } from 'react-icons/hi2';
import { IoMdAnalytics } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-orange-500 2xl:hidden w-full">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold">[LOGO]</h1>
                <div>
                    <HiBars3 className="font-medium text-xl cursor-pointer" />
                </div>
                <div className=" gap-4 hidden">
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
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
