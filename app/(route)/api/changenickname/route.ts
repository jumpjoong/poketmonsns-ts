import { NextResponse } from "next/server";
import prisma from "prisma/prisma";

//유저 닉네임 변경
export async function POST(req: Request) {
  const body = await req.json();
  //닉네임 중복 검사
  const checkUserNickName = await prisma.user.findFirst({
    where: {
      name: body.nickname,
    },
  });
  if (checkUserNickName) {
    return Response.json({
      error: "중복된 닉네임입니다!",
      ok: false,
    });
  } else {
    await prisma.user.update({
      where: {
        id: body.user_id,
      },
      data: {
        name: body.nickname,
      },
    });
    return Response.json({
      error: "success",
      ok: true,
    });
  }
}
