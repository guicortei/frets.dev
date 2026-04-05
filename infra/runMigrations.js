import path from "path";
import { runner } from "node-pg-migrate";
import { getNewClient } from "@/infra/database.js";

/**
 * Helper for API/CLI — must live *outside* `infra/migrations/` so node-pg-migrate
 * does not treat this file as a migration.
 *
 * @param {{ dryRun: boolean }} opts
 * @returns {Promise<import("node-pg-migrate").RunMigration[]>}
 */
export async function runMigrations({ dryRun }) {
  const client = getNewClient();
  await client.connect();

  const dir = path.join(process.cwd(), "infra", "migrations");

  try {
    return await runner({
      direction: "up",
      dryRun,
      dir,
      dbClient: client,
    });
  } finally {
    await client.end().catch(() => {});
  }
}
