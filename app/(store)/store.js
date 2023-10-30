import { create } from "zustand";

const useMyStore = create((set) => ({
  // global state variables
  activeNote: { title: '', content: 'hi'},
  gameOver: false,

  // global state updating functions
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
  // updateGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
}));

export default useMyStore;
