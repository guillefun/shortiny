"use client";

import { FaRegCopy } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CopyPasta({ text }: { text: string }) {
  function copy() {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard! 🥳", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }

  return (
    <div onClick={copy}>
      <ToastContainer />
      <FaRegCopy className="h-5 w-5 hover:text-zinc-800 dark:hover:text-slate-400" />
    </div>
  );
}
