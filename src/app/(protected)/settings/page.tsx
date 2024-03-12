import React from "react";
import { AuthProvider } from "shortiny/app/_components/auth/auth-provider";
import SettingsForm from "shortiny/app/_components/ui/form/settings-form";
import Button from "shortiny/app/_components/ui/button/button";

import { auth, signOut } from "shortiny/server/auth";
import Link from "next/link";
import { ButtonSize } from "shortiny/core/models/form.interface";
import { IoMdArrowRoundBack } from "react-icons/io";
import { deleteUser } from "shortiny/server/actions/deleteUser";

export default async function Settings() {
  const session = await auth();
  console.log("session", session);
  return (
    <AuthProvider>
      <section className="flex justify-between pb-4 pt-2">
        <Link href="/board" className="flex w-fit">
          <Button size={ButtonSize.icon}>
            <IoMdArrowRoundBack />
          </Button>
        </Link>
        <form
        action={async () => {
          "use server";
          if(session?.user?.id) {
            await deleteUser({id: session?.user?.id }).then(async ()=>{
              await signOut();
            })
          }
        }}
      >
        <Button>Delete account</Button>
      </form>
      </section>
      <SettingsForm userData={{ username: session!.user!.name! }} />
    </AuthProvider>
  );
}
