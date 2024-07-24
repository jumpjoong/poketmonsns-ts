import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import React, { useEffect } from "react";
import FollowList from "./_components/FollowList";
import { fetchPosts } from "@/app/_store/postsSlice";

function Following() {
  const user = useAppSelector(state => state.user.user);
  const userFollowing = useAppSelector(state => state.following.userFollowing);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(fetchPosts(user!.id));
    };
  }, [dispatch]);

  if (userFollowing.length === 0) {
    return <p>팔로우 유저가 없습니다</p>;
  } else {
    return userFollowing.map(following => {
      return (
        <FollowList
          following={following.following}
          key={following.following.id}
        />
      );
    });
  }
}

export default Following;
