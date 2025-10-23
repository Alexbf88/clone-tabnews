test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(
    "https://crispy-garbanzo-qjpvqp5vx462xpv6-3000.app.github.dev/api/v1/status",
  );
  expect(response.status).toBe(200);
});
