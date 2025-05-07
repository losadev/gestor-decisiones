import { Link } from 'react-router-dom';

function LoginLink() {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <p className="text-gray-500">¿Ya tienes una cuenta?</p>
            <Link to="/login" className="underline">
                Iniciar sesión
            </Link>
        </div>
    );
}

export default LoginLink;
