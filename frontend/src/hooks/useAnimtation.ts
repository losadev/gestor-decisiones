import { useEffect } from 'react';

export const useAnimation = (
    setPorcentage: React.Dispatch<React.SetStateAction<number>>,
    number: number
) => {
    useEffect(() => {
        const interval = setInterval(() => {
            setPorcentage((prev) => {
                if (prev >= number) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(interval); // Limpieza por si se desmonta el componente
    }, []);
};
