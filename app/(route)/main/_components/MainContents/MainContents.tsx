"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import Trend from "@/_components/MainContents/Trend/Trend";
import Encyclopedia from "@/_components/MainContents/Encyclopedia/Encyclopedia";
import MyPosts from "@/_components/MainContents/MyPosts/MyPosts";
import Write from "@/_components/MainContents/Write/Write";
import Board from "@/_components/MainContents/Board/Board";
import EditProfile from "@/_components/MainContents/EditProfile/EditProfile";
import Following from "@/_components/MainContents/Following/Following";
import Tutorial from "@/_components/MainContents/Tutorial/Tutorial";
import { setContent } from "@/app/_store/mainContentsSlice";

function MainContents() {
  const user = useAppSelector(state => state.user.user);
  const userStatus = useAppSelector(state => state.user.status);
  const navSelectors = useAppSelector(state => state.mainContents.current);
  const dispatch = useAppDispatch();
  const [editPost, setEditPost] = useState<{
    PostId: number;
    content: string;
  } | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (PostId: number, content: string, mode: string) => {
    dispatch(setContent("글쓰기"));
    setEditPost({ PostId, content });
    if (mode === "editMode") {
      setEditMode(true);
    }
  };

  useEffect(() => {
    //user정보가 업데이트 될 때 무조건 idle > loading > 실패, 성공
    if (user?.noob && userStatus === "succeeded") {
      dispatch(setContent("튜토리얼"));
    }
  }, [user, navSelectors]);

  switch (navSelectors) {
    case "소식": {
      return <Board onEdit={handleEdit} />;
    }
    case "인기글": {
      return <Trend onEdit={handleEdit} />;
    }
    case "도감": {
      return <Encyclopedia />;
    }
    case "작성한 글": {
      return <MyPosts onEdit={handleEdit} />;
    }
    case "글쓰기": {
      return editMode ? (
        <Write
          PostId={editPost?.PostId}
          content={editPost?.content}
          editMode={editMode}
        />
      ) : (
        <Write />
      );
    }
    case "프로필 수정": {
      return <EditProfile />;
    }
    case "팔로잉": {
      return <Following />;
    }
    case "튜토리얼": {
      return <Tutorial />;
    }
    default:
      return <Board onEdit={handleEdit} />;
  }
}

export default MainContents;
