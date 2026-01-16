import { auth } from "@/lib/auth";
import CreateForm from "./_components/createForm";
import { headers } from "next/headers";
import { getUserRoleById } from "@/lib/actions/auth-client";
import { redirect } from "next/navigation";

export default async function CreateProduct() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = await getUserRoleById(session?.user?.id || "");

  if (role !== "ADMIN") {
    redirect("/");
  }

  return <CreateForm />;
}
