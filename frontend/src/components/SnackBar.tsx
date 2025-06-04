import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    open: boolean;
    message: string;
    success: boolean;
    onClose: () => void;
}

export default function Snackbar({ open, message, success, onClose }: Props) {
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(open);

    useEffect(() => {
        if (open) {
            setShouldRender(true);
            // Aparece
            setVisible(true);
            // Cierra después de 3s
            const timer = setTimeout(() => {
                setVisible(false); // inicia fade out
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            // Si se cierra externamente
            setVisible(false);
        }
    }, [open]);

    // Cuando termina la animación de salida, desmontar y llamar onClose
    const handleTransitionEnd = () => {
        if (!visible) {
            setShouldRender(false);
            onClose();
        }
    };

    if (!shouldRender) return null;

    const portalRoot = document.getElementById('snackbar-root');
    if (!portalRoot) return null;

    return createPortal(
        <div
            onTransitionEnd={handleTransitionEnd}
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: success ? '#4CAF50' : '#F44336',
                color: '#fff',
                padding: '12px 12px',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: 9999,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s ease',
                display: 'inline-flex',
            }}>
            {message}
        </div>,
        portalRoot
    );
}
