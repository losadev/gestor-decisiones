import { Outlet } from 'react-router-dom';
import Snackbar from './components/SnackBar';
import { useSnackbarStore } from './store/snackbarStore';
import SideNavBar from './components/SideNavBar';
import NavBar from './components/NavBar';

const Layout = () => {
    const { open, message, closeSnackbar } = useSnackbarStore();

    return (
        <div className="flex flex-col 2xl:flex-row font-inter h-screen">
            <NavBar />
            <SideNavBar />
            <main
                id="main-scroll"
                className="flex flex-1 w-full overflow-y-auto bg-gray-100 scroll-custom">
                <Outlet />
            </main>
            <Snackbar open={open} message={message} success={true} onClose={closeSnackbar} />
        </div>
    );
};

export default Layout;

