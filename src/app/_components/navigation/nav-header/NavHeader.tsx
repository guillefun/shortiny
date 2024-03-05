
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiLinksFill } from "react-icons/ri";

import "node_modules/flag-icons/css/flag-icons.min.css";
import { Session } from "next-auth";
import { auth } from "shortiny/server/auth";
import ProtectedNavItems from "../nav-items/protected-nav-items";
import PublicNavItems from "../nav-items/public-nav-items";

const links = [
  {
    name: "Auth",
    path: "/login",
  },
  {
    name: "Github",
    path: "/",
  },
];

const menuVariants = {
  show: {
    opacity: 1,
    x: 0,
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    x: "-100%",
    transition: {
      x: { velocity: 100 },
      duration: 0.3,
    },
  },
};

export default async function Header() { //{ session }: { session: Session | null }
  console.log("Refresh navbar");
  const session = await auth()
  
  /*if (session) {
    console.log(session.user);
  }*/
  return (
    <header className="supports-backdrop-blur:bg-white/60 sticky top-0 z-50 w-full flex-none border-b bg-white/95 backdrop-blur transition-colors duration-500 lg:border-slate-900/10 dark:border-slate-400/[0.30] dark:bg-neutral-900/15">
      <nav className=" border-gray-200 bg-transparent">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between bg-transparent p-4">
          <Link
            className="mx-4 flex w-auto items-center space-x-3 py-2 transition-transform delay-100 ease-in hover:scale-110 rtl:space-x-reverse"
            href="/"
          >
            <RiLinksFill className="text-black dark:text-zinc-100" size="2em" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-zinc-100">
              Shortiny
            </span>
          </Link>
          {
            session?.user ? <ProtectedNavItems/> : <PublicNavItems/>
          }
        </div>
      </nav>
    </header>
  );
}
