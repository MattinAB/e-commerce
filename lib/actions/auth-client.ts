"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Role } from "../prisma/generated/prisma/enums";
import { prisma } from "../prisma";

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

async function getUserRoleById(userId: string): Promise<Role | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      role: true,
    },
  });
  return user ? user.role : null;
}

export { signIn, signUp, signOut, getUserRoleById };
