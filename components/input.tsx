import React from "react";
import { classes, conditionallyAddClass } from "@app/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | null;
  name: string;
  error?: string | undefined | null;
}

export function Input({ label, name, error, ...rest }: InputProps) {
  const inputClasses = classes(
    "w-full rounded border",
    conditionallyAddClass(
      error != undefined || error != null,
      "border-red-500",
      "border-gray-500",
    ),
    "px-2 py-1 text-lg disabled:bg-gray-200",
  );

  return (
    <>
      <div>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="mt-1">
          <input className={inputClasses} name={name} {...rest} />
          {error && <div className="pt-1 text-red-700 ">{error}</div>}
        </div>
      </div>
    </>
  );
}
