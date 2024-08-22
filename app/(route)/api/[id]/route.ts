import { verifyJwt } from "@/app/_lib/jwt/jwt";
import prisma from "prisma/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
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
  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(params.id),
    },
  });
  if (deleteUser) {
    return new Response(
      JSON.stringify({
        message: "성공적으로 삭제",
        ok: true,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        error: "삭제실패",
        ok: false,
      })
    );
  }
}
