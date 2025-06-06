const Hero = () => {
    return (
        <section className="relative w-full">
            <div className="absolute inset-0 bg-[url('/hero-img.png')] bg-contain bg-no-repeat bg-center lg:hidden" />

            <div className="absolute inset-0 bg-black/60 lg:hidden" />

            <div className="relative flex gap-8 px-4 sm:px-16 py-24 sm:py-64 justify-center lg:py-32 xl:px-64 ">
                <div className="text-white lg:text-black flex-1 flex flex-col justify-center text-pretty lg:pl-12 ">
                    <h1 className="text-5xl font-bold sm:text-center lg:text-left">
                        Toma mejores decisiones con datos, no suposiciones
                    </h1>
                    <p className="mt-8 font-medium text-xl text-gray-300 sm:text-center lg:text-gray-500 lg:text-left">
                        Analiza, reflexiona y mejora tus elecciones
                    </p>
                </div>
                <div className="hidden lg:block flex-1">
                    <img src="/hero-img.png" alt="Hero image" height={800} width={600} />
                </div>
            </div>
        </section>
    );
};

export default Hero;
