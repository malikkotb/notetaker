import pb from "../(lib)/pocketbase";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAcc() {
  async function createAcc({ email, password, passwordConfirm }) {
    // the data is coming from react-hook-form

    const newUser = {
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    const record = await pb.collection("users").create(newUser);

    // (optional) send an email verification request
    // await pb.collection("users").requestVerification("test@example.com");

    // setTimeout(() => {}, 2000);
  }

  return useMutation({ mutationFn: createAcc });
}
