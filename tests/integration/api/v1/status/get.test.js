import { query } from "../../../../../infra/database.js";

test("GET to /api/v1/status should return 200", async () => {
  const result = await query("SELECT 1");
  expect(result?.rows?.length).toBeGreaterThan(0);

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
