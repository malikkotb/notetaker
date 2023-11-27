// import { useQuery } from "@tanstack/react-query";
// import pb from "../(lib)/pocketbase";

// export default function useNotesQuery() {
//   async function fetchNotes() {
//     const data = (await pb.collection("categories").getList(1, 50)).items;
//     const notes = [];
//     for (const element of data) {
//       if (element.userId === pb.authStore.model.id) {
//         const obj = {
//           title: element.title,
//           content: element.content,
//           record_id: element.id,
//         };
//         notes.push(obj);
//       }
//     }

//     return notes;
//   }

//   return useQuery({ queryFn: fetchNotes, queryKey: ["categories"] });
// }
