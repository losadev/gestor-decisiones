import { NavLink } from 'react-router';

const NavBar = () => {
    return (
        <nav className="flex border justify-between items-center border-b-gray-300 py-4 px-8 shadow-lg">
            <NavLink to="/">[LOGO]</NavLink>
            <div className="flex gap-8 items-center">
                <NavLink
                    to="/login"
                    className="bg-orange-500 px-3 py-1 rounded font-medium hover:text-white">
                    Iniciar sesión
                </NavLink>
                <NavLink
                    to="/register"
                    className="bg-black text-white px-3 py-1 rounded font-medium">
                    Registrarme
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
