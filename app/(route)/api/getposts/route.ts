import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const allPosts = await prisma.posts.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      like_post: true,
    },
  });
  return new Response(JSON.stringify(allPosts));
}
