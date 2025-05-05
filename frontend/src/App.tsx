import DecisionForm from './components/Decision/DecisionForm';
import LoginForm from './components/Login/LoginForm';
import FormRegister from './components/Register/FormRegister';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './components/dashboard/Dashboard';
import Overview from './components/dashboard/Overview';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/register" element={<FormRegister />} />
                <Route path="/login" element={<LoginForm />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Overview />} />
                        <Route path="create-decision" element={<DecisionForm />} />
                        <Route path="analytics" element={<h1>Analytics</h1>} />
                        <Route path="settings" element={<h1>Settings</h1>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
