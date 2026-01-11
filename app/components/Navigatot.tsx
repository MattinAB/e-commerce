import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { BiMenuAltLeft } from "react-icons/bi";
import "./navigator.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignoutButton from "@/components/ui/signoutButton";

export default async function Navigation() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex flex-col fixed top-4 rounded-2xl box-border bg-blue-700 text-neutral-100 inset-0 h-max p-1.5 w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
        <div className="flex login-box ">
          <span>Welcome back!</span>
          {session === null ? (
            <Link href="/signin">Signin </Link>
          ) : (
            <SignoutButton>Sign out</SignoutButton>
          )}
          {session && (
            <Link href="/dashboard/cart">
              <CiShoppingCart size={20} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
