"use client";

import { signOut } from "@/lib/actions/auth-client";

import { redirect } from "next/navigation";
import { ComponentProps } from "react";

type ButtonComponent = ComponentProps<"button">;

export default function SignoutButton({ children, ...props }: ButtonComponent) {
  return (
    <button
      onClick={async () => {
        const { success } = await signOut();
        if (success) {
          redirect("/signin");
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
