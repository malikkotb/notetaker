import { create } from "zustand";

const useMyStore = create((set) => ({
  // global state variables
  activeNote: {
    title: "Select a Note or Create a New One",
    content: `<h2>
    Hi there,
  </h2>
  <p>
    jot down your thoughts here...
  </p>`,
  },
  gameOver: false,

  // global state updating functions
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
  // updateGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
}));

export default useMyStore;
