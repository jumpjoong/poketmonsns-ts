import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchPosts } from "@/app/_store/postsSlice";
import { Posts } from "@/app/_types/postsType";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Post from "../Board/_components/Posts";
import { useUserFollowHandler } from "@/app/_hooks/useUserFollowHandler";

type BoardProps = {
  onEdit: (id: number, content: string, editMode: string) => void;
};

function Trend({ onEdit }: BoardProps) {
  const user = useAppSelector(state => state.user.user);
  const posts = useAppSelector(state => state.posts.posts);
  const followingUser = useAppSelector(state => state.following.userFollowing);
  const [hotPosts, setHotPosts] = useState<Posts[]>([]);
  const dispatch = useAppDispatch();
  const [render, setRender] = useState(false);
  const userFollowHandler = useUserFollowHandler();

  useEffect(() => {
    //비동기 처리하니 내가 원하는 로직이 나오긴 함..다만 생각보다 더 느릴 뿐..
    const test = async () => {
      if (user && posts !== null) {
        await dispatch(fetchPosts(user.id));
        //여기를 어째 조지노 하..
        // const sortPosts = [...posts].sort(
        //   (a, b) => b.like_count - a.like_count
        // );
        // const slicePosts = sortPosts.slice(0, 5);
        // setHotPosts(slicePosts);
      }
      setRender(true);
    };

    test();
  }, [user]);
  if (render === false) {
    return <div>로딩중</div>;
  } else if (posts !== null) {
    return [...posts]
      .sort((a, b) => b.like_count - a.like_count)
      .slice(0, 5)
      .map(posts => {
        return (
          <Post
            posts={posts}
            key={posts.id}
            onEdit={onEdit}
            isFollow={
              followingUser.some(obj => obj.following_id === posts.user_id) ||
              false
            }
            userFollowHandler={userFollowHandler}
          />
        );
      });
    // return hotPosts.map(posts => {
    //   return (
    //     <Post
    //       posts={posts}
    //       key={posts.id}
    //       onEdit={onEdit}
    //       isFollow={
    //         followingUser.some(obj => obj.following_id === posts.user_id) ||
    //         false
    //       }
    //       userFollowHandler={userFollowHandler}
    //     />
    //   );
    // });
  }
}

export default Trend;
