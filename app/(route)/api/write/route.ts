import prisma from "../../../../prisma/prisma";
export async function POST(req: Request) {
  const body = await req.json();
  await prisma.posts.create({
    data: {
      user_id: body.user_id,
      content: body.content,
    },
  });
  await prisma.user.update({
    where: {
      id: body.user_id,
    },
    data: {
      credit: body.credit + 5,
    },
  });
  return Response.json("credit add");
}
