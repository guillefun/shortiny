import { api } from "shortiny/trpc/server";
    
export const getUserByEmail = async (email: string) => {
  try {
    return await api.user.findUniqueByEmail.query({email});
  } catch {
    return null;
  }
}

export const getUserById = async (id: string) => {
  try {
    return await api.user.findUniqueById.query({id});
  } catch {
    return null;
  }
}