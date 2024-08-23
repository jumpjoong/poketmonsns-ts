import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchName = new URL(req.url).searchParams;
  const searchUserName = searchName.get("searchUserName") || "";
  const userId = Number(searchName.get("userId"));

  try {
    const searchFollowUser = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            follower_id: userId,
          },
        },
        name: {
          contains: searchUserName,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        pro_img: true,
        followers: {
          include: {
            follower: {
              select: {
                pro_img: true,
                name: true,
                rep: true,
                rep_motion_url: true,
                credit: true,
                badge_list: true,
              },
            },
          },
        },
      },
      take: 5,
    });
    const remainingCount = 5 - searchFollowUser.length; //남은 수

    const nonFollowUsers =
      remainingCount > 0
        ? await prisma.user.findMany({
            where: {
              id: {
                notIn: searchFollowUser.map(user => user.id),
              },
              name: {
                contains: searchUserName,
              },
            },
            select: {
              id: true,
              name: true,
              email: true,
              pro_img: true,
              followers: {
                include: {
                  follower: {
                    select: {
                      pro_img: true,
                      name: true,
                      rep: true,
                      rep_motion_url: true,
                      credit: true,
                      badge_list: true,
                    },
                  },
                },
              },
            },
            take: remainingCount, // 남은 개수만큼 가져오기
          })
        : [];
    return new Response(
      JSON.stringify({
        searchFollowUser,
        nonFollowUsers,
      })
    );
  } catch (err) {
    console.log(err);
  }
}
