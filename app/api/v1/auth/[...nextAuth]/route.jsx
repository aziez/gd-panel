import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();
import client from "../../../../libs/prismadb";

const handler = NextAuth({
  adapter: PrismaAdapter(client),
  callbacks: {
    session: async (session, user) => {
      session.userId = user.id;
      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placholder: "Jhondoe@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log({ credentials });
        console.log(
          "Attempting to authenticate with credentials:",
          credentials
        );

        if (!credentials.email || !credentials.password) {
          throw new Error("Please input email and password");
        }

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("User Not Found");
        }
        const hashPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!hashPassword) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
