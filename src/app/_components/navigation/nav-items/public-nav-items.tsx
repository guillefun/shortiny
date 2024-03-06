import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

export default function PublicNavItems() {
  return (
    <div
      className={`hidden w-full py-2 md:block md:w-auto`}
      id="navbar-default"
    >
      <ul className="mx-2 flex list-none flex-col gap-4 bg-transparent font-medium md:mt-0 md:flex-row md:border-0 md:p-0 rtl:space-x-reverse">
        <li
          key="login"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
          <Link
            href="/login"
            className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75  ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
            aria-current="page"
          >
            Sign In
          </Link>
        </li>

        <li
          key="github"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
          <Link
            href="https://github.com/guillefun/shortiny"
            className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75 ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
            aria-current="page"
          >
            <FaGithub className="h-6 w-6" />
          </Link>
        </li>
        <li
          key="locale"
          className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
        >
          <span
            className={`fi fis fi-es mx-4 my-2 block px-2 py-2 text-xl font-bold`}
          ></span>
        </li>
      </ul>
    </div>
  );
}
