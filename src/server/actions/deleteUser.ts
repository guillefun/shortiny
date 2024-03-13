"use server"

import { getUserById } from "shortiny/data/user";
import { api } from 'shortiny/trpc/server';
import { auth } from "../auth";

interface UserId {
  id: string
}

export const deleteUser = async (values: UserId) => {
  const session = await auth();
  const currentUser = session?.user;

  if(!currentUser?.id) {
    return { error: "Unauthorized" }
  }

  if(currentUser?.id !== values.id) {
    return { error: "Unauthorized" }
  }

  try {
    const existingUser = await getUserById(currentUser.id);
    if(!existingUser) {
      return { error: "User does not exist" }
    }
  } catch(error) {
    return { error: "Error in get user" }
  }
//TODO delete all urls from user
  try {
    await api.user.delete.query({id:currentUser.id})
  } catch(error) {
    return { error: "Error in create user" }
  }

  return { success: "Profile updated!" }
}