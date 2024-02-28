import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

export default function FormError({ message }: { message?: string }) {
  if(!message){
      return <></>
  }
  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <FaExclamationTriangle className='h-5 w-5'/>
      <p>{message}</p>
    </div>
  )
}
