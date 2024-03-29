import React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
}

export default function CardWrapper({
  children,
  headerLabel,
}: CardWrapperProps) {
  return ( // min-h-32
    <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800 mb-8">
      <div className="mb-6 mx-2 py-6 sm:w-3/4 max-sm:w-5/6">
        {
        headerLabel ? (
          <h1 className="my-4 text-3xl font-semibold text-black dark:text-zinc-100">
            {headerLabel}
          </h1>
        )
        : <></>
        }
        {children}
      </div>
    </div>
  );
}
