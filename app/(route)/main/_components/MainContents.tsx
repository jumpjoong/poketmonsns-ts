"use client";

import React from "react";
import { useAppSelector } from "@/app/_hooks/hooks";

function MainComponents() {
  const navSelectors = useAppSelector(state => state.mainContents);
  switch (navSelectors) {
    case "POSTS": {
      return <div>포스트입니다</div>;
    }
    case "TREND": {
      return <div>트렌드입니다</div>;
    }
    case "ENCYCLOPEDIA": {
      return <div>도감입니다</div>;
    }
    case "MYPOSTS": {
      return <div>내가 작성한 글입니다</div>;
    }
    case "WRITE": {
      return <div>작성페이지입니다</div>;
    }
  }
}

export default MainComponents;
