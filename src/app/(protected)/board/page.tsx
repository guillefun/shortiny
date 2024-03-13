import Link from "next/link";
import Button from "shortiny/app/_components/ui/button/button";
import { auth } from "shortiny/server/auth";
import UrlBoard from "../../_components/ui/table/private/UrlBoard";
import { api } from "shortiny/trpc/server";
import type { RawUrl } from "shortiny/core/models/url-public.interface";

export default async function Board() {
  //TODO: MOVE TABLE TO COMPONENT
  const urls: RawUrl[] = await api.url.getAllUrls.query() ?? []

  const session = await auth();
  return (
    <>
      {session?.user ? (
        <section className="flex justify-center py-4">
          <h2 className="mb-8 mt-2 text-4xl font-semibold text-black dark:text-zinc-100">
            Welcome back {session?.user?.name}
          </h2>
        </section>
      ) : (
        <></>
      )}
      <section className="flex justify-center py-4">
        <Link href="/url-form" className="flex w-fit">
          <Button>Add new URL</Button>
        </Link>
      </section>

      <UrlBoard host={process.env.HOSTNAME!} urls={urls} />
    </>
  );
}