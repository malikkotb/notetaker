import { useState } from "react";
import pb from "../(lib)/pocketbase";

export default function useLogout() {
  const [logOut, setLogOut] = useState(0);

  function logout() {
    pb.authStore.clear();
    setLogOut(Math.random()); // change dummy state to force a re-render
  }

  return logout;
}
