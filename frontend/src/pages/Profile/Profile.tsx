import FormRegister from '../../components/Register/FormRegister';
import { User } from '../../components/Button';

type Props = {
    user: User;
};

const Profile = ({ user }: Props) => {
    return (
        <>
            <FormRegister user={user} />
        </>
    );
};

export default Profile;
