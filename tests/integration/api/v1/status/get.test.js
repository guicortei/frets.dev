test("GET /api/v1/status exposes nested database dependency and updated_at", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const body = await response.json();

  expect(typeof body.updated_at).toBe("string");
  expect(Number.isNaN(Date.parse(body.updated_at))).toBe(false);

  const db = body.dependencies?.database;
  expect(db).toBeDefined();
  expect(db.version).toBe("18.3");

  expect(typeof db.max_connections).toBe("number");
  expect(db.max_connections).toBeGreaterThan(0);

  expect(typeof db.used_connections).toBe("number");
  expect(db.used_connections).toBeGreaterThanOrEqual(1);
  expect(db.used_connections).toBeLessThanOrEqual(db.max_connections);
});
