import { Link } from 'react-router';
import RecentActivity from './RecentActivity';
import NavBar from './NavBar';

const Dashboard = () => {
    return (
        <div className="flex flex-row">
            <NavBar />
            <main>
                <header>
                    <h1>Gestor de decisiones personales</h1>
                    <Link to="/create-decision">Crear decision</Link>
                </header>
                <section>
                    <RecentActivity />
                    <div>quick stats</div>
                </section>
                <section>LISTA Y FILTRADO DE DECISIONES</section>
            </main>
        </div>
    );
};

export default Dashboard;
