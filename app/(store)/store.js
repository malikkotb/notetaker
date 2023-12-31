import { create } from "zustand";
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  activeCategory: null,
  sidebarVisible: false,
  totalNotes: 0,
  catSidebarVisible: true,
  showEditor: false,
  setShowEditor: () => set((state) => ({ showEditor: !state.showEditor })),
  setCatSidebarVisible: (newVisibilty) =>
    set({ catSidebarVisible: newVisibilty }),
  setTotalNotes: (numberNotes) => set({ totalNotes: numberNotes }),
  setSidebarVisible: (newVisibilty) => set({ sidebarVisible: newVisibilty }),
  updateActiveCategory: (newActiveCategory) =>
    set({ activeCategory: newActiveCategory }),
  toggleAuthenticated: () =>
    set((state) => ({ authenticated: !state.authenticated })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
