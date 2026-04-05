import { query } from "@/infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  try {
    const { rows } = await query(`
      SELECT
        current_setting('server_version') AS server_version,
        current_setting('max_connections')::int AS max_connections,
        (SELECT count(*)::int FROM pg_stat_activity) AS used_connections
    `);
    const row = rows[0];
    return res.status(200).json({
      updated_at: new Date().toISOString(),
      dependencies: {
        database: {
          version: row?.server_version ?? null,
          max_connections: row?.max_connections ?? null,
          used_connections: row?.used_connections ?? null,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to read database status" });
  }
}
