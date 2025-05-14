import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <main
            id="main-scroll"
            className="flex flex-1 h-screen w-full bg-gray-100 overflow-y-auto scroll-custom ">
            <Outlet />
        </main>
    );
};

export default Dashboard;
