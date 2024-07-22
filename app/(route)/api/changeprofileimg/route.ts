import prisma from "prisma/prisma";

//프로필 이미지 변경
export async function POST(req: Request) {
  const body = await req.json();

  await prisma.user.update({
    where: {
      id: body.user_id,
    },
    data: {
      pro_img: body.pro_img,
    },
  });
  return Response.json("프로필 이미지 변경");
}
