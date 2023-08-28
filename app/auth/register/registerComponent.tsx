"use client";
import { ButtonStyle } from "@app/components/button";
import { handleRegister } from "./actions";
import Form from "@app/components/form";
import FormInput from "@app/components/form/input";
import FormButton from "@app/components/form/button";
import { registerSchema } from "@app/requests/auth";
import { useState } from "react";
import z from "zod";
import Link from "next/link";

function RegistrationComplete() {
  return (
    <div className="bg-green-200 p-2 border border-solid border-green-300 rounded-md text-green-900 mb-2">
      <h3 className="font-bold">Success!</h3>
      <p>
        Registration Complete. You can now{" "}
        <Link href="/auth/login" className="underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

interface ErrorsComponentProps {
  errors: string[];
}
function ErrorsComponent({ errors }: ErrorsComponentProps) {
  let errorComponents = errors.map((error, i) => {
    return <li key={i}>{error}</li>;
  });
  return (
    <div className="bg-red-200 p-2 border border-solid border-red-300 rounded-md text-red-900 mb-2">
      <h3 className="font-bold">Registration Failed</h3>
      <p>The following errors occurred:</p>
      <ul className="list-disc list-inside">{errorComponents}</ul>
    </div>
  );
}

export default function RegisterForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[] | null>(null);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setPasswordConfirm("");
  };

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setErrors(null);
    setSuccess(false);
    let result = await handleRegister(data);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }
    setSuccess(true);
    resetForm();
  };

  return (
    <>
      {success && <RegistrationComplete />}
      {errors ? <ErrorsComponent errors={errors} /> : null}
      <Form schema={registerSchema} onSubmit={onSubmit} className="space-y-6">
        <FormInput
          label="Name"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className="flex flex-row justify-end">
          <FormButton type="submit" buttonStyle={ButtonStyle.Primary}>
            Register
          </FormButton>
        </div>
      </Form>
    </>
  );
}
