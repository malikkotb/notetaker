import { create } from "zustand";
import pb from "../(lib)/pocketbase"
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  toggleAuthenticated: () => set((state) => ({ authenticated: !state.authenticated })),

  updateNoteTitle: (noteIndex, newTitle) => {
    set((state) => {
      const updatedNotes = [...state.notes];
      updatedNotes[noteIndex] = {
        ...updatedNotes[noteIndex],
        title: newTitle,
      };
      return { notes: updatedNotes };
    });
  },

  updateNoteContent: (noteIndex, newContent) => {
    set((state) => {
      const updatedNotes = [...state.notes];
      updatedNotes[noteIndex] = {
        ...updatedNotes[noteIndex],
        content: newContent,
      };
      return { notes: updatedNotes };
    });
  },

  updateActiveNoteTitle: (newTitle) =>
    set((state) => ({ activeNote: { ...state.activeNote, title: newTitle } })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
