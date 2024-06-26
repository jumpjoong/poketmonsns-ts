import { Props } from "@/app/_types/reactNode";
import React from "react";
import style from "@/app/_styles/main.module.scss";
import Nav from "./_components/Nav";
import Header from "./_components/Header";
import Profile from "./_components/Profile";

function layout({ children }: Props) {
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
