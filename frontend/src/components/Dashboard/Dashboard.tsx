import { Outlet } from 'react-router';
import NavBar from './NavBar';

const Dashboard = () => {
    return (
        <div className="flex flex-row flex-1">
            <NavBar />
            <main className="flex flex-1 h-screen bg-gray-100 overflow-y-auto scroll-custom">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
