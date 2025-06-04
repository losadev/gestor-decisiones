// stores/decisionStore.ts
import { create } from 'zustand';

export const useDecisionStore = create((set) => ({
    refreshTrigger: 0,
    triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
