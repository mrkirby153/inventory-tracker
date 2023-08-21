import { getCurrentUser } from "@app/auth/helpers";
import Login from "./loginComponent";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const currentUser = await getCurrentUser(false);

  if (currentUser) {
    redirect("/");
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-md rounded border border-gray-200 px-8 py-8">
          <h1 className="mb-4 text-2xl font-bold">Login</h1>
          <Login />
        </div>
      </div>
    </>
  );
}
