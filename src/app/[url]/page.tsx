import React from 'react'
import { Redirect } from 'shortiny/app/_components/navigation/redirect/Redirect';
import { api } from 'shortiny/trpc/server';
import NotFound from '../not-found';

interface RedirectProps {
    url: string;
}

export default async function RedirectPage({params} : {params: RedirectProps}) {
  const { url } = params;
  try {
  const fetchUrl = await api.url.fetchLongUrl.query({
      shortinyUrl: url as string,
  });

  const data = fetchUrl?.url!;
  return (data) ?
    (
    <>
    {
      <Redirect url={data} />
    }
    </>
  ) : 
  (
    <>
    {
     // <RedirectInApp url="/" />
     <NotFound/>
    }
    </>
  )
  } catch (error) { 
    return   (
      <>
      {
       // <RedirectInApp url="/" />
       <NotFound/>
      }
      </>
    )
  }

}