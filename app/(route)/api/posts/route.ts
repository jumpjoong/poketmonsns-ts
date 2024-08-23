import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const userId = searchParams.get("userId");

  const limitNumber = limit ? Number(limit) : 10;
  const pageNumber = page ? Number(page) : 1;
  const userIdNumber = Number(userId);

  const offset = (pageNumber - 1) * limitNumber;

  let allPosts;
  if (userId) {
    allPosts = await prisma.posts.findMany({
      where: {
        author: {
          followers: {
            some: {
              follower_id: userIdNumber, // 로그인한 사용자의 ID를 기준으로 팔로잉한 사람들 필터링
            },
          },
        },
      },
      include: {
        like_post: true,
        author: {
          //추가 이유: 팔로우 클릭하고 검색창 클릭 시 follow의 값이 store에 저장이 안되서 추가함
          select: {
            id: true,
            name: true,
            email: true,
            pro_img: true,
            followers: true,
            following: {
              include: {
                following: {
                  select: {
                    pro_img: true,
                    name: true,
                    rep: true,
                    rep_motion_url: true,
                    credit: true,
                    badge_list: true,
                    followers: {
                      include: {
                        follower: {
                          select: {
                            id: true,
                            name: true,
                            email: true,
                            pro_img: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  } else {
    allPosts = await prisma.posts.findMany({
      skip: offset,
      take: limitNumber,
      orderBy: {
        date: "desc",
      },
      include: {
        like_post: true,
        author: {
          //추가 이유: 팔로우 클릭하고 검색창 클릭 시 follow의 값이 store에 저장이 안되서 추가함
          select: {
            id: true,
            name: true,
            email: true,
            pro_img: true,
            followers: true,
            following: {
              include: {
                following: {
                  select: {
                    pro_img: true,
                    name: true,
                    rep: true,
                    rep_motion_url: true,
                    credit: true,
                    badge_list: true,
                    followers: {
                      include: {
                        follower: {
                          select: {
                            id: true,
                            name: true,
                            email: true,
                            pro_img: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  return new Response(
    JSON.stringify({
      allPosts,
    })
  );
}

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    if (body.posts_user_id === body.user_id) {
      await prisma.like_post.deleteMany({
        where: {
          post_id: body.posts_id,
        },
      });

      await prisma.posts.delete({
        where: {
          id: body.posts_id,
        },
      });

      if (body.credit < 5) {
        const zeroCredit = await prisma.user.update({
          where: {
            id: body.user_id,
          },
          data: {
            credit: 0,
          },
        });
        return new Response(JSON.stringify(zeroCredit));
      } else {
        await prisma.user.update({
          where: {
            id: body.user_id,
          },
          data: {
            credit: body.credit - 5,
          },
        });
        return new Response(JSON.stringify("크레딧 5차감"));
      }
    } else {
      return new Response(JSON.stringify("사용자와 다릅니다."));
    }
  } catch (err) {
    return new Response("삭제에 실패했습니다.");
  }
}
