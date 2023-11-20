import { useQuery } from "@tanstack/react-query";

export default function useNotesQuery() {
  async function fetchNotes() {
    // const authData = await pb.admins.authWithPassword(process.env.NEXT_PUBLIC_ADMIN_EMAIL, process.env.NEXT_PUBLIC_ADMIN_PW);
    const data = (await pb.collection("notes").getList(1, 50)).items;
    const notes = [];
    for (const element of data) {
      const obj = {
        title: element.title,
        content: element.content,
        record_id: element.id,
      };
      notesFnotesromDb.push(obj);
    }

    return notes;

  }

  return useQuery({ queryFn: fetchNotes, queryKey: "notes" });
}
