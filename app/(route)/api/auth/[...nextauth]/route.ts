"use server";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import prisma from "prisma/prisma";
import { NextResponse } from "next/server";

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
        // if (user) {
        //   return user;
        // } else {
        //   return NextResponse.json(
        //     { error: "아이디 및 비밀번호를 확인해주세요" },
        //     { status: 401 }
        //   );
        // }
        return user;
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
      const email = session.user.email as string;
      try {
        const exUser = await prisma.user_table.findUnique({
          where: { email },
          select: { id: true, email: true, name: true, pro_img: true },
        });
        // 로그인한 유저 데이터 재정의
        // 단, 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요함
        //exUser = { id : 1 }
        //session.user = {name:undefined, email:1234@1234, image:undefined,}
        //sesison타입 기본값 교체하려면 User타입에서 확인해서 작업하면 됨
        if (exUser) {
          // session.user = {
          //   id: exUser.id.toString(),
          //   email: exUser.email,
          //   name: exUser.name,
          // };
          session.user = token as any;
        }
        // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
        return session;
      } catch (err) {
        console.log(err);
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
