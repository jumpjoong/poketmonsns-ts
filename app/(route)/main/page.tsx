"use client";

import React from "react";
import MainContents from "./_components/MainContents/MainContents";
import style from "../../_styles/mainContentsWrap.module.scss";

function Main() {
  return (
    <div className={style.main_contents_wrap}>
      <MainContents />;
    </div>
  );
}

export default Main;
