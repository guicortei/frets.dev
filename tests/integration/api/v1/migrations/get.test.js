import { query } from "@/infra/database.js";

async function cleanDatabase() {
  await query("DROP SCHEMA public CASCADE");
  await query("CREATE SCHEMA public");
}

beforeAll(async () => {
  await cleanDatabase();
});

test("GET /api/v1/migrations runs dry run and returns dryRun true", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const body = await response.json();
  expect(body.dryRun).toBe(true);
  expect(Array.isArray(body.migrations)).toBe(true);
  for (const m of body.migrations) {
    expect(typeof m.name).toBe("string");
    expect(typeof m.path).toBe("string");
    expect(typeof m.timestamp).toBe("number");
  }
});
