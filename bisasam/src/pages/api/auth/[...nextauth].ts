import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismaClient";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  secret: process.env.SECRET,

  pages: {
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    secret: process.env.SECRET,
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, user, token }) {
      session.user = token.user;
      // session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user ? true : false && typeof user !== "undefined") {
        const getUser: {
          id: string;
          name: string | null;
          email: string | null;
          image: string | null;
          displayName: string;
        } | null = await prisma.user.findUnique({
          where: { id: user?.id },
          select: {
            id: true,
            name: true,
            displayName: true,
            email: true,
            image: true,
          },
        });

        token.user = getUser;
      }
      // if (account?.accessToken) {
      //   token.accessToken = account.accessToken;
      // }
      return token;
    },
  },
  events: {
    // async signIn({user}) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    // async createUser(message) { /* user created */ },
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
    // async error(message) { /* error in authentication flow */ }
  },

  //Set to false
  // debug: process.env.NODE_ENV === "development",
  debug: false,
  theme: "light",
});
