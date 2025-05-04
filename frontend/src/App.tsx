import DecisionForm from './components/Decision/DecisionForm';
import LoginForm from './components/Login/LoginForm';
import FormRegister from './components/Register/FormRegister';
import { BrowserRouter, Route, Routes } from 'react-router';
import ProtectedRoutes from './utils/ProtectedRoutes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<FormRegister />} />
                <Route path="/login" element={<LoginForm />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/create-decision" element={<DecisionForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
