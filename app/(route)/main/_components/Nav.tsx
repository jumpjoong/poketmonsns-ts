import React from "react";
import style from "@/app/_styles/nav.module.scss";
import {
  Home,
  Whatshot,
  MenuBook,
  Description,
  Create,
} from "@mui/icons-material";

function Nav() {
  return (
    <nav className={style.nav_container}>
      <div className={style.nav_btn_wrap}>
        <div className={style.nav_home_btn}>
          <Home
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>홈</span>
        </div>
        <div className={style.nav_trend_btn}>
          <Whatshot
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>인기 글</span>
        </div>
        <div className={style.nav_mymsg_btn}>
          <MenuBook
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>도감</span>
        </div>
        <div className={style.nav_more_btn}>
          <Description
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>작성한 글</span>
        </div>
        <div className={style.nav_write_btn}>
          <Create
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>새 글쓰기</span>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
