"use server";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";
import prisma from "@/prisma/prisma";
import { User } from "next-auth";

const handler = NextAuth({
  providers: [
    // credentials는 인증 방식 선택 email과 비밀번호로 사용
    CredentialsProvider({
      // 여기서 입력한 이름을 sign("이름") 형태로 사용
      name: "credentials",
      // 여기서 작성한 타입 그대로 아래 "authorize()"의 "credentials"의 타입 적용
      // 또한 "next-auth"에서 생성해주는 로그인창에서 사용 ( http://localhost:3000/api/auth/signin )
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
      // 로그인 요청인 "signIn("credentials", { email, password })"에서 넣어준 "id", "password"값이 그대로 들어옴
      authorize: async credentials => {
        if (!credentials) {
          throw new Error("잘못된 입력값입니다.");
        }
        const { email, password } = credentials;
        const user = await prisma.user_table.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            pro_img: true,
          },
        });
        if (!user) {
          throw new Error("Could not find user");
        }
        // const bb = JSON.parse(CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8));
        const encryptedPassword: string = CryptoJS.AES.decrypt(
          user.password,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (encryptedPassword === password) {
          const authenticatedUser: User = {
            id: user.id.toString(),
            email: user.email,
            name: user.name || null,
            image: null,
          };
          return authenticatedUser;
        } else {
          throw new Error("Could not log you in");
        }
      },
    }),
  ],
  // pages: {
  //   signOut: "/",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session }) {
      if (!session.user?.email) {
        throw new Error("No email in session");
      }

      const exUser = await prisma.user_table.findUnique({
        where: {
          email: session.user.email,
        },
        select: { id: true, email: true, name: true, pro_img: true },
      });

      // 로그인한 유저 데이터 재정의
      // 단, 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요함
      //exUser = { id : 1 }
      //session.user = {name:undefined, email:1234@1234, image:undefined,}
      if (exUser) {
        session.user = {
          id: exUser.id.toString(),
          email: exUser.email,
          name: exUser.name,
          image: null,
        };
      }
      // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
      return session;
    },
  },
});

export { handler as GET, handler as POST };
