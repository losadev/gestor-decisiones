import LoginForm from './components/Login/LoginForm';
import FormRegister from './components/Register/FormRegister';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './components/Dashboard/Dashboard';
import Overview from './components/Dashboard/Overview';
import ErrorBoundary from './ErrorBoundary';
import Layout from './Layout';
import Decisions from './components/Dashboard/Decisions';
import DecisionDetails from './pages/DecisionDetails/DecisionDetails';
import Analytics from './pages/Analytics/Analytics';
import Evaluation from './pages/Evaluation/Evaluation';
import Profile from './pages/Profile/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './components/Button'; // o donde tengas el tipo definido
import Recommendations from './pages/Recomendations/Recommendations';

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/me', {
                    withCredentials: true,
                });
                setUser(res.data.user);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <ErrorBoundary>
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
                                <Route path="profile" element={<Profile user={user} />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
