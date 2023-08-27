"use client";
import Button, { ButtonStyle } from "@app/components/button";
import { handleRegister } from "./actions";
import Form from "@app/components/form";
import FormInput from "@app/components/form/input";
import FormButton from "@app/components/form/button";
import { registerSchema } from "@app/requests/auth";

export default function RegisterForm() {
  return (
    <Form
      schema={registerSchema}
      onSubmit={handleRegister}
      className="space-y-6"
    >
      <FormInput label="Name" type="text" name="username" />
      <FormInput label="Email" type="email" name="email" />
      <FormInput label="Password" type="password" name="password" />
      <FormInput
        label="Confirm Password"
        type="password"
        name="passwordConfirm"
      />
      <FormButton type="submit" buttonStyle={ButtonStyle.Primary}>
        Register
      </FormButton>
    </Form>
  );
}
