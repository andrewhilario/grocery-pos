import { API_URL } from "@/constant/api";
import { jwtDecode } from "jwt-decode";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  account_type: string;
  isActive: boolean;
  token: string;
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 10 * 30
  },
  jwt: {
    maxAge: 60 * 10 * 30
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const response = await fetch(`${API_URL}/token/`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log("RESPONSE", response);

        const user = await response.json();

        if (response.ok) {
          const decode = jwtDecode(user.access) as User;

          console.log("DECODE", decode);

          return {
            id: decode.id,
            email: decode.email,
            token: user.access,
            first_name: decode.first_name,
            last_name: decode.last_name,
            username: decode.username,
            refresh_token: user.refresh,
            access_token: user.access,
            access_token_expires: (decode.exp || 0) * 1000,
            exp: decode.exp || 0 // Ensure the exp property is included
          };
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("JWT CALLBACK", { token, user, trigger, session });

      if (user) {
        return {
          ...token,
          ...user,
          expires_at: user.exp
        };
      }
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (Date.now() < (token.expires_at as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      console.log("SESSION CALLBACK", { token, user, session });
      return {
        ...session,
        id: token.id,
        token: token.token,
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
        username: token.username,
        access_token: token,
        user_id: token.id,
        refresh_token: token.refresh_token
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error"
  }
};

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${API_URL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh: token.refresh_token
      })
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const decoded = jwtDecode(refreshedTokens.access) as any;

    return {
      ...token,
      access_token: refreshedTokens.access,
      refresh_token: refreshedTokens.refresh || token.refresh_token,
      expires_at: (decoded.exp || 0) * 1000 // Convert to milliseconds
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
}
