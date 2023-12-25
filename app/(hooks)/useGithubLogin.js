import pb from "../(lib)/pocketbase";
import { useMutation } from "@tanstack/react-query";

export default function useGithubLogin() {
  async function login() {
    try {
      const authData = await pb
        .collection("users")
        .authWithOAuth2({ provider: "github" });
      console.log("authData on succcess:", authData);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  //   // after the above you can also access the auth data from the authStore
  //   console.log(pb.authStore.isValid);
  //   console.log(pb.authStore.token);
  //   console.log(pb.authStore.model.id);

  //   // "logout" the last authenticated model
  //   pb.authStore.clear();
  return useMutation({ mutationFn: login }); // returned function in component where you use this hook is called "mutate"
}
