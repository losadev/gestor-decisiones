import NavBar from './components/Dashboard/NavBar';
import SideNavBar from './components/Dashboard/SideNavBar';
import { Outlet } from 'react-router-dom';
import { useSnackbarStore } from './store/snackbarStore';
import Snackbar from './components/SnackBar';

const Layout = () => {
    const { open, message, closeSnackbar } = useSnackbarStore();

    return (
        <div className="flex flex-col 2xl:flex-row font-inter h-full ">
            <NavBar />
            <SideNavBar />
            <main
                id="main-scroll"
                className="flex flex-1 min-h-screen w-full overflow-y-auto scroll-custom bg-gray-100">
                <Outlet />
            </main>
            <Snackbar open={open} message={message} onClose={closeSnackbar} />
        </div>
    );
};

export default Layout;
