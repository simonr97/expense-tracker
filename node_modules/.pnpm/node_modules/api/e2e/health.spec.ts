import { test, expect } from '@playwright/test';

test('GET /health returns 200 with status ok', async ({ request }) => {
  // Act: pegamos al endpoint
  const response = await request.get('/health');

  // Assert: validamos el status HTTP
  expect(response.status()).toBe(200);

  // Assert: validamos el body
  const body = await response.json();
  expect(body).toEqual({ status: 'ok' });
});
