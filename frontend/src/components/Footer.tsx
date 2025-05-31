const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 flex flex-col items-center justify-center gap-4 pt-16 pb-4">
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
                <div className="text-xl font-semibold text-orange-400 mb-4 border-b-1 md:border-b-0 border-b-gray-500 pb-8">
                    <span>DECISION TRACKING</span>
                    <img src="/favicon.ico" alt="logo" className="h-40" />
                </div>
                <div
                    className="flex flex-col gap-4 border-b-1 border-b-gray-500 md:border-b-0 pb-8 md:border-l 
                            md:border-l-gray-500 md:pl-8">
                    <h1 className="text-xl font-semibold text-orange-400 mb-4">CONTACTO</h1>
                    <p>
                        <span>
                            📞<i>123-456-7890</i>
                        </span>
                    </p>
                    <p>
                        <span>
                            📧<i> contacto@example.com</i>
                        </span>
                    </p>
                </div>
                <div
                    className="pb-8 md:border-l 
                            md:border-l-gray-500 md:pl-8 md:border-b-none">
                    <h1 className="text-xl font-semibold text-orange-400 mb-8">REDES SOCIALES</h1>
                    <div className="flex gap-8">
                        <img
                            src="/linkedin.svg"
                            className="hover:scale-110 hover:rotate-6 duration-200 hover:duration-200 cursor-pointer"
                        />
                        <img
                            src="/instagram.svg"
                            className="hover:scale-110 hover:rotate-6 duration-200 hover:duration-200 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <p className="mt-8">Copyright &copy; {new Date().getFullYear()} | Pablo Losada Ures</p>
        </footer>
    );
};

export default Footer;
