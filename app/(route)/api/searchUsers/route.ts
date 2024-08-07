import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchName = new URL(req.url).searchParams;
  const searchUserName = searchName.get("searchUserName") || "";
  const userId = Number(searchName.get("userId"));

  try {
    const matchingUsers = await prisma.user.findMany({
      where: {
        name: {
          contains: searchUserName,
        },
        id: {
          not: userId,
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
    });
    const matchingUser = matchingUsers.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        pro_img: user.pro_img,
        followers: user.followers,
      };
    });
    return new Response(
      JSON.stringify({
        matchingUser,
      })
    );
  } catch (error) {
    console.error(error);
  }
}
