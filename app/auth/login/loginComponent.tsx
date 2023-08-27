"use client";

import Button, { ButtonStyle } from "@app/components/button";
import { Input } from "@app/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

function getError(errors: any, name: string) {
  if (errors.fieldErrors) {
    if (errors.fieldErrors[name]) {
      return errors.fieldErrors[name].join(", ");
    }
  }
  return null;
}

export default function Login() {
  const router = useRouter();
  let [errors, setErrors] = useState<any>({});
  let [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    let resp = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (resp.status != 200) {
      setErrors(await resp.json());
      return;
    } else {
      let params = new URLSearchParams(location.search);
      let redirectPath = params.get("prev") || "/";
      let redirectUrl = new URL(redirectPath, location.origin);
      router.push(redirectUrl.toString());
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          name="email"
          disabled={loading}
          error={getError(errors, "email")}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          disabled={loading}
          error={getError(errors, "password")}
        />
        <Button
          type="submit"
          buttonStyle={ButtonStyle.Primary}
          disabled={loading}
        >
          Login
        </Button>
      </form>
    </>
  );
}
