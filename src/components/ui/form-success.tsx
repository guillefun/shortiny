import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

export default function FormSuccess({ message }: { message?: string }) {
  if(!message){
      return <></>
  }
  return (
    <div className='bg-emerald/500 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <FaCheckCircle className='h-5 w-5'/>
      <p>{message}</p>
    </div>
  )
}