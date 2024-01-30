import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
import client from "../../../../libs/prismadb";

const handler = NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placholder: "Jhondoe@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials });
        return null
      },
    }),
  ],
});

export { handler as GET, handler as POST };
