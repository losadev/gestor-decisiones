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

function App() {
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
                                <Route index element={<Overview />} />
                                <Route path="decisions" element={<Decisions />} />
                                <Route path="decisions/:id" element={<DecisionDetails />} />
                            </Route>
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="/dashboard/evaluation/:id" element={<Evaluation />} />
                            <Route path="settings" element={<h1>Settings</h1>} />
                            <Route path="recommendations" element={<h1>Recommendations</h1>} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
