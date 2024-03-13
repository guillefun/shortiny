import { PrismaAdapter } from "@auth/prisma-adapter";
//import { DefaultSession } from "next-auth";
/*import {
  getServerSession,
  DefaultSession,
  NextAuthOptions,
} from "next-auth";*/
import bcrypt from "bcrypt";

import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "shortiny/core/schemas";
import { getUserByEmail, getUserByEmailClient } from "shortiny/data/user";

import authConfig from "./auth.config";

import { db } from "shortiny/server/db";


///////NEW METHOD AUTHJS V5

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        if(session.user.name !== token.name) {
          session.user.name = token.name
        }
        
        return session;
      }

      return session;
    },
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;
      if (!token.email) return token;
      
      if(trigger==="update" && session) {
        const sess = session as Session;
        return {...token, ...sess.user};
    }

      const currentUser = await getUserByEmailClient(token.email);

      if (!currentUser) return token;

      token.name = currentUser.data?.name;



      return token;
    },
  },
  adapter: PrismaAdapter(db), //WARN: Only able to import because of the authConfig middleware trick
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        //WARN: Same as with prismaAdapter with the authConfig middleware trick
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  ...authConfig.providers,
});

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

/*
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

*/

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

/*
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
/* ],
};*/
/*
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
/*
export const getServerAuthSession = () => auth(authOptions);

*/
