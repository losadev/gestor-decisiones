import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/me', { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => {
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return { user, loading, logout };
};
