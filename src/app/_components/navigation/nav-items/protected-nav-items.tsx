import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { signOut } from "shortiny/server/auth";

export default function ProtectedNavItems() {
  return (
    <div
      className={`hidden w-full py-2 md:block md:w-auto`}
      id="navbar-default"
    >
      <ul className="mx-2 flex list-none flex-col gap-4 bg-transparent font-medium md:mt-0 md:flex-row md:border-0 md:p-0 rtl:space-x-reverse">
         {/* <li
          key="login"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
        <form
            action={async () => {
              "use server";
              console.log("aasdasd");
              await signOut();
            }}
          >
            <button
              type="submit"
              className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75  ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
              aria-current="page"
            >
              Logout
            </button>
          </form>
        </li>*/}
        <li
          key="settings"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
          <Link
            href="/settings"
            className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75  ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
            aria-current="page"
          >
            My account
          </Link>
        </li>
        <li
          key="github"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
          <Link
            href="/login"
            className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75 ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
            aria-current="page"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
