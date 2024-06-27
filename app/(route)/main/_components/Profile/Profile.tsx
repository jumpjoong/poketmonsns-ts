"use client";
import React, { useState } from "react";
import style from "@/app/_styles/profile.module.scss";
import { useAppSelector } from "@/app/_hooks/hooks";
import { signOut } from "next-auth/react";
function Profile() {
  const user = useAppSelector(state => state.user.user);
  const [badgeModModal, setBadgeModModal] = useState();
  const [mylist, setMylist] = useState([]);
  const BadgeFunc = (key: number) => {
    console.log(key);
  };
  const selectBadge = (key: HTMLElement) => {
    // setBadgeModModal(false);
    // badges[prekey] = key;
    // // 이걸 서버로 전송해야함
    // axios.put("/api/auth/who", {
    //   id: who.id,
    //   data: badges,
    // });
  };
  const profileBtnClick = () => {
    // if (pageStatus !== "NEWBIE") setPageStatus("PROFILE");
  };
  const followBtnClick = () => {
    // if (pageStatus !== "NEWBIE") setPageStatus("FOLLOW");
  };
  return (
    <>
      {user && (
        <aside className={style.profile_container}>
          <div className={style.profile_wrapper}>
            <div className={style.profile_wrap}>
              <div className={style.profile_user_wrap}>
                <div className={style.profile_img_wrap}>
                  {
                    <img
                      src={`/img/poke_profile_img/pokballpixel-${user.pro_img}.png`}
                      alt="포켓볼"
                    />
                  }
                </div>
                <div className={style.profile_info_wrap}>
                  <div className={style.profile_name}>
                    {user.name == "" ? "너의 이름은..." : user.name}
                  </div>
                  <div className={style.profile_email}>
                    <div>
                      <b>&nbsp;</b>
                      <small>{user.email}</small>
                    </div>
                    <div>
                      <div className={style.coin_img_wrap}>
                        <img src="/img/poke_coin_pixel.png" alt=""></img>
                      </div>
                      <span>{user.credit}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.profile_badge_wrap}>
                {user.badge_list &&
                  user.badge_list.map((badge, key) => {
                    return badge === null ? (
                      <div
                        key={key}
                        className={style.profile_badge_img_wrap}
                        onClick={() => BadgeFunc(key)}
                      >
                        <img
                          className={style.profile_badge_img_empty}
                          src="/img/poke-face-silueta.png"
                          alt="emptybadge"
                        ></img>
                      </div>
                    ) : (
                      <div
                        key={key}
                        className={style.profile_badge_img_wrap}
                        onClick={() => BadgeFunc(key)}
                      >
                        <img
                          src="/img/poke-face.png"
                          alt="pokebadge"
                          style={{
                            transform: `translateX(calc(-${
                              100 * ((badge % 12 === 0 ? 12 : badge % 12) - 1)
                            }% / 12)) translateY(calc(-${
                              100 * (Math.ceil(badge / 12) - 1)
                            }% / 13))`,
                          }}
                        ></img>
                      </div>
                    );
                  })}
                <div
                  className={
                    badgeModModal
                      ? `${style.profile_badge_modal} ${style.on}`
                      : style.profile_badge_modal
                  }
                >
                  {mylist.map((list, key) => {
                    return (
                      <div
                        key={key}
                        className={style.modal_img_wrap}
                        onClick={() => selectBadge(list)}
                      >
                        <img
                          src="/img/poke-face.png"
                          alt="modal image"
                          style={{
                            transform: `translateX(calc(-${
                              100 * ((list % 12 === 0 ? 12 : list % 12) - 1)
                            }% / 12)) translateY(calc(-${
                              100 * (Math.ceil(list / 12) - 1)
                            }% / 13))`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={style.profile_menu_wrap}>
              <p onClick={profileBtnClick}>프로필 수정</p>
              <p onClick={followBtnClick}>팔로우</p>
              <p
                onClick={() => {
                  signOut({ callbackUrl: "/", redirect: true });
                }}
              >
                로그아웃
              </p>
            </div>
          </div>
          <div className={style.rep_wrap}>
            <div className={style.rep_ring}></div>
            {user.rep == 0 ? (
              <img src="/img/poke_silueta.png" alt=""></img>
            ) : (
              <img src="/img/poke_silueta.png" alt=""></img>
              // mysql poke_table에 motion_url있음
              // <img src={pokedata && pokedata.motion_url} alt=""></img>
            )}
          </div>
        </aside>
      )}
    </>
  );
}

export default Profile;
