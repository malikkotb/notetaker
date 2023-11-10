import { create } from "zustand";
import PocketBase from "pocketbase"
const useMyStore = create((set) => ({
  activeNote: null,

  // TODO: get notes from database

  // Client-Side Data Fetching using Pocketbase:
  // notes: [], // inital notes

  fetchNotes: async () => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    // const authData = await pb.admins.authWithPassword('malikkotb@icloud.com', 'dejgy7-natFyc-juxjon');
    const data = await pb.collection("notes").getList(1, 50);
    console.log(data);
    // set({ notes: data });
  },

  //TODO: addNote write function in pocketbase 
  // addNote: (newNote) => set((state) => ({ notes: [...state.notes, newNote] })),


  notes: [
    {
      title: "Example Title",
      content: "",
    },
    {
      title: "Sample Title",
      content:
        "Here is the content for the second example object. You can customize it as needed.",
    },
    {
      title: "noteey",
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

  //TODO: add a function that updates the content and title of note and saves it in DB every 5 seconds

  updateActiveNoteTitle: (newTitle) => set((state) => ({ activeNote: { ...state.activeNote, title: newTitle } })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
