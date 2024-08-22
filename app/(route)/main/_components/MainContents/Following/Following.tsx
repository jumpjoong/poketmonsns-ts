import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import React, { useEffect, useState } from "react";
import FollowList from "@/_components/MainContents/Following/_components/FollowList";
import { Author } from "@/app/_types/userType";
import { fetchFollow } from "@/app/_store/followSlice";

function Following() {
  const user = useAppSelector(state => state.user.user);
  const userFollowing = useAppSelector(
    state => state.serverFollow.userFollowing
  );
  const localFollowing = useAppSelector(
    state => state.localFollowReducer.following
  );
  const searchQuery = useAppSelector(state => state.searchUserName.searchQuery);
  const [displayUser, setDisplayUsers] = useState<Author[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAndMergeResults = async () => {
      if (searchQuery.trim() === "") {
        // 검색어가 없으면 기존 팔로잉 목록 사용
        setDisplayUsers(localFollowing.map(obj => obj.following));
        return;
      } else {
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
            const { matchingUser } = res;
            // 기존 팔로우 목록과 서버에서 가져온 목록 병합
            const combinedUsers = [
              ...userFollowing.map(f => f.following),
              ...matchingUser,
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
      }
    };
    fetchAndMergeResults();
    return () => {
      if (user) {
        dispatch(fetchFollow(user.id));
      }
    };
  }, [searchQuery, user]);

  if (localFollowing.length === 0) {
    return <p>팔로우한 유저가 없습니다</p>;
  } else {
    return displayUser.map(following => {
      return <FollowList following={following} key={following.id} />;
    });
  }
}

export default Following;
