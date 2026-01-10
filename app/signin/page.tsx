import { headers } from "next/headers";
import SigninClient from "./SigninClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/products");
  }
  return <SigninClient />;
}
