const Footer = () => {
    return (
        <footer className="bg-black/90 text-gray-300 flex flex-col items-center justify-center gap-4 pt-16 pb-4">
            <div className="flex gap-32">
                <div className="text-xl font-semibold text-orange-400 mb-4">DECISIO</div>
                <div className="flex flex-col gap-4 border-l-1 border-l-gray-500 pl-8">
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
                <div className="border-l-1 border-gray-500 pl-8">
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
