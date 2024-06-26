import { verifyJwt } from "@/app/_lib/jwt/jwt";
import prisma from "prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const accessToken = req.headers.get("authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
      return new Response(JSON.stringify({ error: "No Authorization" }), {
        status: 401,
      });
    }
    const id = Number(params.id);
    const userPosts = await prisma.list_table.findMany({
      where: {
        user_id: id,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(userPosts));
  } catch (error) {
    console.error("Error handling request:", error);
  }
}

// async function handlePost(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log("POST request received");
//     // POST 요청에 대한 데이터 처리 작업을 수행합니다.
//     res.json({ message: "POST request handled successfully" });
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     res.json({ error: "Failed to handle POST request" });
//   }
// }
