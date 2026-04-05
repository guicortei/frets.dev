import { runMigrations } from "@/infra/runMigrations.js";

/** GET = dry run; POST = aplica migrations. Em produção, proteja com auth ou desabilite. */

function serializeMigrations(migrations) {
  return migrations.map((m) => ({
    name: m.name,
    path: m.path,
    timestamp: m.timestamp,
  }));
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const migrations = await runMigrations({ dryRun: true });
      return res.status(200).json({
        dryRun: true,
        migrations: serializeMigrations(migrations),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Migration dry run failed" });
    }
  }

  if (req.method === "POST") {
    try {
      const migrations = await runMigrations({ dryRun: false });
      return res.status(200).json({
        dryRun: false,
        migrations: serializeMigrations(migrations),
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Migration run failed" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end();
}
