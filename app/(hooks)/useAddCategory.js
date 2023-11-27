// import pb from "../(lib)/pocketbase";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export default function useAddNote() {
//   const queryClient = useQueryClient();
//   const addNewCategory = async (data) => {
//     const record = await pb.collection("categories").create(data);
//     if (record) {
//       console.log("Categories loaded");
//       queryClient.invalidateQueries({ queryKey: ["categories"] })
//     }
//   };

//   return useMutation({ mutationFn: addNewCategory }); // returned function in component where you use this hook is called "mutate"
// }
