import Footer from '../../components/Footer';
import { AnalyticsIcon } from '../../components/Icons/AnalyticsIcon';
import { DecisionTrackingIcon } from '../../components/Icons/DecisionTracking';
import ModalNavBar from '../../modal/ModalNavBar';
import Card from './Card';
import Hero from './Hero';
import NavBar from './NavBar';
import { FcIdea } from 'react-icons/fc';

const Home = () => {
    return (
        <div className="min-h-screen w-screen">
            <NavBar />
            {/* <ModalNavBar /> */}
            <main className="w-full bg-white">
                <Hero />
                <section className="flex flex-col items-center bg-gray-50 py-16 lg:px-32 lg:py-32 2xl:p-64">
                    <h1 className="text-5xl font-semibold">Características</h1>
                    <div className="w-full flex flex-col gap-4 px-4  justify-center mt-16 md:flex-row md:gap-8 md:flex-wrap ">
                        <Card
                            text="Registro y seguimiento de decisiones"
                            icon={<DecisionTrackingIcon />}
                        />
                        <Card
                            text="Análisis visual (gráficos, puntuaciones)  "
                            icon={<AnalyticsIcon />}
                        />
                        <Card
                            text="Recomendaciones basadas en tus elecciones pasadas"
                            icon={<FcIdea size={48} />}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
