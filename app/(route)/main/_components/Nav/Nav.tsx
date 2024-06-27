import React from "react";
import style from "@/app/_styles/nav.module.scss";
import {
  Home,
  Whatshot,
  MenuBook,
  Description,
  Create,
} from "@mui/icons-material";
import { useAppDispatch } from "@/app/_hooks/hooks";
import {
  selectsEncyclopedia,
  selectsMyPosts,
  selectsPost,
  selectsTrend,
  selectsWrite,
} from "@/app/_store/mainContentsSlice";

function Nav() {
  const dispatch = useAppDispatch();
  return (
    <nav className={style.nav_container}>
      <div className={style.nav_btn_wrap}>
        <div
          className={style.nav_home_btn}
          onClick={() => dispatch(selectsPost())}
        >
          <Home
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>홈</span>
        </div>
        <div
          className={style.nav_trend_btn}
          onClick={() => dispatch(selectsTrend())}
        >
          <Whatshot
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>인기 글</span>
        </div>
        <div
          className={style.nav_mymsg_btn}
          onClick={() => dispatch(selectsEncyclopedia())}
        >
          <MenuBook
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>도감</span>
        </div>
        <div
          className={style.nav_more_btn}
          onClick={() => dispatch(selectsMyPosts())}
        >
          <Description
            sx={{ color: "rgba(224, 102, 102)", background: "transparent" }}
          />
          <span>작성한 글</span>
        </div>
        <div
          className={style.nav_write_btn}
          onClick={() => dispatch(selectsWrite())}
        >
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
