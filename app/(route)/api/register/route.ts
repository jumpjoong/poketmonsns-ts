import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
const bcrypt = require("bcrypt");
interface RequestBody {
  email: string;
  password: string;
}
export async function POST(req: Request, res: Response) {
  const body: RequestBody = await req.json();
  //중복 이메일 있는지 검사
  const user = await prisma.user_table.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user) {
    return Response.json(
      { message: "이미 존재하는 이메일입니다." },
      { status: 422 }
    );
  } else {
    const createrUser = await prisma.user_table.create({
      data: {
        name: "",
        pro_img: "000",
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        credit: 0,
        rep: 0,
      },
    });
    const { password, ...result } = createrUser;
    return new Response(JSON.stringify(result));
  }
}
