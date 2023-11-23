import pb from "../(lib)/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useMyStore from "../(store)/store";

export default function useUpdateNote() {
  const { activeNote } = useMyStore();
  const queryClient = useQueryClient();
  const updateNote = async (data) => {
    if (data.title.trim() === "") {
      data.title = "Untitled";
    }

    const record = await pb
      .collection("notes")
      .update(activeNote.record_id, data);
    if (record) {
      console.log("Data updated");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  };

  return useMutation({ mutationFn: updateNote }); // returned function in component where you use this hook is called "mutate"
}
