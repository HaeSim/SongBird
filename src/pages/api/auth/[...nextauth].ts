/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import type { User } from 'next-auth';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
// refresh token for google
const refreshAccessToken = async (token: {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
}) => {
  const { refreshToken } = token;

  try {
    // url : https://oauth2.googleapis.com/token
    // params : client_id, client_secret, refresh_token, grant_type
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { access_token, expires_in } = response.data;

    const newToken = {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + expires_in * 1000,
    };
    return newToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.error(error?.response?.data);
    }
    return {
      refreshToken,
      error: 'RefreshAccessTokenError',
    };
  }
};

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
            'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email',
          prompt: 'select_account',
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
    async jwt({ token, account, user }) {
      // 초기 로그인시 User 정보를 가공해 반환
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          provider: account.provider,
          user,
        };
      }
      // 기존 호환처리
      if (!token.accessTokenExpires) {
        if (account?.access_token) {
          // eslint-disable-next-line
          token.accessToken = account.access_token;
        }
        if (account?.provider) {
          // eslint-disable-next-line
          token.provider = account.provider;
        }
        return token;
      }

      // Access Token이 만료되지 않았다면 그대로 반환
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      if (token.refreshToken) {
        return refreshAccessToken(token);
      }
      return token;
    },
    /**
     * Session Callback
     * ClientSide에서 NextAuth에 세션을 체크할때마다 실행
     * 반환된 값은 useSession을 통해 ClientSide에서 사용할 수 있음
     * JWT 토큰의 정보를 Session에 유지 시킨다.
     */
    // eslint-disable-next-line
    // @ts-ignore
    async session({ session, token }) {
      if (!token.accessTokenExpires) {
        session.accessToken = token.accessToken;
        session.provider = token.provider;
        return session;
      }
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      session.provider = token.provider;
      return session;
    },
    pages: {
      signIn: '/',
    },
  },
};

// @ts-ignore
export default NextAuth(authOptions);
