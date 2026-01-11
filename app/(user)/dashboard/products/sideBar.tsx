"use client";

import Link from "next/link";

const navLinks = [
  { name: "mens", href: "/man" },
  { name: "womans", href: "/womans" },
  { name: "kids", href: "/kids" },
];
export default function SideBar() {
  return (
    <div className=" flex flex-col  w-full">
      <nav className=" flex flex-col  items-center gap-2">
        {navLinks.map((link, index) => (
          <Link className="font-mono text-base " key={index} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
