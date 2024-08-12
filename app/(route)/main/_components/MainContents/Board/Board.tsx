import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchPosts } from "@/app/_store/postsSlice";
import React, { useEffect, useState } from "react";
import style from "@/_styles/board.module.scss";
import Posts from "./_components/Posts";
import Image from "next/image";
import { setInitialLocalFollowing } from "@/app/_store/followSlice";
import { useUserFollowHandler } from "@/app/_hooks/useUserFollowHandler";

type BoardProps = {
  onEdit: (id: number, content: string, editMode: string) => void;
};

function Board({ onEdit }: BoardProps) {
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts);
  const followingUser = useAppSelector(state => state.following);
  const localFollow = useAppSelector(
    state => state.localFollowReducer.following
  );
  const userStatus = useAppSelector(state => state.user.status);
  const [followControl, setFollowControl] = useState(true); //전체글, 팔로우 글
  const dispatch = useAppDispatch();
  const userFollowHandler = useUserFollowHandler();

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    //초깃값 설정하는 대체제를 이거보다 좋은 방법을 모르겠음...
    if (followingUser.status === "succeeded") {
      dispatch(setInitialLocalFollowing(followingUser.userFollowing));
    }
  }, [followingUser]);
  if (
    posts.posts === null ||
    posts.status === "loading" ||
    userStatus === null ||
    userStatus === "loading"
  ) {
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
  } else {
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
          {posts.posts.length === 0 ? (
            <li>글이 없습니다!</li>
          ) : followControl ? (
            posts &&
            posts.posts.map(posts => (
              <Posts
                posts={posts}
                key={posts.id}
                id={`post-${posts.id}`}
                isFollow={
                  localFollow.some(obj => obj.following_id === posts.user_id) ||
                  false
                }
                userFollowHandler={userFollowHandler}
                onEdit={onEdit}
              />
            ))
          ) : localFollow.length === 0 ? (
            <li>팔로잉을 한 사람이 없습니다! 팔로잉을 해주세요!</li>
          ) : (
            posts.posts
              .filter(posts =>
                localFollow.some(obj => posts.user_id === obj.following_id)
              )
              .map(posts => (
                <Posts
                  posts={posts}
                  key={posts.id}
                  isFollow={true}
                  userFollowHandler={userFollowHandler}
                />
              ))
          )}
        </ul>
      </div>
    );
  }
}

export default Board;
