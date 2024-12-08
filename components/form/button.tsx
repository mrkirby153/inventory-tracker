"use client";
import { forwardRef } from "react";
import Button, { ButtonProps } from "../button";
import { useFormStatus } from "react-dom";

const FormButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  let { pending } = useFormStatus();
  return <Button {...props} ref={ref} disabled={pending || props.disabled} />;
});
FormButton.displayName = "FormButton";

export default FormButton;
