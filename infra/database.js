import pg from "pg";

async function query(queryObject) {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export { query };

export default {
  query,
};
