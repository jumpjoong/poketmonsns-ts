import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchPosts } from "@/app/_store/postsSlice";
import React, { useEffect, useState } from "react";
import style from "@/_styles/board.module.scss";
import Posts from "@/app/_components/Posts";
function Board() {
  const posts = useAppSelector(state => state.posts.posts);
  const [followControl, setFollowControl] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  if (posts === null)
    return (
      <div className={style.load}>
        <img src="/img/loadimg/pika_heart.webp" alt="로딩 이미지" />
      </div>
    );
  else {
    return (
      <div className={style.postsBox}>
        <div className={style.posts_btn_box}>
          <button
            className={followControl ? style.on : ""}
            type="button"
            onClick={() => setFollowControl(true)}
          >
            전체
          </button>
          <button
            className={followControl ? "" : style.on}
            type="button"
            onClick={() => setFollowControl(false)}
          >
            팔로우
          </button>
        </div>
        <ul>
          {posts === null ? (
            <>팔로우한 사람이 없습니다.</>
          ) : (
            posts &&
            posts.map((posts, key) => <Posts posts={posts} key={key} />)
          )}
        </ul>
      </div>
    );
  }
}

export default Board;
