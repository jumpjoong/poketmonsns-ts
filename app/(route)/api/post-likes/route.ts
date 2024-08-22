import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const hotPosts = await prisma.posts.findMany({
    orderBy: [
      {
        like_count: "desc",
      },
      {
        date: "desc",
      },
    ],
    include: {
      like_post: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          pro_img: true,
          followers: true,
        },
      },
    },
    take: 5,
  });
  return new Response(JSON.stringify({ hotPosts }));
}
