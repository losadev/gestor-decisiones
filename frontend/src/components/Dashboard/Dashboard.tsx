import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    console.log('DASHBOARD SE MONTA');

    return (
        <main className="flex flex-1 h-screen w-full bg-gray-100 overflow-y-auto scroll-custom">
            <Outlet />
        </main>
    );
};

export default Dashboard;
