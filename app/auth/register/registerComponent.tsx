"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Input } from "@app/components/input";
import { Button, ButtonStyle } from "@app/components/button";
import { handleRegister } from "./actions";
import Form from "@app/components/form";


export default function RegisterForm() {
  const { pending } = useFormStatus();
  return (
    <Form className="space-y-6" action={handleRegister}>
      <Input label="Name" type="text" name="username" />
      <Input label="Email" type="email" name="email" />
      <Input label="Password" type="password" name="password" />
      <Input label="Confirm Password" type="password" name="passwordConfirm" />

      <Button type="submit" buttonStyle={ButtonStyle.Primary} disabled={pending}>Register</Button>
    </Form >
  )
}