import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import React, { useEffect, useState } from "react";
import FollowList from "./_components/FollowList";
import { fetchPosts } from "@/app/_store/postsSlice";
import { Author } from "@/app/_types/userType";

function Following() {
  const user = useAppSelector(state => state.user.user);
  const userFollowing = useAppSelector(state => state.following.userFollowing);
  const searchQuery = useAppSelector(state => state.searchUserName.searchQuery);
  const [displayUser, setDisplayUsers] = useState<Author[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAndMergeResults = async () => {
      if (searchQuery.trim() === "") {
        // 검색어가 없으면 기존 팔로잉 목록 사용
        setDisplayUsers(userFollowing.map(obj => obj.following));
        return;
      }
      try {
        const response = await fetch(
          `/api/searchUsers?searchUserName=${searchQuery}&userId=${user!.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const res = await response.json();
          const { matchingUsers } = res;

          // 기존 팔로우 목록과 서버에서 가져온 목록 병합
          const combinedUsers = [
            ...userFollowing.map(f => f.following),
            ...matchingUsers,
          ];
          const uniqueUsers: Author[] = Array.from(
            combinedUsers
              .reduce((map, user) => {
                if (!map.has(user.id)) {
                  map.set(user.id, user); // ID를 키로 사용자 객체를 저장
                }
                return map;
              }, new Map())
              .values()
          );
          setDisplayUsers(uniqueUsers);
        } else {
          console.error("검색 결과 없음");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndMergeResults();
    return () => {
      dispatch(fetchPosts(user!.id));
    };
  }, [searchQuery, userFollowing, user]);

  if (userFollowing.length === 0) {
    return <p>팔로우한 유저가 없습니다</p>;
  } else {
    return displayUser.map(following => {
      return <FollowList following={following} key={following.id} />;
    });
  }
}

export default Following;
