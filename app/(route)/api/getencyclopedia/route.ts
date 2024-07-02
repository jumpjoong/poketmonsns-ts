import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  //null값일 경우 처리하는건데 차라리 null값이면 에러로 보여주는게 훨 나을듯?
  const limitNumber = limit ? Number(limit) : 30;
  const pageNumber = page ? Number(page) : 1;

  const validLimit = isNaN(limitNumber) ? 30 : limitNumber;
  const validPage = isNaN(pageNumber) ? 1 : pageNumber;

  const offset = (validPage - 1) * validLimit;

  const allPoketmon = await prisma.poke_table.findMany({
    skip: offset,
    take: validLimit,
  });
  return new Response(JSON.stringify(allPoketmon));
  // const allPoketmon = await prisma.poke_table.findMany();
  // return new Response(JSON.stringify(allPoketmon));
}
