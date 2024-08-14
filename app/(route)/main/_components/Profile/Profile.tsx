"use client";
import React, { useEffect, useState } from "react";
import style from "@/app/_styles/profile.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { setContent } from "@/app/_store/mainContentsSlice";
import { setSearchQuery } from "@/app/_store/searchUserName";

function Profile() {
  const user = useAppSelector(state => state.user.user);
  const [badgeModModal, setBadgeModModal] = useState(false);
  const [selectBadgeIndex, setSelectBadgeIndex] = useState<number>(-1);
  const [mylist, setMylist] = useState<number[]>([]);
  const [badgeList, setBadgeList] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const BadgeFunc = (key: number) => {
    setSelectBadgeIndex(key);
    setBadgeModModal(!badgeModModal);
  };

  const selectBadge = async (key: number) => {
    if (user) {
      const updateBadge: number[] = [...badgeList];

      updateBadge[selectBadgeIndex] = key;

      const response = await fetch(`/api/changeprofilebadge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          badge_list: updateBadge,
        }),
      });
      const res = await response.json();

      if (res.ok) {
        setBadgeList(res.data.badge_list);
      } else {
        console.log("에러");
      }
    }
    setBadgeModModal(!badgeModModal);
  };

  const editProfileHandler = () => {
    dispatch(setContent("프로필 수정"));
  };

  const followBtnHandler = () => {
    dispatch(setSearchQuery(""));
    dispatch(setContent("팔로잉"));
  };

  useEffect(() => {
    if (user && user.my_poketmon) {
      const pokeId = user.my_poketmon.map(obj => obj.poke_id);
      setMylist(pokeId);
      setBadgeList(user.badge_list);
    }
  }, [user]);
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
                {badgeList &&
                  badgeList.map((badge, key) => {
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
                  {mylist.length > 0
                    ? mylist.map((list, key) => {
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
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className={style.profile_menu_wrap}>
              <p onClick={editProfileHandler}>프로필 수정</p>
              <p onClick={followBtnHandler}>팔로잉</p>
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
            {user.rep_motion_url == "" ? (
              <Image
                width={200}
                height={200}
                src="/img/poke_silueta.png"
                alt=""
              />
            ) : (
              <Image
                width={200}
                height={200}
                src={user.rep_motion_url}
                alt=""
              />
            )}
          </div>
        </aside>
      )}
    </>
  );
}

export default Profile;
