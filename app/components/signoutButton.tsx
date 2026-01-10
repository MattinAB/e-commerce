"use client";

import { signOut } from "@/lib/actions/auth-client";
import { ComponentProps } from "react";

type ButtonComponent = ComponentProps<"button">;

export default function SignoutButton({ children, ...props }: ButtonComponent) {
  return (
    <button onClick={() => signOut()} {...props}>
      {children}
    </button>
  );
}
