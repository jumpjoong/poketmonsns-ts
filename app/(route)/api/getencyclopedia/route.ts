import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const allPoketmon = await prisma.poke_table.findMany();
  return new Response(JSON.stringify(allPoketmon));
}
