import { useQuery } from "@tanstack/react-query";
import pb from "../(lib)/pocketbase";
import useMyStore from "@/app/(store)/store";

export default function useNotesQuery() {
  const { activeCategory } = useMyStore();
  const enableQuery = activeCategory !== null;
  async function fetchNotes() {
    const data = (await pb.collection("notes").getList(1, 50)).items;
    const notes = [];
    for (const element of data) {
      if (element.userId === pb.authStore.model.id) {
        const obj = {
          title: element.title,
          content: element.content,
          record_id: element.id,
          categoryId: element.category,
        };
        notes.push(obj);
      }
    }

    return notes;
  }

  return useQuery({ queryFn: fetchNotes, queryKey: ["notes"], enabled: enableQuery });
}
