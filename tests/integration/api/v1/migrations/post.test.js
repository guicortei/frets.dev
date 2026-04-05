import { query } from "@/infra/database.js";

async function cleanDatabase() {
  await query("DROP SCHEMA public CASCADE");
  await query("CREATE SCHEMA public");
}

beforeAll(async () => {
  await cleanDatabase();
});

test("POST /api/v1/migrations applies pending migrations then none remain", async () => {
  const first = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(first.status).toBe(200);
  const bodyFirst = await first.json();
  expect(bodyFirst.dryRun).toBe(false);
  expect(Array.isArray(bodyFirst.migrations)).toBe(true);
  expect(bodyFirst.migrations.length).toBeGreaterThan(0);
  for (const m of bodyFirst.migrations) {
    expect(typeof m.name).toBe("string");
    expect(typeof m.path).toBe("string");
    expect(typeof m.timestamp).toBe("number");
  }

  const second = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(second.status).toBe(200);
  const bodySecond = await second.json();
  expect(bodySecond.dryRun).toBe(false);
  expect(Array.isArray(bodySecond.migrations)).toBe(true);
  expect(bodySecond.migrations.length).toBe(0);
});
