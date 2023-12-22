import { useState } from "react";
import pb from "../(lib)/pocketbase";
import useMyStore from "../(store)/store";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const [logOut, setLogOut] = useState(0);
  const { toggleAuthenticated, updateActiveNote, updateActiveCategory } =
    useMyStore();
  const router = useRouter();

  async function logout() {
    updateActiveNote(null);
    updateActiveCategory(null);
    toggleAuthenticated();
    pb.authStore.clear();
    router.push("/");
    setLogOut(Math.random()); // change dummy state to force a re-render
  }

  return logout;
}
