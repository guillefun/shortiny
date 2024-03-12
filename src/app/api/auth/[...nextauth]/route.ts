import NextAuth from "next-auth";
/*
import { authOptions } from "shortiny/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };*/

import type { NextApiRequest, NextApiResponse } from "next"
/////next-auth v5

export { GET, POST } from "shortiny/server/auth"

