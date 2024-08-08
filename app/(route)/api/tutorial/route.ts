import prisma from "prisma/prisma";

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, contents } = body;

  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: contents,
      noob: false,
    },
  });
  return new Response(JSON.stringify({ message: "success", ok: true }));
}
