import { useAppSelector } from "@/app/_hooks/hooks";
import React, { useState } from "react";
import Posts from "../Board/_components/Posts";
function MyPosts() {
  const myPost = useAppSelector(state => state.user.user);
  const [infoMode, setInfoMode] = useState<Number | null>(null); //점자 컨트롤

  const toggleInfoMode = (postId: number) => {
    setInfoMode(prevId => (prevId === postId ? null : postId));
  };

  return (
    <>
      {myPost?.my_posts.map((posts, key) => {
        return (
          <Posts
            posts={posts}
            key={key}
            infoMode={infoMode === posts.id}
            toggleInfoMode={() => toggleInfoMode(posts.id)}
          />
        );
      })}
    </>
  );
}

export default MyPosts;
