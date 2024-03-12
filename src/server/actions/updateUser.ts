"use server"

import { SettingsSchema } from "shortiny/core/schemas";
import { getUserById } from "shortiny/data/user";
import { api } from 'shortiny/trpc/server';
import { type z } from "zod";
import { auth } from "../auth";

export const updateUser = async (values: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values);
  const session = await auth();
  const currentUser = session?.user;

  if(!currentUser?.id) {
    return { error: "Unauthorized" }
  }
  if(!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { username } = validatedFields.data;

  try {
    const existingUser = await getUserById(currentUser.id);
    if(!existingUser) {
      return { error: "User not registered" }
    }
  } catch(error) {
    return { error: "Error in get user" }
  }

  try {
    await api.user.update.query({id:currentUser.id, username: username!})
  } catch(error) {
    return { error: "Error in create user" }
  }

  return { success: "Profile updated!" }
}