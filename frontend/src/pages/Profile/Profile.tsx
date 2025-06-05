import EditProfileForm from './EditProfileForm';
import { User } from '../../components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/me', {
                    withCredentials: true,
                });

                setUser(res.data.user);
            } catch (error: any) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    if (!user) return null;
    return (
        <div className="flex flex-col w-full h-full">
            <header className="py-4 ">
                <h1 className="text-2xl font-bold  sm:text-3xl">Editar perfil</h1>
            </header>
            <div className=" py-4 sm:py-8 bg-white border shadow-sm border-gray-300 rounded-lg flex justify-center items-center h-full w-full">
                <EditProfileForm user={user} />
            </div>
        </div>
    );
};

export default Profile;
