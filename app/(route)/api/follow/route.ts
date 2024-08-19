import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = Number(searchParams.get("userId"));
  const serverFollow = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      following: {
        include: {
          following: {
            select: {
              id: true,
              email: true,
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
  });
  return new Response(
    JSON.stringify({
      userFollowing: serverFollow?.following || [],
    })
  );
}
export async function POST(req: Request) {
  const body = await req.json();
  const { following_id, follower_id } = body;

  //팔로우 되어있는지 확인 없다면 return null로 값이 옴
  const checkFollow = await prisma.follow_table.findUnique({
    where: {
      follower_id_following_id: {
        follower_id: follower_id,
        following_id: following_id,
      },
    },
  });

  if (checkFollow) {
    //팔로우 취소 로직. delete api를 따로 만들려다가 api 폴더 구조가 더 복잡해지는거 같아서 한번에 팔로우 구현
    const unFollow = await prisma.follow_table.delete({
      where: {
        follower_id_following_id: {
          follower_id: follower_id,
          following_id: following_id,
        },
      },
    });
    return new Response(JSON.stringify("팔로우 취소"));
  } else {
    const follow = await prisma.follow_table.create({
      data: {
        follower_id: follower_id,
        following_id: following_id,
      },
    });
    return new Response(JSON.stringify("팔로우 성공"));
  }
}
