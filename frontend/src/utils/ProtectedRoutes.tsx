import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const spinnerStyle: React.CSSProperties = {
    border: '4px solid rgba(255, 165, 0, 0.3)', // naranja claro transparente
    borderTop: '4px solid orange', // naranja sólido
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    margin: 'auto',
    marginTop: '100px',
};

const ProtectedRoutes = () => {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <div className="h-full w-full justify-center items-center">
                <div style={spinnerStyle} />
                <style>
                    {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
                </style>
            </div>
        );

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
