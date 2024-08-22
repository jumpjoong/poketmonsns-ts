import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/_hooks/hooks";
import Post from "@/_components/MainContents/Board/_components/Posts";
import Loading from "@/_components/Loading/Loading";
import { Posts } from "@/app/_types/postsType";

type BoardProps = {
  onEdit: (id: number, content: string, editMode: string) => void;
};

function Trend({ onEdit }: BoardProps) {
  const user = useAppSelector(state => state.user.user);
  const followingUser = useAppSelector(
    state => state.localFollowReducer.following
  );
  const [render, setRender] = useState(false);
  const [infoMode, setInfoMode] = useState<Number | null>(null); //점자 컨트롤
  const [hotPosts, setHotPosts] = useState<Posts[]>([]);

  const toggleInfoMode = (postId: number) => {
    setInfoMode(prevId => (prevId === postId ? null : postId));
  };

  useEffect(() => {
    const fetchLikePosts = async () => {
      const response = fetch(`/api/post-likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await (await response).json();
      const { hotPosts } = res;
      setHotPosts(hotPosts);
      setRender(true);
    };

    fetchLikePosts();
  }, [user]);

  if (render === false) {
    return <Loading />;
  } else if (hotPosts.length !== 0) {
    return hotPosts.map(posts => {
      return (
        <Post
          posts={posts}
          key={posts.id}
          onEdit={onEdit}
          isFollow={
            followingUser.some(obj => obj.following_id === posts.user_id) ||
            false
          }
          infoMode={infoMode === posts.id}
          toggleInfoMode={() => toggleInfoMode(posts.id)}
        />
      );
    });
  }
}

export default Trend;
