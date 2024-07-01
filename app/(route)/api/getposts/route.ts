import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const allPosts = await prisma.posts.findMany();
  return new Response(JSON.stringify(allPosts));
}
