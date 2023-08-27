"use client";
import React, { createContext } from "react";
import z, { ZodTypeAny } from "zod";
import { set as ld_set } from "lodash";

interface FormErrors {
  [key: string]: string[] | undefined;
}

interface FormContext {
  errors: FormErrors;
  invocationId: string | undefined;
}

export const FormContext = createContext<FormContext | undefined>(undefined);

export interface FormProps<SchemaType extends ZodTypeAny>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  schema: SchemaType;
  onSubmit: (data: z.infer<SchemaType>) => void;
}

function translateData(data: any): any {
  let result = {};
  Object.entries(data).forEach(([key, value]) => {
    ld_set(result, key, value);
  });
  return result;
}

export default function Form<T extends ZodTypeAny>(props: FormProps<T>) {
  let { schema, onSubmit, ...rest } = props;

  let [errors, setErrors] = React.useState<FormErrors>({});
  let [invocationId, setInvocationId] = React.useState<string | undefined>(
    undefined,
  );

  const start = () => {
    setErrors({});
    const invocationId = Math.floor(Math.random() * 100000).toString();
    setInvocationId(invocationId);
  };

  const action = (data: FormData) => {
    start();
    let rawEntries = Object.fromEntries(data.entries());
    let entries = translateData(rawEntries);

    let result = schema.safeParse(Object.fromEntries(data.entries()));

    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
    } else {
      onSubmit(entries);
    }
  };

  return (
    <FormContext.Provider
      value={{ errors: errors, invocationId: invocationId }}
    >
      <form action={action} {...rest} />
    </FormContext.Provider>
  );
}
