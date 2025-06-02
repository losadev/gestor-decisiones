import EditProfileForm from './EditProfileForm';
import { User } from '../../components/Button';

type Props = {
    user: User | null;
};

const Profile = ({ user }: Props) => {
    if (!user) return null;
    return (
        <div className="flex flex-col w-full h-full">
            <header className="py-4 ">
                <h1 className="text-2xl font-bold  sm:text-3xl">Editar perfil</h1>
            </header>
            <div className="p-4 border bg-white border-gray-300 rounded-lg flex justify-center items-center h-full w-full">
                <EditProfileForm user={user} />
            </div>
        </div>
    );
};

export default Profile;
