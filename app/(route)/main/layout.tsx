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
    }
  }, [session]);
  if (status === "authenticated") {
    //인증 되었을 때 처음 사용자 정보 받아오기
    if (session.user.accessToken) {
      dispatch(
        fetchUser({
          userId: session.user.id,
          accessToken: session.user.accessToken,
        })
      );
    }
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
}

export default layout;
