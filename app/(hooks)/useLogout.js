import { useState } from "react";
import pb from "../(lib)/pocketbase";
import useMyStore from "../(store)/store";

export default function useLogout() {
  const [logOut, setLogOut] = useState(0);
  const { toggleAuthenticated } = useMyStore();

  function logout() {
    pb.authStore.clear();
    toggleAuthenticated();
    setLogOut(Math.random()); // change dummy state to force a re-render
  }

  return logout;
}
