import { NavLink } from 'react-router';

type Props = {};

const Home = (props: Props) => {
    return (
        <nav>
            <NavLink to={'/'} className={({ isActive }) => (isActive ? 'bg-amber-300' : '')} />
        </nav>
    );
};

export default Home;
