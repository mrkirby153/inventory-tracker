import { Metadata } from "next";
import RegisterForm from "./registerComponent";

export const metadata: Metadata = {
  title: "Register",
};

export default function Register() {
  return <>
    <h1 className="mb-4 text-2xl font-bold">Register</h1>
    <RegisterForm />
  </>
}