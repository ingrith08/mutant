import * as mongoose from 'mongoose';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import BaseMongoose from './BaseMongoose';

jest.mock('mongoose');
const mockedMongoose = mocked(mongoose);

interface MockedI {
  name: string;
}
mockedMongoose.model.mockImplementation(() => jest.fn() as any);
class MockedCollection extends BaseMongoose<MockedI> {
  static model = mockedMongoose.model('test');
  constructor(data: MockedI) {
    super(MockedCollection.getDoc<MockedI>(data));
  }
}

describe('BaseMongoose', () => {
  let mockedCollection: MockedCollection;
  beforeEach(() => {
    mockedCollection = new MockedCollection({ name: 'test' });
  });

  it('should extend a child class correctly', () => {
    expect(mockedCollection).toBeTruthy();
    const mockedObject = MockedCollection as MockedObject<{ model: any }>;
    expect(mockedObject.model.mock.calls[0][0]).toEqual({ name: 'test' });
  });
});
