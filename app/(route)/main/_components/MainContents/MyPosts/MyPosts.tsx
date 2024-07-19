import { useAppSelector } from "@/app/_hooks/hooks";
import React from "react";
import Posts from "../Board/_components/Posts";

function MyPosts() {
  const myPost = useAppSelector(state => state.user.user);
  return (
    <>
      {myPost?.my_posts.map((posts, key) => {
        return <Posts posts={posts} key={key} />;
      })}
    </>
  );
}

export default MyPosts;
