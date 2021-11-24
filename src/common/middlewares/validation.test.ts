import { mocked } from 'ts-jest/utils';
import { createMockContext } from '@shopify/jest-koa-mocks';
import validation from './validation';
import CustomError from '../CustomError';

const dna = ["AAAC", "GGTG", "TTGC", "CGGT"];

describe('Validation Middleware', () => {
  const nextStub = jest.fn(() => Promise.resolve(true));
  let mockedCtx: any;

  beforeAll(() => {
    const testCtx = createMockContext({
      state: {},
    });
    mockedCtx = mocked(testCtx as any, true);

    mockedCtx.throw = jest.fn((...args) => {
      throw new Error(args[1]);
    });
  });

  it("should throw a 400 in validateRequired", async () => {
    mockedCtx.request.body = { dna: []};

    try {
      await validation(mockedCtx, nextStub);
      expect(true).toBe(false);
    } catch (err) {
      const error = err as CustomError;
      expect(error.message).toBe('El ADN es requerido');
      expect(nextStub.mock.calls.length).toBe(0);
    }
  });

  it("should throw a 400 in validateLength", async () => {
    mockedCtx.request.body = { dna: ["AC", "GG", "TA"]};

    try {
      await validation(mockedCtx, nextStub);
      expect(true).toBe(false);
    } catch (err) {
      const error = err as CustomError;
      expect(error.message).toBe('La matriz debe ser simetrica (NxN)');
      expect(nextStub.mock.calls.length).toBe(0);
    }
  });

  it("should throw a 400 in validateLetters", async () => {
    mockedCtx.request.body = { dna: ["AAAA", "DATT", "OUTT", "CCCC"]};

    try {
      await validation(mockedCtx, nextStub);
      expect(true).toBe(false);
    } catch (err) {
      const error = err as CustomError;
      expect(error.message).toBe('Letra de base nitrogenada inválida');
      expect(nextStub.mock.calls.length).toBe(0);
    }
  });
});
