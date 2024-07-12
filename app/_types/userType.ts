export interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

interface User {
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
}
interface MyPoketmon {
  id: number;
  poke_id: number;
  user_id: number;
  author: Author;
}
export interface Author {
  user_id: number;
  id: number;
}

interface MyPosts {
  id: number;
  user_id: number;
  content: string;
  date: string;
  like_count: number;
  author: Author;
}
