import handler from '../../pages/api/bookings';
import { createMocks } from 'node-mocks-http';

test('returns a list of bookings', async () => {
  const { req, res } = createMocks({ method: 'GET' });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData()).bookings).toBeDefined();
});
