"use client"

import { cva } from "class-variance-authority";
import React, { type MouseEventHandler } from "react";
import { ButtonSize } from "shortiny/core/models/form.interface";
import { cn } from "shortiny/lib/utils";



const buttonVariants = cva(
  "flex flex-row gap-2 justify-center items-center rounded-xl border border-gray-800 my-2 py-2.5 text-center text-base font-medium text-gray-900 delay-75 hover:scale-105 transition-all hover:bg-gray-900 hover:text-zinc-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-zinc-600 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 dark:focus:ring-transparent",
  {
    variants: {
      size: {
        default: "sm:min-w-40 max-sm:min-w-28 max-sm:mx-auto px-4",
        icon: "h-12 w-12",
      },
    },
  }
)

export default function Button(
  { children, onClick, disabled = false, size = ButtonSize.default} : 
  { children: React.ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>, disabled?: boolean, size?: ButtonSize }
) {
  console.log("size", size)
  return (
    <button onClick={()=>{onClick}}
      type="submit"
      disabled={disabled}
      className={cn(buttonVariants({ size }))}
    >
      {children}
    </button>
  );
}
