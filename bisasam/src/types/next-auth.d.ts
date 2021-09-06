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
      bannerUrl?: string | null;
      bio?: string | null;
      created_at: Date;
      numFollowing: number;
      numFollowers: number;
      numContributions: number;
      online: boolean;
    };
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
      name: string;
      displayName: string;
      email: string;
      image: string;
      bannerUrl?: string | null;
      bio?: string | null;
      created_at: Date;
      numFollowing: number;
      numFollowers: number;
      numContributions: number;
      online: boolean;
    };
  }
}
