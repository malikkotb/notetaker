import pb from "../(lib)/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddTag() {
  const queryClient = useQueryClient();
  const addNewTag = async (data) => {
    const record = await pb.collection("tags").create(data);
    if (record) {
      queryClient.invalidateQueries({ queryKey: ["tags"] })
    }
  };

  return useMutation({ mutationFn: addNewTag }); // returned function in component where you use this hook is called "mutate"
}
