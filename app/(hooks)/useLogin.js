import { useState } from "react";
import pb from "../(lib)/pocketbase";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  async function login({ email, password }) {
    // the data is coming from react-hook-form
    setIsLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      alert(e);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    // setIsLoading(false);
  }

  return { login, isLoading };
}
