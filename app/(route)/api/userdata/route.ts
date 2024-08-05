import { verifyJwt } from "@/app/_lib/jwt/jwt";
import prisma from "prisma/prisma";
//로그인 시 유저 데이터 가져오는 로직
export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = Number(searchParams.get("userId"));
  //직접적인 주소로 접근한다면 error 반환 아마 커스텀 페이지 필요할 듯(잘못된 페이지로 접속 시 {"error":"잘못된 접근 방식입니다. 원래 페이지로 돌아가주세요."} 이렇게뜸)
  try {
    const accessToken = req.headers.get("authorization");
    if (!accessToken) {
      return new Response(
        JSON.stringify({
          error: "잘못된 접근 방식입니다. 원래 페이지로 돌아가주세요.",
        }),
        {
          status: 404,
        }
      );
    } else if (!verifyJwt(accessToken)) {
      return new Response(
        JSON.stringify({
          error: "토큰 만료",
        }),
        {
          status: 401,
        }
      );
    }
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        pro_img: true,
        name: true,
        email: true,
        credit: true,
        rep: true,
        rep_motion_url: true,
        badge_list: true,
        my_posts: {
          orderBy: {
            date: "desc",
          },
          include: {
            like_post: true,
            author: true,
          },
        },
        my_poketmon: true,
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
    });
    return new Response(JSON.stringify(userData));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
//포켓몬 구매 시 크레딧 업그레이드
export async function POST(req: Request) {
  const body = await req.json();
  await prisma.user.update({
    where: {
      id: body.user_id,
    },
    data: {
      credit: body.credit,
    },
  });
  return Response.json("credit update");
}
