import React, { useState } from "react";
import style from "@/_styles/followlist.module.scss";
import { Author } from "@/app/_types/userType";
import { useAppSelector } from "@/app/_hooks/hooks";
import { useUserFollowHandler } from "@/app/_hooks/useUserFollowHandler";

interface favoriteUserType {
  following: Author;
}

function FollowList({ following }: favoriteUserType) {
  const user = useAppSelector(state => state.user.user);
  const localFollowList = useAppSelector(
    state => state.localFollowReducer.following
  );
  const [followList, setFollowList] = useState(
    localFollowList.some(obj => obj.following.id === following.id)
  );

  const followHandler = async (following: Author) => {
    setFollowList(!followList);
    await fetch(`/api/follow`, {
      method: "POST",
      body: JSON.stringify({
        follower_id: user?.id,
        following_id: following.id,
      }),
    });
  };

  return (
    <div key={following.id} className={style.follow_list}>
      <div className={style.follow_list_pro_img}>
        <img
          src={`/img/poke_profile_img/pokballpixel-${following.pro_img}.png`}
          alt=""
        ></img>
      </div>
      <div className={style.follow_list_info}>
        <p className={style.follow_list_name}>
          {following.name === "" ? "설정된 이름이 없습니다." : following.name}
        </p>
        <p className={style.follow_list_email}>@{following.email}</p>
      </div>
      <div
        className={`${style.follow_button} ${followList ? style.fill : ""}`}
        onClick={() => followHandler(following)}
      >
        {followList ? <p>팔로우</p> : <p>언팔로우</p>}
      </div>
    </div>
  );
}

export default FollowList;
