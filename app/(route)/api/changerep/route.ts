import prisma from "prisma/prisma";
import { executeQuery } from "../dbConnect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await prisma.user.findUnique({
      where: { id: body.user_id },
      include: {
        my_poketmon: {
          select: {
            poke: {
              select: {
                id: true,
                motion_url: true,
              },
            },
          },
        },
      },
    });

    const motionURL =
      user?.my_poketmon.find(poke => poke.poke.id === body.rep)?.poke
        .motion_url ?? undefined;

    await prisma.user.update({
      where: {
        id: body.user_id,
      },
      data: {
        rep: body.rep,
        rep_motion_url: motionURL,
      },
    });

    return new Response(JSON.stringify({ message: "대표 포켓몬 바꾸기 성공" }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
