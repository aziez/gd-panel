import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

// const prisma = new PrismaClient();
// import client from "../../../../libs/prismadb";
import client from "../../../libs/prismadb";
import { error } from "console";

const handler = NextAuth({
  adapter: PrismaAdapter(client),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   session: async (session, user) => {
  //     session.userId = user.id;
  //     return Promise.resolve(session);
  //   },
  // },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placholder: "Jhondoe@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log({ credentials });
        console.log(
          "Attempting to authenticate with credentials:",
          credentials
        );

        if (!credentials.email || !credentials.password) {
          console.log("Please input email and password");
          // throw new Error("Please input email and password");
        }

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // console.log("DATA USERRR", user);

        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password
        );

        // console.log("Password correct : ", passwordCorrect);

        if (!user || !user?.password) {
          // console.log("User Not Found");
          throw new Error("User Not Found");
        }

        if (passwordCorrect) {
          // console.log("PASSSS");
          return {
            id: user?.id,
            email: user?.email,
          };
        }

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
