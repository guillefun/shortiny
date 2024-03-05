"use client";
import React, { useEffect } from 'react'

export function Redirect({url} : {url: string}) {
	useEffect(() => {
		console.log(url)
		window.location.href = url
	})

  return (
    <div>Redirecting</div>
  );
	
}
