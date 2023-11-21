import pb from "../(lib)/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddNote() {
  
  const queryClient = useQueryClient();
  const addNewNote = async (data) => {
   

    const record = await pb.collection("notes").create(data);
    if (record) {
      console.log("Data loaded");
      toast.success("New note was created");
    }

    queryClient.invalidateQueries();
  };

  return useMutation({ mutationFn: addNewNote }); // returned function in component where you use this hook is called "mutate"

}
