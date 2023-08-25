import React, { createContext } from "react";
import { ZodError } from "zod";

export const FormContext = createContext({});

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {

}

interface BoundaryProps {
  children: React.ReactNode
}

interface BoundaryState {
  zodErrors: any,
  otherErrors: any
}

class FormErrorBoundary<Props extends {
  children: React.ReactNode
}> extends React.Component<Props, {
  errors: any
}> {
  constructor(props: Props) {
    super(props);
    this.state = { errors: {} };
  }

  static getDerivedStateFromError(error: any) {
    if (error instanceof ZodError) {
      console.log("HANDLING ZOD ERROR");
    }
    return { errors: error };
  }

  render() {
    return <>
      <span>{JSON.stringify(this.state.errors)}</span>
      {this.props.children}
    </>
  }
}

export default function Form(props: FormProps) {
  return (<FormErrorBoundary>
    <form {...props} />
  </FormErrorBoundary>)
}