import React from "react";
import style from "@/_styles/loading.module.scss";
import Image from "next/image";
function Loading() {
  return (
    <div className={style.load}>
      <Image
        width={352}
        height={300}
        priority
        src="/img/loadimg/pika_heart.webp"
        alt="로딩 이미지"
      />
    </div>
  );
}

export default Loading;
