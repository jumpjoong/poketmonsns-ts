import { signOut, useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import style from "@/_styles/editprofile.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchUser } from "@/app/_store/userSlice";
import { setContent } from "@/app/_store/mainContentsSlice";

const EditProfile = () => {
  const { data: session, status } = useSession();
  const user = useAppSelector(state => state.user.user);
  const [profileImgArr, setProfileImgArr] = useState<string[]>([]);
  const [initialProfileImg, setInitialProfileImg] = useState(user?.pro_img);
  const [deleteModal, setDeleteModal] = useState(false);
  const [profileNameToggle, setProfileNameToggle] = useState(false);
  const [profileImgToggle, setProfileImgToggle] = useState(false);
  const [changeName, setChangeName] = useState(user?.name);
  const [confirmNickName, setConfirmNickName] = useState(user?.name);
  const regex = /[\s!@#\$%\^\&*\)\(+=._-]+/g;
  const dispatch = useAppDispatch();

  //프로필 이미지 클릭
  const profileImgMod = () => {
    setProfileImgToggle(!profileImgToggle);
  };

  //프로필 이름 변경 모달
  const profileNameMod = () => {
    setProfileNameToggle(!profileNameToggle);
  };

  //프로필 이미지 변경
  const profileImgSelect = (k: number) => {
    const chageProfileImg = (k + 1).toString().padStart(3, "0");
    setInitialProfileImg(chageProfileImg);
  };

  //닉네임 입력 받기
  const NameChanegeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(e.target.value);
  };

  //닉네임 모달 창 확인 버튼
  const profileNameModSelect = async (e: FormEvent) => {
    e.preventDefault();
    if (changeName) {
      if (regex.test(changeName)) {
        alert("공백 및 특수문자를 지워주세요!");
      } else {
        setConfirmNickName(changeName);
        setProfileNameToggle(!profileNameToggle);
      }
    } else {
      alert("이름을 입력해주세요!");
    }
  };

  //아이디 변경 모달 취소 버튼
  const modmodaloff = () => {
    setProfileNameToggle(!profileNameToggle);
  };

  //변경 버튼
  const changeUserProfileHandler = async () => {
    try {
      if (user?.id && session?.user.accessToken) {
        //닉네임 변경 되었을 때 로직
        if (changeName !== user.name) {
          const response = await fetch(`/api/changenickname`, {
            method: "POST",
            body: JSON.stringify({
              user_id: user?.id,
              nickname: changeName,
            }),
          });
          const res = await response.json();

          if (!res.ok) {
            alert(res.error);
            return;
          }
        }
        //포켓볼 이미지 변경 되었을 때
        if (user.pro_img !== initialProfileImg) {
          await fetch(`/api/changeprofileimg`, {
            method: "POST",
            body: JSON.stringify({
              user_id: user?.id,
              pro_img: initialProfileImg,
            }),
          });
        }
        dispatch(
          fetchUser({
            userId: user.id,
            accessToken: session.user.accessToken,
          })
        );
        dispatch(setContent("Board"));
      } else {
        alert("다시 로그인 해주세요!");
        window.location.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //계정 삭제 버튼
  const dataDel = () => {
    setDeleteModal(!deleteModal);
  };

  //계정 삭제 모달 버튼
  const modalCancelBtn = () => {
    setDeleteModal(!deleteModal);
  };

  const trueDelete = async () => {
    if (user && session?.user.accessToken) {
      const response = await fetch(`/api/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
      });
      const res = await response.json();

      if (res.ok) {
        signOut();
      } else {
        alert(res.error);
      }
    }
  };

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 28; i++) {
      arr.push(`pokballpixel-${i.toString().padStart(3, "0")}.png`);
    }
    setProfileImgArr(arr);
  }, []);

  if (user) {
    return (
      <div className={style.myprofile}>
        <div className={style.profile_img_wrap}>
          <img
            src={`/img/poke_profile_img/pokballpixel-${initialProfileImg}.png`}
            alt=""
          ></img>
          <div className={style.profile_img_mod} onClick={profileImgMod}>
            <img src="/img/svg/pencil.svg" alt=""></img>
          </div>

          <div
            className={
              profileImgToggle
                ? `${style.img_toggle} ${style.on}`
                : `${style.img_toggle}`
            }
          >
            <div
              className={style.img_mod_toggle_exit}
              onClick={() => setProfileImgToggle(false)}
            >
              <img src="/img/svg/cancel.svg" alt=""></img>
            </div>
            <div className={style.img_mod_list}>
              {profileImgArr &&
                profileImgArr.map((img, k) => {
                  return (
                    <div
                      key={k}
                      className={style.img_mod_img_wrap}
                      onClick={() => profileImgSelect(k)}
                    >
                      <img src={`/img/poke_profile_img/${img}`} alt=""></img>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={style.profile_info_wrap}>
          <div className={style.profile_info_name}>
            <p>{confirmNickName}</p>
            <div className={style.profile_name_mod} onClick={profileNameMod}>
              <img src="/img/svg/pencil.svg" alt=""></img>
            </div>
          </div>
          <div className={style.profile_info_email}>{user.email}</div>

          <div
            className={
              profileNameToggle
                ? `${style.profile_name_mod_toggle} ${style.on}`
                : `${style.profile_name_mod_toggle}`
            }
          >
            <form onSubmit={profileNameModSelect}>
              <p>
                <input
                  type="text"
                  name="name"
                  placeholder="변경할 이름"
                  autoComplete="off"
                  value={changeName}
                  onChange={NameChanegeHandler}
                ></input>
              </p>
              <p>
                <input type="submit" value="확인"></input>
                <input type="button" value="취소" onClick={modmodaloff}></input>
              </p>
            </form>
          </div>
        </div>
        <div className={style.profile_last_btn_wrap}>
          <button onClick={changeUserProfileHandler}>변경</button>
          <button onClick={dataDel}>계정삭제</button>
          <div
            className={
              deleteModal
                ? `${style.delete_modal} ${style.on}`
                : `${style.delete_modal}`
            }
          >
            <div className={style.delete_modal_contents}>
              <p> 정말 삭제하시겠습니까? </p>
              <div className={style.delete_modal_btn_wrap}>
                <button onClick={trueDelete}>삭제</button>
                <button onClick={modalCancelBtn}>취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <div className={style.myprofile_load}>
      <img src="/img/loadimg/pika_heart.webp" alt=""></img>
    </div>;
  }
};

export default EditProfile;
