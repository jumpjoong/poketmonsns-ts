//use server를 하면 진짜 server에서 콘솔이 찍힘;;
import axios from "axios";
//유저 정보 싹 가져와야함
export default async function userHandler({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) {
  try {
    const data = await fetch(`http://localhost:3000/api/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    const res = await data.json();
    console.log(res);
  } catch (err) {
    throw new Error("axios 실패");
  }
}
