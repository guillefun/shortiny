import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-full flex justify-center'>
      <Image alt="Spinning duck!" src={'/spinning_duck.webp'} width={500} height={500}/>
    </div>
  )
}
