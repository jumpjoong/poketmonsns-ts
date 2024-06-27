"use client";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { ManageAccounts } from "@mui/icons-material";
import style from "@/app/_styles/head.module.scss";

function Header() {
  const [title, setTitle] = useState();
  const mobileProfileOptions = ["프로필 수정", "팔로우", "로그아웃"];
  const MOBILE_ITEM_HEIGHT = 3;

  const searchSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (e.keyCode === 13) {
    //   if (e.target.value !== "") {
    //     if (e.target.value.length < 3) {
    //       alert("3글자 이상 입력해주세요");
    //     } else {
    //       try {
    //         await axios.put("/api/search", { value: e.target.value }).then((res) => {
    //           setSearchID(res.data);
    //           setPageStatus("SEARCH");
    //         });
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     }
    //     e.target.value = "";
    //   }
    // }
  };
  const backBtn = () => {
    // setPageStatus("LIST");
  };

  return (
    <>
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
          <p>
            <input
              onKeyUp={searchSubmit}
              type="text"
              name="search"
              placeholder="User-name / email"
              className={style.follow_search_bar}
              autoComplete="off"
            ></input>
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
