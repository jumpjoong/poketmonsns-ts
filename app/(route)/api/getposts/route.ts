import { executeQuery } from "../dbConnect";

export async function GET(req: Request) {
  const posts = await executeQuery("SELECT * FROM posts ORDER BY id DESC", []);
  return new Response(JSON.stringify(posts));
}
