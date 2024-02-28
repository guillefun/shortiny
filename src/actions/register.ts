"use server"

import { RegisterSchema } from "shortiny/core/schemas"
import { z } from "zod"
import bcrypt from "bcrypt"
import { api } from 'shortiny/trpc/server';
import { getUserByEmail } from "shortiny/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { username, email, password, confirmPassword } = validatedFields.data
  const hashPassword = await bcrypt.hash(password, 16)

  const existingUser = await getUserByEmail(email);

  if(existingUser) {
    return { error: "User already registered" }
  }

  const entity = {
    name: username,
    email,
    password: hashPassword
  }

  try {
    await api.user.create.mutate(entity)
  } catch(e: any) {
    return { error: "Error in create user" }
  }
  //TODO: SEND VERIFICATION TOKEN EMAIL 😄
  return { success: "Email sent!" }
}