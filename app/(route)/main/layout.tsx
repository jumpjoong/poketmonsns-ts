"use client";
import { Props } from "@/app/_types/reactNode";
import React, { useEffect } from "react";
import style from "@/app/_styles/main.module.scss";
import Nav from "./_components/Nav/Nav";
import Header from "./_components/Header/Header";
import Profile from "./_components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/app/_hooks/hooks";
import { fetchUser } from "@/app/_store/userSlice";

function layout({ children }: Props) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    //로그인 안하고 접속 시 바로 이동
    if (status === "unauthenticated") {
      location.replace("/");
    } else if (status === "authenticated" && session.user.accessToken) {
      // 인증되었고 access 토큰이 있을경우 실행
      //여기 로직 추가로 진행해야함
      dispatch(
        fetchUser({
          userId: session.user.id,
          accessToken: session.user.accessToken,
        })
      );
    }
  }, [session, status]);
  return (
    <>
      <Header />
      <main className={style.layout_main}>
        <Nav />
        {children}
        <Profile />
      </main>
    </>
  );
}

export default layout;
