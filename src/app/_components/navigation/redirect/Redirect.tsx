"use client";

import React, { useEffect } from 'react'

export function Redirect({url} : {url: string}) {
	useEffect(() => {
		window.location.href = url
	})
//<Image alt="Spinning duck!" src={'/spinning_duck.webp'} width={500} height={500}/>
  return (
    <>
    </>
  );
	
}
