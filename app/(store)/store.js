import { create } from "zustand";
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  toggleAuthenticated: () =>
    set((state) => ({ authenticated: !state.authenticated })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
