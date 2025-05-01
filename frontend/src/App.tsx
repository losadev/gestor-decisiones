import DecisionForm from './components/Decision/DecisionForm';
import LoginForm from './components/Login/LoginForm';
import FormRegister from './components/Register/FormRegister';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/register" element={<FormRegister />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/create-decision" element={<DecisionForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
