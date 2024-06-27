import { useAppDispatch } from "@/app/_hooks/hooks";
import { fetchPosts } from "@/app/_store/postsSlice";
import React, { useEffect } from "react";

function Posts() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return <div>포스트입니다</div>;
}

export default Posts;
