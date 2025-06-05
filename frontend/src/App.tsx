import AppRouter from './AppRouter';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AppRouter />
        </ErrorBoundary>
    );
}

export default App;
