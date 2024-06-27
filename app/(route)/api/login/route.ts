import prisma from "../../../../prisma/prisma";
import { signJwtAccessToken } from "@/app/_lib/jwt/jwt";
const bcrypt = require("bcrypt");

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  //해당 이메일에 해당하는 user정보 중 첫번 째를 찾음
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (user) {
    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...userWithoutPass } = user;
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = {
        ...userWithoutPass,
        accessToken,
      };
      return new Response(JSON.stringify(result));
    } //user의 값이 null일 때
    else
      return new Response(
        JSON.stringify({
          error: "비밀번호를 다시 확인해 주세요.",
          ok: false,
        }),
        { status: 401 }
      );
  } else {
    return new Response(
      JSON.stringify({
        error: "존재하지 않는 이메일입니다.",
        ok: false,
      }),
      { status: 401 }
    );
  }
}
