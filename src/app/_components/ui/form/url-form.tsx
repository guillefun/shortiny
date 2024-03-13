"use client";

import { type Url } from "@prisma/client";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Session } from "next-auth";
import { useForm } from "react-hook-form";
import { Form, FormField } from "shortiny/components/ui/form";
import { Input } from "shortiny/components/ui/input";
import { LongUrlSchema } from "shortiny/core/schemas";
import { api } from "shortiny/trpc/react";
import { type z } from "zod";
import Button from "../button/button";
import CardWrapper from "../card/card-wrapper";
import Router from "next/router";
import { useRouter } from "next/navigation";



export default function UrlForm({
  host,
  session
}: {
  host: string | null;
  session: Session | null
}) {

  const [shortiny, setShortiny] = useState("");
  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  const getShortUrl = api.url.shortinyURL.useMutation({
    onSuccess: (result: Url) => {
      setShortiny(result.shortinyUrl);
      toast.info("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      router.refresh();
    },
    onError: (_err) => {
      console.log("failed to get");
    },
  });

  const onSubmit = (values: z.infer<typeof LongUrlSchema>) => {
    startTransition(async () => {
      getShortUrl.mutate({
        url: values.url,
        createdById: session?.user?.id ?? '0'
      });
    })

  };

  const form = useForm<z.infer<typeof LongUrlSchema>>({
    resolver: zodResolver(LongUrlSchema),
    defaultValues: {
      url: "",
      createdById: ""
    },
  });

  return (

    <CardWrapper headerLabel="Enter url">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <div className="mb-8">
                <Input {...field} placeholder="URL" type="text" />
              </div>
            )}
          ></FormField>

          <div className="w-full">
            <Button loading={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Item host={host} url={shortiny} />
      <ToastContainer />

    </CardWrapper>

  );
}
//      <MyDialog control={open} action={handleCloseDialog} />
const Item = ({ host, url }: { host: string | null; url: string }) => {
  if (!!url) {
    return (
      <div className="mt-4 flex flex-col justify-center text-center">
        <p className="text-balance text-black dark:text-zinc-100">
          {" "}
          Your shortiny link is ready!
        </p>
        <Link
          className="truncate text-black hover:text-zinc-800 dark:text-zinc-100 dark:hover:text-slate-400"
          href={`${host}/${url}`}
          target="_blank"
        >
          {host}/{url}
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
};
