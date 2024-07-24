"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import Trend from "./Trend/Trend";
import Encyclopedia from "./Encyclopedia/Encyclopedia";
import MyPosts from "./MyPosts/MyPosts";
import Write from "./Write/Write";
import Board from "./Board/Board";
import { selectsWrite } from "@/app/_store/mainContentsSlice";
import EditProfile from "./EditProfile/EditProfile";
import Following from "./Following/Following";

function MainContents() {
  const navSelectors = useAppSelector(state => state.mainContents);
  const dispatch = useAppDispatch();
  const [editPost, setEditPost] = useState<{
    PostId: number;
    content: string;
  } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleEdit = (PostId: number, content: string, mode: string) => {
    dispatch(selectsWrite());
    setEditPost({ PostId, content });
    if (mode === "editMode") {
      setEditMode(true);
    }
  };

  switch (navSelectors) {
    case "Board": {
      return <Board onEdit={handleEdit} />;
    }
    case "Trend": {
      return <Trend />;
    }
    case "Encyclopedia": {
      return <Encyclopedia />;
    }
    case "MyPost": {
      return <MyPosts />;
    }
    case "Write": {
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
    case "EditProfile": {
      return <EditProfile />;
    }
    case "Following": {
      return <Following />;
    }
    default:
      return <Board onEdit={handleEdit} />;
  }
}

export default MainContents;
