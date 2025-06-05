import { Link } from 'react-router-dom';

function RegisterLink() {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <p className="text-gray-500">¿No tienes una cuenta?</p>
            <Link to="/register" className="underline">
                Regístrate
            </Link>
        </div>
    );
}

export default RegisterLink;
