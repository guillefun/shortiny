import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcrypt"
import Github from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials"

import { LoginSchema } from "shortiny/core/schemas"
import { getUserByEmail } from "shortiny/data/user"

export default {
  providers: [ Github, DiscordProvider],
} satisfies NextAuthConfig