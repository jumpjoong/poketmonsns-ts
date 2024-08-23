import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  //계산을 위한 number로 만들고 초깃값 설정
  const limitNumber = limit ? Number(limit) : 30;
  const pageNumber = page ? Number(page) : 1;

  const offset = (pageNumber - 1) * limitNumber;

  const allPoketmon = await prisma.poke_table.findMany({
    skip: offset,
    take: limitNumber,
  });
  return Response.json(allPoketmon);
}
export async function POST(req: Request) {
  const body = await req.json();
  await prisma.have_poke.create({
    data: {
      user_id: body.user_id,
      poke_id: body.poke_id,
    },
  });
  return Response.json("credit update");
}
