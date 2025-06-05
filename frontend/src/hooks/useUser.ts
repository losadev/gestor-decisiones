// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/me', {
                credentials: 'include',
            });
            if (!res.ok) throw new Error('No autorizado');
            const data = await res.json();
            return data.user;
        },
    });
};
