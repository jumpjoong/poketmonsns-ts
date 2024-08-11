import { useAppDispatch } from "@/app/_hooks/hooks";
import { setContent } from "@/app/_store/mainContentsSlice";
import { useSession } from "next-auth/react";
import style from "@/_styles/tutorial.module.scss";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { fetchUser } from "@/app/_store/userSlice";

function Tutorial() {
  const { data: session, status } = useSession();
  const [nickname, setNickName] = useState("");
  const dispatch = useAppDispatch();

  const changeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const nickSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(`api/tutorial`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user.id,
        contents: nickname,
      }),
    });
    const res = await response.json();

    if (res.ok && session?.user.accessToken) {
      dispatch(
        fetchUser({
          userId: session.user.id,
          accessToken: session.user.accessToken,
        })
      );
      dispatch(setContent("Board"));
    }
  };

  return (
    <div className={style.tuto_second}>
      <p>당신의 닉네임을 입력해주세요</p>
      <form className={style.tuto_second_form} onSubmit={nickSubmit}>
        <p>
          <input
            value={nickname}
            onChange={changeNickName}
            type="text"
            name="name"
            placeholder="name"
            autoComplete="off"
          />
        </p>
        <p>
          <input type="submit" value={"확인"}></input>
        </p>
      </form>
    </div>
  );
}
export default Tutorial;
