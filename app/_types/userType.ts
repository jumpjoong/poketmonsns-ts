import { LikePostType } from "./postsType";

export interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export interface User {
  id: number;
  pro_img: string;
  name: string;
  email: string;
  credit: number;
  rep: number;
  rep_motion_url: string;
  badge_list: [];
  my_poketmon: MyPoketmon[];
  my_posts: MyPosts[];
  follower: FollowerType[];
  following: FollowingType[];
}
export interface MyPoketmon {
  id: number;
  poke_id: number;
  user_id: number;
}

export interface Author {
  id: number;
  pro_img: string;
  name: string;
  email: string;
  rep: number;
  rep_motion_url: string;
  credit: number;
  badge_list: JSON;
  followers: FollowerDetailType[];
  following: FollowingType[];
}

export interface FollowerDetailType {
  id: number;
  email: string;
  name: string;
  pro_img: string;
}
interface MyPosts {
  id: number;
  user_id: number;
  pro_img: string;
  content: string;
  date: string;
  like_count: number;
  author: Author;
  like_post: LikePostType[];
}
//board.tsx
export interface FollowerType {
  id: number;
  follower_id: number;
  following_id: number;
  follower: Author;
}
//postsType
export interface FollowingType {
  id: number;
  follower_id: number;
  following_id: number;
  following: Author;
}
