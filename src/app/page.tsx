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
            <div className="typewriter text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-zinc-100">
                Link shortener
              </h1>
              <p className="mt-6 text-balance text-lg leading-8 text-gray-600 dark:text-zinc-300">
                Open source free to use link shortener behind Auth, implemented
                with AuthJS.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/login">
                  <Button>
                    <SlRocket className="h-5 w-5" /> <span>Get Started</span>
                  </Button>
                </Link>
                <Button>
                  <FaGithub className="h-5 w-5" /> <span>Github</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
