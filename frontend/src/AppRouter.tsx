import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Layout from './Layout';
import FormRegister from './pages/Register';
import Home from './pages/Home';
import LoginForm from './pages/Login';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Decisions from './pages/Decisions';
import DecisionDetails from './pages/DecisionDetails';
import Analytics from './pages/Analytics';
import Recommendations from './pages/Recommendations';
import Evaluation from './pages/Evaluation';
import Profile from './pages/Profile';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/register" element={<FormRegister />} />
                <Route path="/login" element={<LoginForm />} />

                <Route element={<ProtectedRoutes />}>
                    <Route element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index path="overview" element={<Overview />} />
                            <Route path="decisions" element={<Decisions />} />
                            <Route path="decisions/:id" element={<DecisionDetails />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="evaluation/:id" element={<Evaluation />} />
                            <Route path="recommendations" element={<Recommendations />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
