// eslint-disable-next-line prettier/prettier, unused-imports/no-unused-imports
import NextAuth from "next-auth"

type UserType = {
  email: string;
  image: string;
  name: string;
};

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType;
    accessToken: string;
    provider: string;
  }
}
