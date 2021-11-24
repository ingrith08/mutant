import { Schema, Model } from 'mongoose';
import MongooseDecorator from './decorator';

interface mockedI {
  name: string;
}

const testModel = { name: 'test' } as Model<mockedI>;
const testSchema = {} as Schema<mockedI>;

describe('Mongoose Decorator', () => {
  @MongooseDecorator<mockedI>(testModel, testSchema)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  class TestClass { }

  it('should decorate a class that uses mongoose', () => {
    const testableClass = TestClass as any;
    expect(testableClass.model).toBe(testModel);
    expect(testableClass.schema).toBe(testSchema);
  });
});
