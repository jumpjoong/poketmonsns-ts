"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import style from "@/app/_styles/main.module.scss";
import userHandler from "./getUserData/getUserData";

function MainComponents() {
  const { data: session, status } = useSession();
  //session: undefined, null
  //status: authenticated, loading, unauthenticated
  const fetchData = () => {
    if (session?.user.id && session.user.accessToken) {
      userHandler({
        userId: session.user.id,
        accessToken: session.user.accessToken,
      });
    }
  };
  return (
    session && (
      <main className={style.sign_main}>
        <div className={style.sign_form_box}>
          <button onClick={fetchData}>데이터 불러오기</button>
          <p>Welcome, {session?.user?.name}</p>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/", redirect: true });
            }}
          >
            로그아웃
          </button>
        </div>
      </main>
    )
  );
}

export default MainComponents;
