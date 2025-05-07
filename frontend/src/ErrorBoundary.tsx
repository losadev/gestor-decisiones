import { ReactNode, Component, ErrorInfo } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

// Esto crea un componente de React que va  a tener unas props e internamente (ErrorBoundaryProps) va a tener un estado (ErrorBoundaryState)
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    // Si hay un error en la UI cambio el estado a true
    static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    // Indica si hubo un error y si lo reconocimos
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error', error);
        console.error('ErrorInfo', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold">Algo salió mal</h1>
                    <p className="mt-4 text-lg">Por favor, recarga la página.</p>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
