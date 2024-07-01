"use client";

import React from "react";
import { useAppSelector } from "@/app/_hooks/hooks";
import Posts from "./Board/Board";
import Trend from "./Trend/Trend";
import Encyclopedia from "./Encyclopedia/Encyclopedia";
import MyPosts from "./MyPosts/MyPosts";
import Write from "./Write/Write";

function MainContents() {
  const navSelectors = useAppSelector(state => state.mainContents);

  switch (navSelectors) {
    case "POSTS": {
      return <Posts />;
    }
    case "TREND": {
      return <Trend />;
    }
    case "ENCYCLOPEDIA": {
      return <Encyclopedia />;
    }
    case "MYPOSTS": {
      return <MyPosts />;
    }
    case "WRITE": {
      return <Write />;
    }
    default:
      return <Posts />;
  }
}

export default MainContents;
