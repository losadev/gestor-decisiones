import FormRegister from './components/Register/FormRegister';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<FormRegister />} />
                <Route path="/login" element={<FormLogin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
