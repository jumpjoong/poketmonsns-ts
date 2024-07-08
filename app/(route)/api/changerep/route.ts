import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  await prisma.user.update({
    where: {
      id: body.user_id,
    },
    data: {
      rep: body.rep,
    },
  });
  return Response.json("change rep success");
}
