"use client";
import React, { useRef, useState } from "react";
import Style from "@/app/components/sign/Signin";
import { useSession, signIn } from "next-auth/react";

const Signin = () => {
  const [formStatus, setFormStatus] = useState();
  const { data: session, status } = useSession();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    const result = await signIn("credentials", {
      // redirect false - 오류 발생시 화면 새로고침 하지 않고 그대로 정지
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result?.error) {
      // setFormStatus(`Log in Success!`);
      // location.replace("/main");
      console.log("로그인성공");
    } else {
      console.log(result?.error);
      // setFormStatus(`Error Occured : ${result.error}`);
    }
  };

  if (status === "authenticated") {
    //
    // location.replace("/");
    console.log("로그인 성공");
  } else if (status === "unauthenticated") {
    return (
      <>
        <main className={Style.sign_main}>
          <div className={Style.sign_form_box}>
            <p> Sign in </p>
            <form onSubmit={submitHandler}>
              <p>
                <input
                  ref={emailInputRef}
                  type="email"
                  placeholder="email"
                  name="email"
                  autoComplete="none"
                ></input>
              </p>
              <p>
                <input
                  ref={passwordInputRef}
                  type="password"
                  placeholder="password"
                  name="password"
                ></input>

                <span>{formStatus}</span>
              </p>
              <p>
                <input type="submit" value="Sign in"></input>
              </p>
            </form>
          </div>
        </main>
      </>
    );
  }
};

export default Signin;
