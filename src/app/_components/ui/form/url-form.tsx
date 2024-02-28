"use client";

import "react-toastify/dist/ReactToastify.css";
import { Url } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { api } from "shortiny/trpc/react";
import MyDialog from "../dialog/Dialog";
import { Input } from "shortiny/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LongUrlSchema } from "shortiny/core/schemas";
import { z } from "zod";
import { Form, FormField } from "shortiny/components/ui/form";
import CardWrapper from "../card/card-wrapper";
import Button from "../button/button";

export default function UrlForm({
  host,
  header,
}: {
  host: string | null;
  header: string;
}) {

  const [shortiny, setShortiny] = useState("");
  const [open, setOpen] = useState(false);

  const getShortUrl = api.post.shortinyURL.useMutation({
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
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const form = useForm<z.infer<typeof LongUrlSchema>>({
    resolver: zodResolver(LongUrlSchema),
    defaultValues: {
      url: "",
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
            <Button onClick={()=>{}}>
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
