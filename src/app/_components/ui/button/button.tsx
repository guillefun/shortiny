"use client"

import React, { MouseEventHandler } from "react";

export default function Button(
  { children, onClick = ()=>{}, disabled = false} : 
  { children: React.ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>, disabled?: boolean }
) {
  return (
    <button onClick={()=>{onClick}}
      type="submit"
      disabled={disabled}
      className="sm:min-w-40 max-sm:min-w-36 flex flex-row gap-2 justify-center items-center rounded-xl border border-gray-800 py-2.5 text-center text-sm font-medium text-gray-900 delay-75 hover:scale-105 transition-all hover:bg-gray-900 hover:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 dark:focus:ring-transparent"
    >
      {children}
    </button>
  );
}
