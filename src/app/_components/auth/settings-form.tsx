"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react"
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
import { type SettingsFormData } from "shortiny/core/models/form.interface";
import {
  SettingsSchema,
} from "shortiny/core/schemas";
import { updateUser } from "shortiny/server/actions/updateUser";
import { type z } from "zod";
import Button from "../ui/button/button";
import CardWrapper from "../ui/card/card-wrapper";
import { auth } from "shortiny/server/auth";



export default function SettingsForm({ userData }: { userData: SettingsFormData }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { update, data: session } = useSession()


  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      username: userData.username ?? undefined
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      await updateUser(values).then(async (result) => {
        
        setError(result.error);
        setSuccess(result.success);
        if(result.success) {
          await update({
            ...session,
            user: {
              ...session?.user,
              name: values.username
            }
          }).then((res)=>{
            console.log("session", res)
            window.location.reload();
          })
          
        }
      });
    });
  };
  return (
    <CardWrapper headerLabel="Update your profile">
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
          <FormError message={error}/>
          <FormSuccess message={success}/>
          <Button disabled={isPending}>
            <span>Save</span>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}