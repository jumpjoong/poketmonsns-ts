import prisma from "prisma/prisma";

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, badge_list } = body;

  const updateProfileBadgeList = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      badge_list: badge_list,
    },
  });
  return new Response(
    JSON.stringify({
      message: "뱃지 리스트 성공",
      data: updateProfileBadgeList,
      ok: true,
    })
  );
}
