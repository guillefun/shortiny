import Link from "next/link";
import Button from "shortiny/app/_components/ui/button/button";
import UrlBoard from "../../_components/ui/table/private/UrlBoard";

export default async function Board() {
//TODO: MOVE TABLE TO COMPONENT
  return (
    <>
      <section className="py-4">
        <Link href="/url-form" className="w-fit flex">
          <Button>
            Add new URL
          </Button>
        </Link>
      </section>
      <section className="flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800 mb-[10rem]">
        <UrlBoard host={process.env.HOSTNAME!} />
      </section>
    </>
  );
}