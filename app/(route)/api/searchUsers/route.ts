import prisma from "prisma/prisma";

export async function GET(req: Request) {
  const searchName = new URL(req.url).searchParams;
  const searchUserName = searchName.get("searchUserName") || "";
  const userId = Number(searchName.get("userId"));

  try {
    const matchingUsers = await prisma.user.findMany({
      where: {
        name: {
          contains: searchUserName,
        },
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        pro_img: true,
      },
    });

    return new Response(
      JSON.stringify({
        matchingUsers,
      })
    );
  } catch (error) {
    console.error(error);
  }
}
