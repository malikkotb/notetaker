import { create } from "zustand";

const useMyStore = create((set) => ({
  // global state variables
  activeNote: null,
  // gameOver: false,

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
  // updateNotes: (note) => set({}),// add a new note with example title and content)
  updateNotes: (item) => set((state) => ({ notes: [...state.notes, item] })),


  //TODO: add a function that updates the content AND THE TITLE and saves it in DB

  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
  // updateGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
}));

export default useMyStore;
