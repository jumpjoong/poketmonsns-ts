import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchPosts } from "@/app/_store/postsSlice";
import React, { useEffect, useState } from "react";
import style from "@/_styles/board.module.scss";
import Posts from "./_components/Posts";
import Loading from "../../Loading/Loading";

type BoardProps = {
  onEdit: (id: number, content: string, editMode: string) => void;
};

function Board({ onEdit }: BoardProps) {
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts);
  const localFollow = useAppSelector(
    state => state.localFollowReducer.following
  );
  const userStatus = useAppSelector(state => state.user.status);
  const [followControl, setFollowControl] = useState(true); //전체글, 팔로우 글
  const [infoMode, setInfoMode] = useState<Number | null>(null); //점자 컨트롤
  const dispatch = useAppDispatch();

  const toggleInfoMode = (postId: number) => {
    setInfoMode(prevId => (prevId === postId ? null : postId));
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts());
    }
  }, [user]);
  if (
    posts.posts === null ||
    posts.status === "loading" ||
    userStatus === null ||
    userStatus === "loading"
  ) {
    return <Loading />;
  } else {
    return (
      <div className={style.postsBox}>
        <div className={style.posts_btn_box}>
          <button
            className={followControl ? style.on : ""}
            type="button"
            onClick={() => {
              setFollowControl(true), setInfoMode(null);
            }}
          >
            전체
          </button>
          <button
            className={followControl ? "" : style.on}
            type="button"
            onClick={() => {
              setFollowControl(false), setInfoMode(null);
            }}
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
                isFollow={localFollow.some(
                  obj => obj.following_id === posts.user_id
                )}
                onEdit={onEdit}
                infoMode={infoMode === posts.id}
                toggleInfoMode={() => toggleInfoMode(posts.id)}
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
                  infoMode={infoMode === posts.id}
                  toggleInfoMode={() => toggleInfoMode(posts.id)}
                />
              ))
          )}
        </ul>
      </div>
    );
  }
}

export default Board;
