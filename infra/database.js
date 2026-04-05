import pg from "pg";

function getClientConfig() {
  return {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.POSTGRES_SSL === "true",
  };
}

/** Cliente `pg` novo, ainda não conectado — mesma configuração de env em todo o app. */
function getNewClient() {
  return new pg.Client(getClientConfig());
}

async function query(queryObject) {
  const client = getNewClient();
  try {
    await client.connect();
    return await client.query(queryObject);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end().catch(() => {});
  }
}

export { getNewClient, query };

export default {
  getNewClient,
  query,
};
