import prisma from "prisma/prisma";
import { executeQuery } from "../dbConnect";

export async function POST(req: Request) {
  const body = await req.json();
  const motionURL = await executeQuery(
    "SELECT pt.motion_url FROM user u JOIN poke_table pt ON u.rep = pt.id",
    []
  );
  const motionData = motionURL.length > 0 ? motionURL[0].motion_url : null;
  await prisma.user.update({
    where: {
      id: body.user_id,
    },
    data: {
      rep: body.rep,
      rep_motion_url: motionData,
    },
  });
  return Response.json("change rep success");
}
