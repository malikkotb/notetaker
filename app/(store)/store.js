import { create } from "zustand";

const useMyStore = create((set) => ({
  activeNote: null,

  // TODO: get notes from database
  notes: [
    {
      title: "Example Title",
      content: "This is the content of the first example object.",
    },
    {
      title: "Sample Title",
      content:
        "Here is the content for the second example object. You can customize it as needed.",
    },
    {
      title: "Title",
      content:
        "Content for the third example object goes here. Feel free to add more details.",
    },
    {
      title: "Custom note",
      content:
        "This is the content for the custom object title. You can modify it to suit your requirements.",
    },
    {
      title: "JavaScript Object",
      content:
        "This object contains some example content. You can use it in your JavaScript program.",
    },
  ],
  addNewNote: (item) => set((state) => ({ notes: [...state.notes, item] })),

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

  //TODO: add a function that updates the content AND THE TITLE and saves it in DB

  updateActiveNoteTitle: (newTitle) => set((state) => ({ activeNote: { ...state.activeNote, title: newTitle } })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
