"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import style from "@/app/_styles/sign.module.scss";

export default function Home() {
  //session을 없애면 에러가 나옴 구조 분해 할당으로 인해서?
  const { data: session, status } = useSession();
  //false일 때 로그인, true일 때 회원가입폼
  const [loginRegister, setloginRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errorHandling, setErrorHandling] = useState("");
  //아이디 받아오기
  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  //비밀번호 받아오기
  const onPwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  //로그인 및 회원가입 폼
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginRegister) {
      //회원가입
      try {
        const register = await fetch(`/api/register`, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: pw,
          }),
        });
        const res = await register.json();
        setloginRegister(!loginRegister);
        setEmail("");
        setPw("");
      } catch (error) {
        console.log(error);
      }
    } else {
      //로그인
      const result = await signIn("credentials", {
        // redirect false - 오류 발생시 화면 새로고침 하지 않고 그대로 정지
        redirect: false,
        email: email,
        password: pw,
      });
      if (result?.ok) {
        // location.replace("/main");
      } else if (result?.error) {
        setErrorHandling(result.error);
      }
    }
  };
  const loginRegisterHandler = async () => {
    setloginRegister(!loginRegister);
    setErrorHandling("");
    setEmail("");
    setPw("");
  };
  if (session) {
    location.replace("/main");
    return null;
  }
  return (
    <main className={style.sign_main}>
      <div className={style.sign_form_box}>
        <p> {loginRegister ? "회원가입" : "로그인"} </p>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={onIdHandler}
          ></input>
          <input
            type="password"
            placeholder="password"
            name="password"
            autoComplete="off"
            value={pw}
            onChange={onPwHandler}
          ></input>
          {errorHandling}
          {loginRegister ? <button>회원가입</button> : <button>로그인</button>}
        </form>
        <p onClick={loginRegisterHandler}>
          {loginRegister ? "로그인" : "회원가입"}
        </p>
      </div>
    </main>
  );
}
