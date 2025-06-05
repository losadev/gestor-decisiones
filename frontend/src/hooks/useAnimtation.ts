import { useEffect } from 'react';

export const useAnimation = (
    number: number,
    setPercentage: React.Dispatch<React.SetStateAction<number>>
) => {
    useEffect(() => {
        setPercentage(0);

        const interval = setInterval(() => {
            setPercentage((prev) => {
                if (prev >= number) {
                    clearInterval(interval);
                    return number;
                }
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(interval);
    }, [number]);
};
