import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
const handler = NextAuth({
  providers: [
    // credentials는 인증 방식 선택 email과 비밀번호로 사용
    CredentialsProvider({
      // 여기서 입력한 이름을 sign("이름") 형태로 사용
      name: "credentials",
      // 여기서 작성한 타입 그대로 아래 "authorize()"의 "credentials"의 타입 적용
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      //로그인 유효성 검사
      async authorize(credentials, req) {
        const res = await fetch(`http://localhost:3000/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        if (res.ok) {
          return user;
        } else {
          throw new Error(user.error);
        }
      },
    }),
  ],
  pages: {
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
