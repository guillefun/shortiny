import React from 'react'
import { api } from 'shortiny/trpc/server'
import Table from '../Table'
import { type RawUrl, type UrlPublic } from 'shortiny/core/models/url-public.interface'
import { type Url } from '@prisma/client'

export default async function UrlBoard({ host, urls } : { host: string, urls: RawUrl[] }) {
  console.log("UrlBoard")

/*  const urls = await api.url.getAllUrls.query() ?? []*/
  const parsed_urls: UrlPublic[] = urls?.map((url)=> (
    {
      url: url.url, 
      shortinyUrl: `${host}/${url.shortinyUrl}`, 
      date: `${url.createdAt.toLocaleDateString('es-ES')} ${url.createdAt.toLocaleTimeString('es-ES', { hour12: false })}`
    }
  ))
  return (
    parsed_urls ? 
    <section className="mb-[10rem] flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
      <Table data={parsed_urls}/> 
    </section>
    : <></>
  )
}


