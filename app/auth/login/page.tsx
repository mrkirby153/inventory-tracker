import { getCurrentUser, optionallyGetCurrentUser } from "@app/auth/helpers";
import Login from "./loginComponent";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const currentUser = await optionallyGetCurrentUser();

  if (currentUser) {
    redirect("/");
  }

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Log In</h1>
      <Login />
      <span className="mt-2 block hover:underline">
        <a href="/auth/register" className="text-blue-500">
          Register
        </a>
      </span>
    </>
  );
}
