import React from 'react'
import { api } from 'shortiny/trpc/server'
import Table from '../Table'
import { UrlPublic } from 'shortiny/core/models/url-public.interface'

export default async function UrlBoard({ host } : { host: string }) {
  const urls = await api.url.getAllUrls.query() ?? []
  const parsed_urls: UrlPublic[] = urls?.map((url)=> (
    {
      url: url.url, 
      shortinyUrl: `${host}/${url.shortinyUrl}`, 
      date: `${url.createdAt.toLocaleDateString('es-ES')} ${url.createdAt.toLocaleTimeString('es-ES', { hour12: false })}`
    }
  ))
  return (
    <Table data={parsed_urls}/>
  )
}
