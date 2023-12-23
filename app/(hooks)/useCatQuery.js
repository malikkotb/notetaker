import { useQuery } from "@tanstack/react-query";
import pb from "../(lib)/pocketbase";

export default function useCatQuery() {
  async function fetchCategories() {
    const data = (await pb.collection("categories").getList(1, 50)).items;
    const categories = [];
    for (const element of data) {
      if (element.userId === pb.authStore.model.id) {
        const obj = {
          name: element.name,
          categoryId: element.id,
        };
        categories.push(obj);
      }
    }

    return categories;
  }

  return useQuery({ queryFn: fetchCategories, queryKey: ["categories"] });
}
