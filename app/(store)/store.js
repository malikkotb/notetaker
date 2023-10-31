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
  // gameOver: false,
  // TODO: get notes from database
  notes: [
    {
      title: "Example Title 1",
      content: "This is the content of the first example object.",
    },
    {
      title: "Sample Title 2",
      content:
        "Here is the content for the second example object. You can customize it as needed.",
    },
    {
      title: "Title 3",
      content:
        "Content for the third example object goes here. Feel free to add more details.",
    },
    {
      title: "Custom ",
      content:
        "This is the content for the custom object title. You can modify it to suit your requirements.",
    },
    {
      title: "JavaScript Object",
      content:
        "This object contains some example content. You can use it in your JavaScript program.",
    },
  ],

  // global state updating functions
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
  // updateGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
}));

export default useMyStore;
