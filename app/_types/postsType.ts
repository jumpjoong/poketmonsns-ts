//postsSlice.tsx
export interface PostsState {
  posts: Posts[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}
//Posts.tsx
export interface PostsProps {
  posts: Posts;
}

interface Posts {
  id: number;
  user_id: number;
  content: string;
  date: string;
  like_count: number;
  author: Author;
}
interface Author {
  id: number;
  name: string;
}
