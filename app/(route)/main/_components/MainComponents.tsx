"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import style from "@/app/_styles/testScss.module.scss";
import { fetchUser } from "@/app/_store/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";

function MainComponents() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const userStatus = useAppSelector(state => state.user.error);
  useEffect(() => {
    if (session?.user.id && session.user.accessToken) {
      dispatch(
        fetchUser({
          userId: session.user.id,
          accessToken: session.user.accessToken,
        })
      );
    }
  }, [session?.user.accessToken]);
  return (
    session && (
      <div className={style.testScss}>
        <p>Welcome, {user && user.name}</p>
        <button
          onClick={() => {
            signOut({ callbackUrl: "/", redirect: true });
          }}
        >
          로그아웃
        </button>
      </div>
    )
  );
}

export default MainComponents;
