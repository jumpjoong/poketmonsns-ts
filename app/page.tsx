"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import style from "@/app/(route)/sign/sign.module.scss";

export default function Home() {
  //session을 없애면 에러가 나옴 구조 분해 할당으로 인해서.
  const { data: session, status } = useSession();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [formStatus, setFormStatus] = useState();
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    //signIn 함수를 사용하여 자체 로그인 요청을 보냅니다.
    const result = await signIn("credentials", {
      // redirect false - 오류 발생시 화면 새로고침 하지 않고 그대로 정지
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    console.log(result);
    if (result?.ok) {
      // setFormStatus(`Log in Success!`);
      // location.replace("/main");
      console.log("로그인성공");
    } else {
      console.log(result?.error);
      // setFormStatus(`Error Occured : ${result.error}`);
    }
  };

  if (status === "authenticated") {
    //로그인 상태라면 아마 main컴포넌트를 하나 만들어서 거기서 작업해야할듯
    //(route폴더에는 main만 있으면 끝 나머지는 components로 빼면 됨)
    return (
      <main className={style.sign_main}>
        <div className={style.sign_form_box}>
          <p>Welcome, {session.user?.email}</p>
          <button
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </button>
        </div>
      </main>
    );
  } else if (status === "unauthenticated") {
    //로그인 상태가 아니라면 밑의 코드를 보여줌
    return (
      <main className={style.sign_main}>
        <div className={style.sign_form_box}>
          <p> Sign in </p>
          <form onSubmit={submitHandler}>
            <p>
              <input
                ref={emailInputRef}
                type="email"
                placeholder="email"
                name="email"
                autoComplete="off"
              ></input>
            </p>
            <p>
              <input
                ref={passwordInputRef}
                type="password"
                placeholder="password"
                name="password"
                autoComplete="off"
              ></input>
            </p>
            <p>
              <input type="submit" value="로그인" />
            </p>
          </form>
        </div>
      </main>
    );
  }
}
