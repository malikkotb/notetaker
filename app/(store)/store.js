import { create } from "zustand";
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  activeCategory: null,
  updateActiveCategory: (newActiveCategory) =>
    set({ activeCategory: newActiveCategory }),
  toggleAuthenticated: () =>
    set((state) => ({ authenticated: !state.authenticated })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
