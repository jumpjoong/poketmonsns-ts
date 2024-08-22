import { Author, FollowingType } from "./userType";

//postsSlice.ts
export interface PostsState {
  posts: Post[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
// followSlice.ts
export interface FollowState {
  userFollowing: FollowingType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
//Posts.tsx
export interface PostsProps {
  posts: Post;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  date: string;
  like_count: number;
  author: Author;
  like_post: LikePostType[];
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
