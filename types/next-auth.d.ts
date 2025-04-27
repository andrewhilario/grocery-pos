import "next-auth";

declare module "next-auth" {
  interface Token {
    token_type: string;
    iat: number;
    exp: number;
    jti: string;
    user_id: number;
  }

  interface User {
    id: number;
    email: string;
    token: string;
    first_name: string;
    last_name: string;
    username: string;
    refresh_token: string;
    access_token: string;
    exp: Token["exp"];
  }

  interface Session extends DefaultSession {
    id: number;
    user: User;
    token: string;
    first_name: string;
    last_name: string;
    username: string;
    access_token: string;
    user_id: number;
    refresh_token: string;
  }
}
