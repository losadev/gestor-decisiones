import api from '../utils/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get('/me')
            .then((res) => setUser(res.data.user))
            .catch(() => {
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await api.post('/logout', {});
            setUser(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return { user, loading, logout };
};
