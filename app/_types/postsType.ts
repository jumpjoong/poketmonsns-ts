import { FollowingType } from "./userType";

//postsSlice.tsx
export interface PostsState {
  posts: Posts[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
//postsSlice.tsx // followinitial
export interface FollowState {
  userFollowing: FollowingType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
//Posts.tsx
export interface PostsProps {
  posts: Posts;
}

export interface Posts {
  id: number;
  user_id: number;
  content: string;
  date: string;
  like_count: number;
  author: Author;
  like_post: LikePostType[];
}

interface Author {
  user_id: number;
  id: number;
  pro_img: string;
  name: string;
}

interface PostAuthor {
  post_id: number;
  id: number;
}
//userType.ts
export interface LikePostType {
  id: number;
  user_id: number;
  post_id: number;
  user: Author;
  post: PostAuthor;
}
