"use server"

import { LoginSchema } from "shortiny/core/schemas"
import { type z } from "zod"
import { signIn } from "shortiny/server/auth";
import { DEFAULT_LOGIN_REDIRECT } from "shortiny/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null) => {
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT
    })

    return { success: "Success!" }

  } catch (error) {
    if(error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default: 
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
}