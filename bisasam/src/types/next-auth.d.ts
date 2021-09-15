import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      displayName: string;
    } | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;

    // user: {
    //   id: string | null | unknown;
    //   name: string | null | unknown;
    //   displayName: string | null | unknown;
    //   email: string | null | unknown;
    //   image: string | null | unknown;
    // };
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      displayName: string;
    } | null;
  }
}
