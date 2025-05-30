import { create } from 'zustand';

interface SnackbarState {
    open: boolean;
    message: string;
    showSnackbar: (msg: string) => void;
    closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
    open: false,
    message: '',
    showSnackbar: (msg: string) => set({ open: true, message: msg }),
    closeSnackbar: () => set({ open: false, message: '' }),
}));
