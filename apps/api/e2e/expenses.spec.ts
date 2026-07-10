import test, { expect } from '@playwright/test';

test('POST /expenses create an expense with valid data', async ({
  request,
}) => {
  const response = await request.post('/expenses', {
    data: {
      description: 'Milk',
      amount: 2250,
    },
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toMatchObject({
    description: 'Milk',
    amount: 2250,
  });
  expect(body.id).toBeDefined();
});

test('POST /expenses rejects invalid data with 400', async ({ request }) => {
  const response = await request.post('/expenses', {
    data: {
      description: '',
      amount: -1,
    },
  });

  expect(response.status()).toBe(400);
});
