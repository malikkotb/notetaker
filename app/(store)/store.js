import { create } from "zustand";
import PocketBase from "pocketbase";
const useMyStore = create((set) => ({
  activeNote: null,

  // Client-Side Data Fetching using Pocketbase:
  notes: [], // initial notes

  // this is called once on Mount
  fetchNotes: async () => {
    const pb = new PocketBase("http://127.0.0.1:8090");
    // const authData = await pb.admins.authWithPassword(process.env.ADMIN_EMAIL, process.env.ADMIN_PW);
    const data = (await pb.collection("notes").getList(1, 50)).items;
    const notesFromDb = [];
    for (const element of data) {
      const obj = {
        title: element.title,
        content: element.content,
        record_id: element.id,
      };
      notesFromDb.push(obj);
    }

    set({ notes: data });
  },

  // TODO: addNote write function in pocketbase
  // TODO: adter adding a note, fetchNotes again!
  // TODO: after updating a note, call fetchNotes again!

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

  updateActiveNoteTitle: (newTitle) =>
    set((state) => ({ activeNote: { ...state.activeNote, title: newTitle } })),
  updateActiveNote: (newActiveNote) => set({ activeNote: newActiveNote }),
}));

export default useMyStore;
