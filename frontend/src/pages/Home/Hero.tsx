const Hero = () => {
    return (
        <section className="flex gap-8 px-8 py-16 justify-center w-full md:text-center lg:text-left lg:px-16 md:py-32">
            <div className="text-pretty flex-1 flex flex-col justify-center">
                <h1 className="text-5xl font-bold">
                    Toma mejores decisiones con datos, no suposiciones
                </h1>
                <p className="mt-8 font-medium text-xl text-gray-500">
                    Analiza, reflexiona y mejora tus elecciones
                </p>
            </div>
            <div className="hidden lg:block flex-1">
                <img src="/hero-img.png" alt="Hero image" height={800} width={600} />
            </div>
        </section>
    );
};

export default Hero;
