// stores/decisionStore.ts
import { create } from 'zustand';

interface DecisionState {
    refreshTrigger: number;
    triggerRefresh: () => void;
}

export const useDecisionStore = create<DecisionState>((set) => ({
    refreshTrigger: 0,
    triggerRefresh: () => set((state) => ({ refreshTrigger: state.refreshTrigger + 1 })),
}));
