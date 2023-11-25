import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    // eslint-disable-next-line
    // @ts-ignore
    jwt: ({ token, account }) => {
      if (account?.access_token) {
        // eslint-disable-next-line
        token.accessToken = account.access_token;
      }
      if (account?.provider) {
        // eslint-disable-next-line
        token.provider = account.provider;
      }
      return token;
    },
    // eslint-disable-next-line
    // @ts-ignore
    async session({ session, token }) {
      // eslint-disable-next-line
      session.accessToken = token.accessToken;
      // eslint-disable-next-line
      session.provider = token.provider;
      return session;
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);
