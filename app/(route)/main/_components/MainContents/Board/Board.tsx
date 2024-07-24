import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchPosts, follow, unfollow } from "@/app/_store/postsSlice";
import React, { useEffect, useState } from "react";
import style from "@/_styles/board.module.scss";
import Posts from "./_components/Posts";
import Image from "next/image";
type FollowingType = {
  id: number;
  follower_id: number;
  following_id: number;
};

type BoardProps = {
  onEdit: (id: number, content: string, editMode: string) => void;
};

function Board({ onEdit }: BoardProps) {
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts);
  const followingUser = useAppSelector(state => state.following);
  const [following, setFollowing] = useState<FollowingType[]>([]); //서버와 통신하기 싫어서 만듦
  const userStatus = useAppSelector(state => state.user.status);
  const [followControl, setFollowControl] = useState(true); //전체글, 팔로우 글
  const dispatch = useAppDispatch();

  const userFollowHandler = async (
    postsUserId: number,
    postsId: number,
    postsUserData: {}
  ) => {
    //following_id = 내가 팔로우 할 아이디
    //follwer_id = 자신
    //postsUserId = 클릭한 posts의 userId
    await fetch(`/api/follow`, {
      method: "POST",
      body: JSON.stringify({
        following_id: postsUserId,
        follower_id: user?.id,
      }),
    });
    //isFollowing = 팔로우 중인지 boolean으로 반환
    const isFollowing = following.some(
      follow => follow.following_id === postsUserId
    );
    if (isFollowing) {
      //언팔
      const updatedLocalFollowing = following.filter(
        follow => follow.following_id !== postsUserId
      );
      setFollowing(updatedLocalFollowing);
      //팔로우 리스트 컴포넌트에서 사용 중이여서 store값도 업데이트 해줘야함
      dispatch(
        unfollow({
          userId: user?.id,
          followingId: postsUserId,
          updatedLocalFollowing,
        })
      );
    } else {
      //팔로우 로직
      const updatedLocalFollowing = [
        ...following,
        {
          id: postsId,
          follower_id: user!.id,
          following_id: postsUserId,
          following: postsUserData,
        },
      ];
      setFollowing(updatedLocalFollowing);
      //팔로우 리스트 컴포넌트에서 사용 중이여서 store값도 업데이트 해줘야함
      dispatch(
        follow({
          userId: user?.id,
          followingId: postsUserId,
          updatedLocalFollowing,
        })
      );
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    //초깃값 설정하는 대체제를 이거보다 좋은 방법을 모르겠음...
    if (followingUser.status === "succeeded") {
      setFollowing(followingUser.userFollowing);
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
                  following.some(obj => obj.following_id === posts.user_id) ||
                  false
                }
                userFollowHandler={userFollowHandler}
                onEdit={onEdit}
              />
            ))
          ) : following.length === 0 ? (
            <li>팔로잉을 한 사람이 없습니다! 팔로잉을 해주세요!</li>
          ) : (
            posts.posts
              .filter(posts =>
                following.some(obj => posts.user_id === obj.following_id)
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
