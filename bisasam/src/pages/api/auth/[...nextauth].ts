import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "../../../lib/prismaClient";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function handler(req, res) {
  NextAuth(req, res, {
    // https://next-auth.js.org/configuration/providers
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],

    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must to install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)

    adapter: PrismaAdapter(prisma),

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    pages: {
      // signIn: '/auth/signin',  // Displays signin buttons
      // signOut: '/auth/signout', // Displays form with sign out button
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },
    session: {
      jwt: true,
    },

    jwt: {
      secret: process.env.SECRET,
      encryption: true,
    },
    callbacks: {
      // async signIn(user, account, profile) { return true },
      // async redirect(url, baseUrl) { return baseUrl },
      async session(session, token) {
        session.user = token.user;
        return session;
      },
      async jwt(token, user) {
        if (user) token.user = user;
        return token;
      },
    },
    events: {
      // async signIn(message) { /* on successful sign in */ },
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
}
