"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import {
  RegisterSchema,
} from "shortiny/core/schemas";
import { register } from "shortiny/server/actions/register";
import { type z } from "zod";
import Button from "../ui/button/button";
import CardWrapper from "../ui/card/card-wrapper";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <CardWrapper headerLabel="Create an account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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
          <Button disabled={isPending} loading={isPending}>
            <span>Sign Up</span>
          </Button>
        </form>
      </Form>
      <div className="flex flex-col w-fit mx-auto mt-8 gap-y-2 justify-center items-center">
        <p className="text-black dark:text-zinc-100 text-md">Or better sign in with one of our providers!</p>
        <div className="flex w-full justify-center items-center gap-x-2">
          <Button>
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button>
            <FaGithub className="h-5 w-5" />
          </Button>
        </div>
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-zinc-800 dark:hover:text-slate-400"
        >
          Already have an account? Sign in here.
        </Link>
      </div>
    </CardWrapper>
  );
}
