import { useState } from "react";
import pb from "../(lib)/pocketbase";
import useMyStore from "../(store)/store";
import { useRouter } from 'next/navigation'

export default function useLogout() {
  const router = useRouter();
  const [logOut, setLogOut] = useState(0);
  const { toggleAuthenticated } = useMyStore();

  async function logout() {
    toggleAuthenticated();
    pb.authStore.clear();
    setLogOut(Math.random()); // change dummy state to force a re-render
    router.push("/login");

  }

  return logout;
}

