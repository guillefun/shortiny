import type { NextAuthConfig } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import Github from "next-auth/providers/github"


export default {
  providers: [ Github, DiscordProvider],
} satisfies NextAuthConfig