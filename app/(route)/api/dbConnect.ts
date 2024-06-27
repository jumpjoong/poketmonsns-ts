import { MysqlError, Pool, PoolConnection } from "mysql";

const { createPool } = require("mysql");

const pool: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

pool.getConnection((err: MysqlError, connection: PoolConnection) => {
  try {
    return new Response();
  } catch {
    console.log(err, "연결 실패");
  }
});

export const executeQuery = async (
  query: string,
  arraParams: any[]
): Promise<any> => {
  return await new Promise((resolve, reject) => {
    pool.query(query, arraParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
