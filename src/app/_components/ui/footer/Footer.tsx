import React from 'react'

export default function Footer() {
  return (
    <footer className='border-t border-zinc-700 w-full'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-center bg-transparent p-8'>
        <p className='text-sm text text-black dark:text-zinc-300'>@Build enhanced with NextJS 14 - tRPC - PrismaDB</p>
      </div>
    </footer>
  )
}
