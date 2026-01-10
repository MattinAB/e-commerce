"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const signIn = async (email: string, password: string) => {
  return await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
};
const signUp = async (email: string, password: string, name: string) => {
  return await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
};

const signOut = async () => {
  return await auth.api.signOut({
    headers: await headers(),
  });
};

export { signIn, signUp, signOut };
