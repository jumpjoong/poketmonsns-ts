"use client";
import { Props } from "@/app/_types/reactNode";
import React, { useEffect } from "react";
import style from "@/app/_styles/main.module.scss";
import Nav from "./_components/Nav";
import Header from "./_components/Header";
import Profile from "./_components/Profile";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchUser } from "@/app/_store/userSlice";

function layout({ children }: Props) {
  const { data: session, status } = useSession();
  const userStatus = useAppSelector(state => state.user.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //로그인 안하고 접속 시 바로 이동
    if (status === "unauthenticated") {
      location.replace("/");
    }
    if (session?.user.id && session.user.accessToken) {
      dispatch(
        fetchUser({
          userId: session.user.id,
          accessToken: session.user.accessToken,
        })
      );
    }
  }, [status]);
  //redux로 사용자 정보 담아놓고 redux에 저장된 값을 통해서 화면 바꾸기
  if (userStatus === "loading") {
    return (
      <div>
        <img src="/img/loadimg/pika_heart.webp" alt="로딩 이미지" />
      </div>
    );
  } else if (userStatus === "succeeded") {
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
