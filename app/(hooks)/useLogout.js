import { useState } from "react";
import pb from "../(lib)/pocketbase";
import useMyStore from "../(store)/store";

export default function useLogout() {
  const [logOut, setLogOut] = useState(0);
  const { toggleAuthenticated } = useMyStore();

  async function logout() {
    toggleAuthenticated();
    pb.authStore.clear();
    setLogOut(Math.random()); // change dummy state to force a re-render

  }

  return logout;
}

