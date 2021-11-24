/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T = {}> = new (...args: any[]) => T;

function MongooseDecorator<DocumentI>(model: Model<DocumentI>, schema: Schema<DocumentI>) {
  return function decorator<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
      static model = model;

      static schema = schema;
    };
  };
}

export default MongooseDecorator;
