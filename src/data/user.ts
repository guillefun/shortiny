
import { api as apiLocal } from "shortiny/trpc/react";
import { api } from "shortiny/trpc/server";  

export const getUserByEmail = async (email: string) => {
  try {
    const user = api.user.findUniqueByEmail.query({email});
    return user;
  } catch {
    return null;
  }
}

export const getUserById = async (id: string) => {
  try {
    return api.user.findUniqueById.query({id});
  } catch {
    return null;
  }
}

export const getUserByEmailClient = async (email: string) => {
  try {
    const user = apiLocal.user.findUniqueByEmail.useQuery({email});
    return user;
  } catch {
    return null;
  }
}
