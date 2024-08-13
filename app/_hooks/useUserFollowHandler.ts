import { useAppDispatch, useAppSelector } from "./hooks";
import { localUnfollow, updateLocalFollow } from "../_store/followSlice";
import { follow, unfollow } from "../_store/postsSlice";
import { Author } from "../_types/userType";

export const useUserFollowHandler = () => {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const localFollow = useAppSelector(
    state => state.localFollowReducer.following
  );

  const userFollowHandler = async (
    postsUserId: number,
    postsId: number,
    postsUserData: Author
  ) => {
    await fetch(`/api/follow`, {
      method: "POST",
      body: JSON.stringify({
        following_id: postsUserId,
        follower_id: user?.id,
      }),
    });
    //isFollowing = 팔로우 중인지 boolean으로 반환
    const isFollowing = localFollow.some(
      follow => follow.following_id === postsUserId
    );

    if (isFollowing) {
      //언팔
      const updatedLocalFollowing = localFollow.filter(
        follow => follow.following_id !== postsUserId
      );
      dispatch(localUnfollow({ followingId: postsUserId }));
      //팔로우 리스트 컴포넌트에서 사용 중이여서 store값도 업데이트 해줘야함
      dispatch(
        unfollow({
          userId: user!.id,
          followingId: postsUserId,
          updatedLocalFollowing,
        })
      );
    } else {
      //팔로우 로직
      const followData = {
        id: postsId,
        follower_id: user!.id,
        following_id: postsUserId,
        following: {
          ...postsUserData,
          followers: [
            {
              id: user!.id,
              email: user!.email,
              name: user!.name,
              pro_img: user!.pro_img,
            },
          ],
        },
      };
      const updatedLocalFollowing = [...localFollow, followData];
      dispatch(updateLocalFollow(updatedLocalFollowing));
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
  return userFollowHandler;
};
