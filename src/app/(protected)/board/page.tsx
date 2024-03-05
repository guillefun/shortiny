import React from "react";
import UrlForm from "../../_components/ui/form/url-form";
import UrlBoard from "../../_components/ui/table/private/UrlBoard";
import { auth } from "shortiny/server/auth";

export default async function Board() {
//TODO: MOVE TABLE TO COMPONENT
  const session = await auth();
  console.log("session",JSON.stringify(session))
  return (
    <>
      <section>
        <UrlForm host={process.env.HOSTNAME!} header={"Enter a url"} session={session} />
      </section>

      <div className="flex h-full min-h-32 w-full flex-col items-center justify-center rounded-2xl border bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-800 mb-[10rem]">
        <UrlBoard host={process.env.HOSTNAME!} />
      </div>
    </>
  );
}