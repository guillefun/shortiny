'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export function RedirectInApp({url} : {url: string}) {
	const router = useRouter()
	useEffect(() => {
			router.replace(url);
	})

  return (
    <div></div>
  );
	
}
