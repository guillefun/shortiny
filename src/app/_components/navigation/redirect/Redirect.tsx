"use client";
import Image from 'next/image';
import React, { useEffect } from 'react'

export function Redirect({url} : {url: string}) {
	useEffect(() => {
		console.log(url)
		window.location.href = url
	})

  return (
    <div className='w-full h-full flex justify-center my-16'>
      <Image alt="Spinning duck!" src={'/spinning_duck.webp'} width={500} height={500}/>
    </div>
  );
	
}
