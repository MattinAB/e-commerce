import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { BiMenuAltLeft } from "react-icons/bi";
import "./navigator.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignoutButton from "@/components/ui/signoutButton";
import { getUserRoleById } from "@/lib/actions/auth-client";

export default async function Navigation() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = await getUserRoleById(session?.user?.id || "");
  const userName = session?.user?.name || "Guest";

  return (
    <div className="flex flex-col z-20 sticky top-2.5 content-center rounded-2xl box-border bg-blue-700 text-neutral-100  h-max p-1.5 w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
      <span>
        <Link href="/">Commerce name !</Link>
      </span>

      <nav className="flex justify-between nav-links w-full align-center ">
        <div className="flex items-center space-x-6 ">
          <Link href="/about">
            <BiMenuAltLeft size={20} />
          </Link>

          <Link href="/">Home</Link>
          {session && (
            <>
              <Link href="/dashboard/products">Collections</Link>
              <Link href="/dashboard/new">New</Link>
            </>
          )}
          {role === "ADMIN" && (
            <Link href="/dashboard/new-product">create-Product</Link>
          )}
        </div>
        <div className="flex login-box ">
          <span>Welcome back! {` ${userName}`}</span>
          {!session ? (
            <Link href="/signin">Signin </Link>
          ) : (
            <SignoutButton className="p-1 rounded-2xl shadow-2xl hover:bg-slate-100 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out">
              Sign out
            </SignoutButton>
          )}

          <Link href="/dashboard/cart">
            <CiShoppingCart size={20} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
