import { create } from "zustand";
import pb from "../(lib)/pocketbase"
const useMyStore = create((set) => ({
  activeNote: null,
  authenticated: false,
  toggleAuthenticated: () => set((state) => ({ authenticated: !state.authenticated })),
  // Client-Side Data Fetching using Pocketbase:
  // notes: [], 
  // fetchNotes: async () => {
  //   // const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_ADMIN_EMAIL, process.env.NEXT_PUBLIC_ADMIN_PW);
  //   const data = (await pb.collection("notes").getList(1, 50)).items;
  //   const notesFromDb = [];
  //   for (const element of data) {
  //     const obj = {
  //       title: element.title,
  //       content: element.content,
  //       record_id: element.id,
  //     };
  //     notesFromDb.push(obj);
  //   }
  //   set({ notes: data });
  // },

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
