import React, { useState } from "react";
import style from "@/_styles/posts.module.scss";
import { useAppSelector } from "@/_hooks/hooks";
import { useSession } from "next-auth/react";
import moment from "moment-timezone";
import { PostsProps } from "@/_types/postsType";

const Posts = ({ posts }: PostsProps) => {
  const { data: session, status } = useSession();
  const user = useAppSelector(state => state.user.user);
  const [infoMode, setInfoMode] = useState(false);
  const [likeCount, setLikeCount] = useState(posts.like_count);
  const [isLike, setIsLike] = useState(
    posts.like_post.some(obj => obj.user_id === user?.id)
  );
  const date = moment(posts.date).utc().tz("Asia/Seoul").fromNow();
  const handleLike = async () => {
    // 좋아요 컨트롤
    const response = await fetch(`/api/likecount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user?.id, post_id: posts.id }),
    });
    const data = await response.json();
    if (data.ok) {
      setIsLike(!isLike);
      if (data.message === "좋아요삭제") {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
    } else {
      //좋아요 에러 날 경우 초기 상태로 변환
      setIsLike(isLike);
      console.log(data.error);
    }
  };
  const dataDelete = () => {
    //데이터 삭제
    console.log("데이터 수정삭제", posts);
  };
  const dataUpdate = () => {
    //데이터 수정
    console.log("데이터 수정삭제", posts);
  };
  const userFollowHandlerHandler = () => {
    console.log("팔로우핸들러", posts.user_id);
  };
  return (
    user &&
    session && (
      <li className={style.detail_list} key={posts.id}>
        <div className={style.profileInfo}>
          <div className={style.profile_info_wrap}>
            <div className={style.profile_img}>
              <img
                src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`}
                alt=""
              />
            </div>
            <div>
              <p className={style.user}>{user.name}</p>
              <p className={style.date}>{date}</p>
            </div>
          </div>
          <section className={style.btn_m}>
            <p>{posts.like_count}</p>
            {/* <button
              className={
                posts.like_post.some(obj => obj.user_id === user.id)
                  ? style.fillheart
                  : style.heart
              }
              onClick={handleLike}
            ></button> */}
          </section>
          <div
            className={style.info_mod_wrap}
            onClick={() => setInfoMode(!infoMode)}
          >
            <svg
              width="4"
              height="20.5"
              viewBox="0 0 8 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 32.9853C6.20641 32.9853 8 34.7789 8 36.9853C8 39.1917 6.20641 40.9853 4 40.9853C1.79359 40.9853 0 39.1917 0 36.9853C0 34.7789 1.79359 32.9853 4 32.9853ZM4 16.9853C6.20641 16.9853 8 18.7789 8 20.9853C8 23.1917 6.20641 24.9853 4 24.9853C1.79359 24.9853 0 23.1917 0 20.9853C0 18.7789 1.79359 16.9853 4 16.9853ZM4 0.985352C6.20641 0.985352 8 2.77894 8 4.98535C8 7.19174 6.20641 8.98535 4 8.98535C1.79359 8.98535 0 7.19174 0 4.98535C0 2.77894 1.79359 0.985352 4 0.985352Z"
                fill="#E36E6E"
              />
            </svg>
            {session.user.id !== posts.user_id ? (
              <div
                className={
                  infoMode
                    ? `${style.info_mod_btn_wrap} ${style.on}`
                    : style.info_mod_btn_wrap
                }
              >
                <p
                  className={style.follow}
                  // onClick={() =>
                  //   userFollowHandlerHandler(
                  //     myfollowlist.includes(posts.user_id.toString())
                  //   )
                  // }
                >
                  {/* {myfollowlist.includes(posts.user_id.toString())
                    ? "언팔로우"
                    : "팔로우"} */}
                </p>
              </div>
            ) : (
              <div
                className={
                  infoMode
                    ? `${style.info_mod_btn_wrap} ${style.on}`
                    : style.info_mod_btn_wrap
                }
              >
                <p className={style.update} onClick={() => dataUpdate()}>
                  수정
                </p>
                <p className={style.remove} onClick={() => dataDelete()}>
                  삭제
                </p>
              </div>
            )}
          </div>
        </div>
        <pre className={style.detail}>{posts.content}</pre>
        <section className={style.btn}>
          <p>{likeCount}</p>
          <button
            className={isLike ? style.fillheart : style.heart}
            onClick={handleLike}
          ></button>
        </section>
      </li>
    )
  );
};

export default Posts;
