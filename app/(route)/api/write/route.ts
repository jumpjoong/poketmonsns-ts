import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  if (body.edit) {
    await prisma.posts.update({
      where: {
        id: body.PostId,
      },
      data: {
        content: body.content,
      },
    });
    return new Response(JSON.stringify("데이터 수정완료"));
  } else {
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
}
