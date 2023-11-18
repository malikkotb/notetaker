"use client";
import pb from "../app/(lib)/pocketbase";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";

export function CreateAccount() {
  // TODO: add toaster: "Account created!"

  //TODO: create useCreateAccount hook

  const { register, handleSubmit, reset } = useForm();

  async function onSubmitLogin(data) {
    mutate({ email: data.email, password: data.password });
    reset();
  }

  // async function onSubmitCreateAccount(data) {
  //   // Implement account creation logic here
  //   // You can use a different mutation function or API endpoint for creating an account
  //   // Example: createUser({ email: data.email, password: data.password });

  // }

  async function onSubmitCreateAccount() {
    // example create data
    const data = {
      username: "test_username",
      email: "test@example.com",
      emailVisibility: true,
      password: "12345678",
      passwordConfirm: "12345678"
    };

    const record = await pb.collection("users").create(data);

    // (optional) send an email verification request
    // await pb.collection("users").requestVerification("test@example.com");
    reset(); // reset form
  }

  const [isLoading, setIsLoading] = useState(false);
  return (
    <form onSubmit={handleSubmit(onSubmitCreateAccount)}>
      <div className="grid gap-2">
        {/* Additional fields for account creation, e.g., confirm password, etc. */}
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="newEmail">
            New Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            {...register("email")}
          />
          <Input
            id="password"
            placeholder="Password"
            type="password"
            disabled={isLoading}
            {...register("password")}
          />
          <Input
            id="confirmPassword"
            placeholder="Repeat password"
            type="password"
            disabled={isLoading}
            {...register("passwordConfirm")}
          />
        </div>
        {/* Display error message for account creation */}
        {/* {isError && (
          <p className="text-xs text-red-500">
            Account creation failed. Error: {error.message}
          </p>
        )} */}
        <Button disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </div>
    </form>
  );
}
