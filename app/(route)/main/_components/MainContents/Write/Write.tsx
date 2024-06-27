import React, { FormEvent } from "react";
import style from "@/_styles/write.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { selectsPost } from "@/app/_store/mainContentsSlice";
import { fetchUser } from "@/app/_store/userSlice";
import { useSession } from "next-auth/react";
function Write() {
  const { data: session, status } = useSession();
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  //작성글 db저장 및 크레딧 올리고 user정보 다시 가져옴
  const create = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = form.elements.namedItem("content") as HTMLTextAreaElement;
    await fetch(`/api/write`, {
      method: "POST",
      body: JSON.stringify({
        content: formData.value,
        user_id: user?.id,
        credit: user?.credit,
      }),
    });
    if (user?.id && session?.user.accessToken) {
      dispatch(
        fetchUser({ userId: user.id, accessToken: session.user.accessToken })
      );
    }
    dispatch(selectsPost());
  };
  return (
    <div>
      <form className={style.Contenteditor} onSubmit={create}>
        <div className={style.profile}>
          <div className={style.pro_img}>
            <img
              src={`/img/poke_profile_img/pokballpixel-001.png`}
              alt=""
            ></img>
          </div>
        </div>
        <div className={style.textBox}>
          <textarea name="content" placeholder="무슨 일이 있었나요?" />
          <section>
            <button
              className={style.Dbtn}
              onClick={() => location.replace("/")}
            >
              취소
            </button>
            <button className={style.Cbtn} type={"submit"}>
              완료
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}

export default Write;
