// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await api.get('/me');
            return res.data.user;
        },
    });
};
