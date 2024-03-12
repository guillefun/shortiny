import Link from 'next/link';
import React from 'react'
import { type UrlPublic } from 'shortiny/core/models/url-public.interface';
import { CopyPasta } from './CopyPasta';


export default function Table({data}:{data: UrlPublic[]}) {
 
  return ( 
  data.length > 0 &&
  <div className="w-full relative overflow-x-auto sm:rounded-2xl">
    <table className="max-sm:hidden w-full text-left text-sm rtl:text-right dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-black dark:text-zinc-300 dark:bg-gray-700">
        <tr>
          {
            Object.keys(data[0]!).map((key) => {
              return (          
                <th key={key} scope="col" className="px-6 py-3">
                  {key}
                </th>
              )
            })
          }
        </tr>
      </thead>
      <tbody className='text-black dark:text-zinc-100'>
        {
          data.map((obj) => {
            return (
              <tr key={obj.shortinyUrl} className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800 [&>*:first-child]:break-all">
                <td className="px-6 py-4">
                  <Link 
                    target="_blank" 
                    className="hover:text-zinc-800 dark:hover:text-slate-400" 
                    href={obj.url}
                  >
                    {obj.url}
                  </Link>
                </td>
                <td className="px-6 py-4 flex flex-row gap-x-4">
                  <Link 
                    target="_blank"
                    className="hover:text-zinc-800 dark:hover:text-slate-400" 
                    href={obj.shortinyUrl}
                  >
                    {obj.shortinyUrl}
                  </Link>
                  <CopyPasta text={obj.shortinyUrl}/>
                </td>
                <td className="px-6 py-4">
                  {obj.date}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    <section className='sm:hidden'>
      {
        data.map((o)=> {
          return (
            <article key={o.shortinyUrl} className='flex flex-col rounded-lg border border-zinc-300 shadow-md p-4 mx-4 my-8'>
              <div className='text-right mb-6'>        
                <p className='text-sm'>{o.date}</p>
              </div>
              <div className='flex flex-col mx-2'>
                <p className='text-sm mb-4'>Shortiny Url: {o.shortinyUrl}</p>
                <p className='text-sm break-all mb-2'>Full Url: {o.url}</p>
              </div>
            </article>
          )
        })
      }

    </section>
  </div>

  )
}