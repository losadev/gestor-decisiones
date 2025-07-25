import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex flex-1 overflow-y-auto scroll-custom w-full h-full p-4">
            <Outlet />
        </div>
    );
};

export default Dashboard;
