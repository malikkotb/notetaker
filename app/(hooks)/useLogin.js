import pb from "../(lib)/pocketbase";
import { useMutation } from "@tanstack/react-query";
// useMutation hook takes in mutationFn as 1st argument
// mutationFn is the function that we call to post a request to the server
// useMutation hook returns things we can use such as: isLoading, isidle, isError, data
// NEED to pass in an asynchronous function to the mutationFn it will automatically detect the loading state

// useMutation will also wrap try and catch bocks around our mutationFn automatically (so no need to do that manully in our code)

export default function useLogin() {
  async function login({ email, password }) {
    // the data is coming from react-hook-form
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  }

  return useMutation({mutationFn: login}); // returned function in component where you use this hook is called "mutate"
}
