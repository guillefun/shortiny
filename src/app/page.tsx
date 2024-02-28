import React from "react";
import UrlForm from "./_components/ui/form/url-form";
import UrlBoard from "./_components/ui/table/private/UrlBoard";
import Button from "./_components/ui/button/button";
import { FaGithub } from "react-icons/fa";
import { SlRocket } from "react-icons/sl";
import Link from "next/link";


export default async function Home() {
//TODO: MOVE TABLE TO COMPONENT
  return (
    <article>
      <section>
      <div className="relative isolate px-6 lg:px-8">
    <div className="mx-auto max-w-2xl py-12 ">
      <div className="text-center typewriter">
        <h1 
          className="text-4xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-6xl"
        >Link shortener</h1>
        <p className="mt-6 text-lg text-balance leading-8 text-gray-600 dark:text-zinc-300">Open source free to use link shortener behind Auth, implemented with AuthJS.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/auth/login">
          <Button>
           <SlRocket  className="h-5 w-5" /> <span>Get Started</span>
          </Button>
        </Link>
          <Button>
            <FaGithub className="h-5 w-5" /> <span>Github</span>
          </Button>
        </div>
      </div>
    </div>
    <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
   
    </div>
  </div>

      </section>
    </article>
  );
}
