"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, //TODO: TO IMPLEMENT FORM ERROR
} from "shortiny/components/ui/form";
import FormError from "shortiny/components/ui/form-error";
import FormSuccess from "shortiny/components/ui/form-success";
import { Input } from "shortiny/components/ui/input";
import { LoginSchema } from "shortiny/core/schemas";
import { login } from "shortiny/server/actions/login";
import { z } from "zod";
import Button from "../ui/button/button";
import CardWrapper from "../ui/card/card-wrapper";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get("callbackUrl")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      await login(values, callbackUrl).then((data)=>{
        console.log(data)
        setError(data?.error)
        setSuccess(data?.success)
      })
    });
  };
  return (
    <CardWrapper headerLabel="Welcome!">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@exe.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="*****"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button disabled={isPending}>
            <span>Sign In</span>
          </Button>
        </form>
      </Form>
      <div className="flex flex-col w-fit mx-auto mt-8 gap-y-2 items-center">
        <p className="text-black dark:text-zinc-100 text-md">Or better sign in with one of our providers!</p>
        <div className="flex w-full items-center gap-x-2">
          <Button>
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button>
            <FaGithub className="h-5 w-5" />
          </Button>
        </div>
        <Link
          href="/register"
          className="underline underline-offset-4 hover:text-zinc-800 dark:hover:text-slate-400"
        >
          Don&apos;t have an account? Sign up here.
        </Link>
      </div>
    </CardWrapper>
  );
}
