import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SlRocket } from "react-icons/sl";
import Button from "./_components/ui/button/button";

export default async function Home() {
  //TODO: MOVE TABLE TO COMPONENT
  return (
    <article>
      <section>
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-12 ">
            <div className="typewriter text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-zinc-100">
                Shortiny your URLs
              </h1>
              <p className="mt-6 text-balance text-lg leading-8 text-gray-600 dark:text-zinc-300">
                Simplify link sharing securely with our AuthJS-powered, free-to-use open-source link shortener
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/login">
                  <Button>
                    <SlRocket className="h-5 w-5" /> <span>Get Started</span>
                  </Button>
                </Link>
                <Link 
                  href="https://github.com/guillefun/shortiny"
                  target="_blank"
                >
                  <Button>
                    <FaGithub className="h-5 w-5" /> <span>Github</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
