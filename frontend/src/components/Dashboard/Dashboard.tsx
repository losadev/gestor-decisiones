import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <main
            id="main-scroll"
            className="flex flex-1 w-full min-h-screen bg-gray-100 px-4 overflow-y-auto scroll-custom">
            <Outlet />
        </main>
    );
};

export default Dashboard;
