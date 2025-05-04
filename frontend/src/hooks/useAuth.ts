import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<null | any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/me', { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => {
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
};
