import NavBar from './components/Dashboard/NavBar';
import SideNavBar from './components/Dashboard/SideNavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col 2xl:flex-row font-inter h-full ">
            <NavBar />
            <SideNavBar />
            <main
                id="main-scroll"
                className="flex flex-1 h-screen w-full overflow-y-auto scroll-custom ">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
