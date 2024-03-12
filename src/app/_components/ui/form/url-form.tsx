"use client";

import { type Url } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
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
import MyDialog from "../dialog/Dialog";

export default function UrlForm({
  host,
  session
}: {
  host: string | null;
  session: Session | null
}) {

  const [shortiny, setShortiny] = useState("");
  const [open, setOpen] = useState(false);

  const getShortUrl = api.url.shortinyURL.useMutation({
    onSuccess: (result: Url) => {
      setShortiny(result.shortinyUrl);
      setOpen(true);
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
      console.log("Success");
    },
    onError: (_err) => {
      console.log("failed to get");
    },
  });

  const onSubmit = (values: z.infer<typeof LongUrlSchema>) => {
    console.log("e");
    getShortUrl.mutate({
      url: values.url,
      createdById: session?.user?.id ?? '0'
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
            <Button>
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <Item host={host} url={shortiny} />
      <ToastContainer />
      <MyDialog control={open} action={handleCloseDialog} />
    </CardWrapper>

  );
}

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
