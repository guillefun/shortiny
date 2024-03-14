//'use client'

import Link from 'next/link';
import React from 'react'

interface LoginActionProps {
  children: React.ReactNode,
  mode?: "modal" | "redirect"
}

export const LoginAction = ({
  children,
  mode = "redirect"
}: LoginActionProps) => {
  
  return (
    mode === 'modal' ? 
    <span>
      TODO: Implement modal
    </span>
    : 
    <Link href="/login" className='cursor-pointer'>
      {children}
    </Link>
  )
}
