"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiLinksFill } from "react-icons/ri";
import "node_modules/flag-icons/css/flag-icons.min.css";

const links = [
  {
    name: "Auth",
    path: "/auth/login",
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

export default function Header() {
  const [open, setOpen] = useState(false);

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
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            onClick={() => {
              setOpen(!open);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`hidden w-full py-2 md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="gap-4 mx-2 flex list-none flex-col bg-transparent font-medium md:mt-0 md:flex-row md:border-0 md:p-0 rtl:space-x-reverse">
              <li
                key="login"
                className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
              >
                <a
                  href="/auth/login"
                  className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75  ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
                  aria-current="page"
                >
                  Sign In
                </a>
              </li>
              <li
                key="github"
                className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
              >
                <a
                  href="/auth/login"
                  className="m-2 block p-2 text-xl font-bold text-black transition-colors delay-75 ease-in hover:text-blue-200 dark:text-zinc-100 dark:hover:text-blue-400"
                  aria-current="page"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
              </li>
              <li
                key="locale"
                className="bg-zinc-700/66 inline-block cursor-pointer rounded-lg"
              >
                <span className={`my-2 mx-4 block py-2 px-2 text-xl font-bold fi fis fi-es`} ></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
