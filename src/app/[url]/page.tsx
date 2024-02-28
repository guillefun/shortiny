import React from 'react'
import { Redirect } from 'shortiny/app/_components/redirect/Redirect';
import { api } from 'shortiny/trpc/server';
import { RedirectInApp } from '../_components/redirect/RedirectInApp';
import NotFound from '../not-found';

interface RedirectProps {
    url: string;
}

export default async function RedirectPage({params} : {params: RedirectProps}) {
  let { url } = params;
  try {
  const fetchUrl = await api.post.fetchLongUrl.query({
      shortinyUrl: url as string,
  });

  let data = fetchUrl?.url!;
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