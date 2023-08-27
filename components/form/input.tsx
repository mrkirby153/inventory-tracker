"use client";
import { forwardRef, useContext, useState } from "react";
import { FormContext } from ".";
import invariant from "invariant";
import { Input } from "../input";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  name: string;
}

const FormInput = (props: FormInputProps) => {
  let { label, ...rest } = props;
  let name = rest.name;
  const context = useContext(FormContext);
  let { pending } = useFormStatus();
  let [ignoredId, setIgnored] = useState<string | undefined>(undefined);

  invariant(context, "FormInput must be used inside a Form component");

  let errors =
    ignoredId != context.invocationId ? context.errors[name]?.join(", ") : null;

  return (
    <Input
      {...rest}
      onChange={(e) => {
        setIgnored(context.invocationId);
        rest.onChange?.(e);
      }}
      label={label || null}
      error={errors}
      name={name}
      disabled={pending || rest.disabled}
    ></Input>
  );
};
FormInput.displayName = "FormInput";

export default FormInput;
