import prisma from "prisma/prisma";

export async function POST(req: Request) {
  const { user_id, post_id } = await req.json();
  try {
    // 좋아요를 한 포스트가 있는지 확인
    const likePostCheck = await prisma.like_post.findUnique({
      where: {
        user_id_post_id: {
          user_id: user_id,
          post_id: post_id,
        },
      },
    });
    if (likePostCheck) {
      // 이미 좋아요 한 경우 좋아요 포스트 삭제
      await prisma.like_post.delete({
        where: {
          id: likePostCheck.id,
        },
      });
      // 게시글의 좋아요 수 감소
      await prisma.posts.update({
        where: { id: post_id },
        data: {
          like_count: {
            decrement: 1,
          },
        },
      });
      return new Response(JSON.stringify({ message: "좋아요삭제", ok: true }));
    } else {
      // 좋아요 추가
      await prisma.like_post.create({
        data: {
          user_id: user_id,
          post_id: post_id,
        },
      });
      // 게시글의 좋아요 수 증가
      await prisma.posts.update({
        where: { id: post_id },
        data: {
          like_count: {
            increment: 1,
          },
        },
      });
      return new Response(JSON.stringify({ message: "좋아요추가", ok: true }));
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "뭔가 잘못되었습니다!", ok: false })
    );
  }
}
