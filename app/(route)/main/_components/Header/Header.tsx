"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "@/app/_styles/header.module.scss";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { ManageAccounts } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { useDebounce } from "@/_hooks/debounce";
import { FollowerDetailType } from "@/app/_types/userType";
import { goBack, setContent } from "@/app/_store/mainContentsSlice";
import { setSearchQuery } from "@/app/_store/searchUserName";
import { signOut } from "next-auth/react";
import Headmeta from "../HeadMeta";
interface newType {
  id: number;
  email: string;
  pro_img: string;
  name: string;
  followers: FollowerDetailType[];
}
function Header() {
  const user = useAppSelector(state => state.user.user);
  const follow = useAppSelector(state => state.localFollowReducer.following);
  const content = useAppSelector(state => state.mainContents.current);
  const profileOptions = ["프로필 수정", "팔로우", "로그아웃"];
  const ITEM_HEIGHT = 3;
  const [search, setSearch] = useState("");
  const debounceSearchText = useDebounce(search, 300); //디바운스 필요한 경우 딜레이 시간 바꾸기
  const [localFilterFollowing, setLocalFilterFollowing] = useState<newType[]>(
    []
  );
  const [searchServerUser, setSearchServerUser] = useState<newType[]>([]);
  const [showSearchDiv, setShowSearchDiv] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const filterFollowingRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  //검색 인풋창
  const searchSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const backBtn = () => {
    dispatch(goBack());
  };

  const mobileProfileOpenHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(e.currentTarget);
  };
  const mobileProfileCloseHandler = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(null);
    switch (e.currentTarget.textContent) {
      case "프로필 수정":
        dispatch(setContent("프로필 수정"));
        break;
      case "팔로우":
        dispatch(setContent("팔로잉"));
        break;
      case "로그아웃":
        signOut();
        break;
    }
  };

  const moreSearchList = () => {
    dispatch(setSearchQuery(search));
    dispatch(setContent("팔로잉"));
    setLocalFilterFollowing([]);
    setShowSearchDiv(false);
  };
  //디바운스
  useEffect(() => {
    const searchUser = async () => {
      if (debounceSearchText.trim() === "") {
        // input창에 아무것도 입력 안되어있는 상태면 초기화 (검색한 팔로우 목록, searchDiv창)
        setLocalFilterFollowing([]);
        setShowSearchDiv(false);
        return;
      }

      //inputFocused이 있는 이유 = 다시 포커스가 되면 searchDiv창이 나오게 설정
      if (user && debounceSearchText !== "" && inputFocused) {
        //인풋창에 들어온 값을 토대로 store에 저장되어 있는 팔로우 목록을 찾음
        try {
          const response = await fetch(
            `/api/searchUsers?searchUserName=${debounceSearchText}&userId=${user.id}`
          );
          const data = await response.json();
          const { searchFollowUser, nonFollowUsers } = data;
          setLocalFilterFollowing(searchFollowUser);
          setSearchServerUser(nonFollowUsers);
          setShowSearchDiv(true);
        } catch (err) {
          console.log(err);
        }
      } else if (debounceSearchText === "" && !inputFocused) {
        //입력된 게 없고 inputFocused값이 false일 경우 전부 초기화
        setLocalFilterFollowing([]);
        setShowSearchDiv(false);
      }
    };
    searchUser();
  }, [debounceSearchText, follow, inputFocused]);

  //인풋창 제외한 곳을 클릭할 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterFollowingRef.current &&
        !filterFollowingRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        //input창의 onBlur와 충돌나서 setTimeout설정
        setTimeout(() => {
          setShowSearchDiv(false);
          setLocalFilterFollowing([]);
        }, 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterFollowingRef]);

  return (
    <>
      <Headmeta title={content} />
      <header className={style.header}>
        <div className={style.logo_btn}>
          <div className={style.logo_btn_wrap}>
            <img src="/img/loadimg/pika_dance.webp"></img>
          </div>
        </div>
        <div className={style.status}>
          {content === "튜토리얼" || content === "소식" ? (
            <div className={style.margin_dummy}></div>
          ) : (
            <div className={style.status_arrow_container}>
              <div className={style.status_arrow_btn} onClick={backBtn}>
                <svg
                  width="50"
                  height="33"
                  viewBox="0 0 50 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3862 0L0 16.3862L16.3862 32.7725L20.4462 28.7125L10.9912 19.2575H50V13.515H10.9912L20.4462 4.05995L16.3862 0Z"
                    fill="#E06666"
                  />
                </svg>
              </div>
            </div>
          )}
          <div className={style.status_title}>{content}</div>
          <div className={style.Mobile_profile}>
            <IconButton
              aria-label="more"
              className={style.long_button}
              aria-controls={open ? "long_menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={e => mobileProfileOpenHandler(e)}
            >
              <ManageAccounts className={style.icon_dot} />
            </IconButton>
            <Menu
              className={style.long_menu}
              MenuListProps={{
                "aria-labelledby": "long_button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={mobileProfileCloseHandler}
              PaperProps={{
                style: {
                  minHeight: ITEM_HEIGHT * 4.5,
                  minWidth: "120px",
                  width: "10ch",
                  backgroundColor: "#fffbef",
                  color: "#111",
                  fontFamily: "NanumSquareRound",
                },
              }}
            >
              {profileOptions.map(option => (
                <MenuItem
                  className={style.menuitem}
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={e => mobileProfileCloseHandler(e)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div className={style.search}>
          <span
            className={`${
              localFilterFollowing.length === 0 ? `` : `${style.on}`
            }`}
          >
            <input
              value={search}
              onChange={searchSubmit}
              type="text"
              name="search"
              placeholder="User-name"
              className={`${style.follow_search_bar} ${
                localFilterFollowing.length === 0 ? `` : `${style.on}`
              }`}
              autoComplete="off"
              ref={searchInputRef}
              onFocus={() => setInputFocused(true)} // 포커스 시 작동
              onBlur={() => setInputFocused(false)} // 포커스 해제 시
            ></input>
            {showSearchDiv &&
              (localFilterFollowing.length > 0 ? (
                <div className={style.searchDiv} ref={filterFollowingRef}>
                  {localFilterFollowing.map((obj, key) => {
                    return (
                      <div key={key} className={style.following_div}>
                        <p>{obj.name}</p>
                        <p>팔로워: &nbsp;{obj.followers.length}명</p>
                      </div>
                    );
                  })}
                  <div className={style.search_result}>
                    <img src="/img/search_img.png" alt="검색 이미지" />
                    <p>{debounceSearchText}&nbsp;에 대한 검색 결과</p>
                  </div>
                  {searchServerUser.map((obj, key) => {
                    return (
                      <div key={key} className={style.following_div}>
                        <p>{obj.name}</p>
                        <p>팔로워: &nbsp;{obj.followers.length}명</p>
                      </div>
                    );
                  })}
                  <p className={style.more_search} onClick={moreSearchList}>
                    더보기
                  </p>
                </div>
              ) : (
                <div className={style.searchDiv} ref={filterFollowingRef}>
                  <p>팔로우 목록이 없습니다</p>
                  <p>{debounceSearchText}&nbsp;에 대한 검색 결과</p>
                  {searchServerUser.length > 0 ? (
                    searchServerUser.map((obj, key) => {
                      return (
                        <div key={key} className={style.following_div}>
                          <p>{obj.name}</p>
                          <p>팔로워: &nbsp;{obj.followers.length}명</p>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <p>검색 결과가 없습니다!</p>
                    </div>
                  )}
                  <p className={style.more_search} onClick={moreSearchList}>
                    더보기
                  </p>
                </div>
              ))}
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
