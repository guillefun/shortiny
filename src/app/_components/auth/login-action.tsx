//'use client'

import Link from 'next/link';
import React from 'react'

interface LoginActionProps {
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  asChild?: boolean
}

export const LoginAction = ({
  children,
  mode = "redirect",
  asChild
}: LoginActionProps) => {
  
  return (
    mode === 'modal' ? 
    <span>
      TODO: Implement modal
    </span>
    : 
    <Link href="/auth/login" className='cursor-pointer'>
      {children}
    </Link>
  )
}
