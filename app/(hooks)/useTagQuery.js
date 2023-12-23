import { useQuery } from "@tanstack/react-query";
import pb from "../(lib)/pocketbase";

export default function useCatQuery() {
  async function fetchTags() {
    const data = (await pb.collection("tags").getList(1, 50)).items;
    const tags = [];
    for (const element of data) {
      if (element.userId === pb.authStore.model.id) {
        const obj = {
          name: element.name,
          tagId: element.id,
        };
        tags.push(obj);
      }
    }

    return tags;
  }

  return useQuery({ queryFn: fetchTags, queryKey: ["tags"] });
}
