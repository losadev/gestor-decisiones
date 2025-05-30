import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    open: boolean;
    message: string;
    success: boolean;
    onClose: () => void;
}

export default function Snackbar({ open, message, success, onClose }: Props) {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [open, onClose]);

    if (!open) return null;

    const portalRoot = document.getElementById('snackbar-root');
    if (!portalRoot) return null;

    return createPortal(
        <div
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: success ? '#4CAF50' : '#F44336',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: 9999,
                transition: 'all',
            }}>
            {message}
        </div>,
        portalRoot
    );
}
