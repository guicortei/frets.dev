import pg from "pg";

async function query(queryObject) {
  const client = new pg.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
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
