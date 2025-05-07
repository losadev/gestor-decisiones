import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';



const NavBar = () => {
    const { user } = useAuth();

    return (
        <nav className="sm:flex border-b justify-between hidden items-center w-full bg-orange-500 border-b-gray-300 py-4 px-8 shadow-lg">
            <NavLink to="/">[LOGO]</NavLink>
            <div className="flex gap-8 items-center">
                {user ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className="bg-black text-white px-3 py-1 rounded font-medium">
                            Ir al dashboard
                        </NavLink>
                        <NavLink
                            to="/logout"
                            className="bg-orange-100 px-3 py-1 rounded font-medium hover:text-white">
                            Cerrar sesión
                        </NavLink>
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
    );
};

export default NavBar;
