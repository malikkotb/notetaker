import { create } from "zustand";
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  activeCategory: null,
  sidebarVisible: true,
  totalNotes: 0,
  setTotalNotes: (numberNotes) => set({ totalNotes: numberNotes }),
  setSidebarVisible: () =>
    set((state) => ({ sidebarVisible: !state.sidebarVisible })),
  updateActiveCategory: (newActiveCategory) =>
    set({ activeCategory: newActiveCategory }),
  toggleAuthenticated: () =>
    set((state) => ({ authenticated: !state.authenticated })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
