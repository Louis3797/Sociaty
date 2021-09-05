import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */

  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      name: string;
      displayName: string;
      email: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;

    user: {
      id: string;
      name: string;
      displayName: string;
      email: string;
      image: string;
    };
  }
}
