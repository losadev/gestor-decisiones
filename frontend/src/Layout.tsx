import NavBar from './components/Dashboard/NavBar';
import SideNavBar from './components/Dashboard/SideNavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="flex flex-col 2xl:flex-row">
            <NavBar />
            <SideNavBar />
            <Outlet />
        </div>
    );
};

export default Layout;
