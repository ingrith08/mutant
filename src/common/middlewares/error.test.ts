import { createMockContext } from '@shopify/jest-koa-mocks';
import errorMiddleWare from './error';

jest.mock('../../config');

describe('Error Middleware', () => {
  const nextStub = jest.fn();
  let testCtx: any;

  beforeAll(() => {
    testCtx = createMockContext({
      state: {
        loggerCtx: {
          error: jest.fn(),
        },
      },
    });
  });

  it('should handle an Error correctly', async () => {
    const testError = new Error('Boom');
    nextStub.mockImplementation(() => Promise.reject(testError));

    await errorMiddleWare(testCtx, nextStub);
    expect(testCtx.response.body).toMatchObject({ name: 'Error', message: 'Boom' });
  });
});
