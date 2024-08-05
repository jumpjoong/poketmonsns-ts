"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { ManageAccounts } from "@mui/icons-material";
import style from "@/app/_styles/head.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { FollowingType } from "@/app/_types/userType";
import { useDebounce } from "@/_hooks/debounce";
import { selectsFollowing } from "@/app/_store/mainContentsSlice";
import { setSearchQuery } from "@/app/_store/searchUserName";

function Header() {
  const [title, setTitle] = useState();
  const user = useAppSelector(state => state.user.user);
  const follow = useAppSelector(state => state.localFollowReducer.following);
  const [search, setSearch] = useState("");
  const [filterFollowing, setFilterFollowing] = useState<FollowingType[]>([]);
  //디바운스 필요한 경우 딜레이 시간 바꾸기
  const debounceSearchText = useDebounce(search, 300);
  const mobileProfileOptions = ["프로필 수정", "팔로우", "로그아웃"];
  const MOBILE_ITEM_HEIGHT = 3;
  const filterFollowingRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [showSearchDiv, setShowSearchDiv] = useState(false);
  const [inputFocused, setInputFocused] = useState(false); // 추가된 상태
  const dispatch = useAppDispatch();
  const searchSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const backBtn = () => {
    // setPageStatus("LIST");
  };

  //디바운스
  useEffect(() => {
    if (debounceSearchText.trim() === "") {
      // input창에 아무것도 입력 안되어있는 상태면 초기화 (검색한 팔로우 목록, searchDiv창)
      setFilterFollowing([]);
      setShowSearchDiv(false);
      return;
    }

    if (user?.following && search !== "" && inputFocused) {
      //inputFocused이 있는 이유 = 다시 포커스가 되면 searchDiv창이 나오게 설정
      const searchMyFollowing = follow.filter(obj =>
        obj.following.name.includes(debounceSearchText)
      );
      console.log(searchMyFollowing);
      setFilterFollowing(searchMyFollowing);
      setShowSearchDiv(true);
    } else if (search === "" && !inputFocused) {
      //입력된 게 없고 inputFocused값이 false일 경우 전부 초기화
      setFilterFollowing([]);
      setShowSearchDiv(false);
    }
  }, [debounceSearchText, user?.following, inputFocused]);

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
          setFilterFollowing([]);
        }, 0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterFollowingRef]);
  const moreSearchList = () => {
    dispatch(setSearchQuery(search));
    dispatch(selectsFollowing());
    setFilterFollowing([]);
    setShowSearchDiv(false);
  };
  return (
    <header className={style.header}>
      <div className={style.logo_btn}>
        <div className={style.logo_btn_wrap}>
          <img src="/img/loadimg/pika_dance.webp"></img>
        </div>
      </div>
      <div className={style.status}>
        {title === "튜토리얼" || title === "소식" ? (
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
        <div className={style.status_title}>{title}</div>
      </div>
      {/* <div className={style.Mobile_profile}>
        <IconButton
          aria-label="more"
          className={style.long_button}
          aria-controls={open ? "long_menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
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
          onClose={handleClose}
          PaperProps={{
            style: {
              // maxHeight: ITEM_HEIGHT * 4.5,
              minHeight: ITEM_HEIGHT * 4.5,
              minWidth: "120px",
              width: "10ch",
              backgroundColor: "#fffbef",
              color: "#111",
              fontFamily: "NanumSquareRound",
            },
          }}
          onClick={e => menuClick(e)}
        >
          {profileOptions.map(option => (
            <MenuItem
              className={style.menuitem}
              key={option}
              selected={option === "Pyxis"}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div> */}
      <div className={style.search}>
        <span
          className={`${filterFollowing.length === 0 ? `` : `${style.on}`}`}
        >
          <input
            value={search}
            onChange={searchSubmit}
            type="text"
            name="search"
            placeholder="User-name"
            className={`${style.follow_search_bar} ${
              filterFollowing.length === 0 ? `` : `${style.on}`
            }`}
            autoComplete="off"
            ref={searchInputRef}
            onFocus={() => setInputFocused(true)} // 포커스 시 작동
            onBlur={() => setInputFocused(false)} // 포커스 해제 시
          ></input>
          {showSearchDiv && filterFollowing.length !== 0 && (
            <div className={style.searchDiv} ref={filterFollowingRef}>
              {filterFollowing.map((obj, key) => {
                return (
                  <div key={key} className={style.following_div}>
                    <p>{obj.following.name}</p>
                    <p>팔로워: &nbsp;{obj.following.followers.length}</p>
                  </div>
                );
              })}
              <p className={style.more_search} onClick={moreSearchList}>
                더보기
              </p>
            </div>
          )}
        </span>
      </div>
    </header>
  );
}

export default Header;
