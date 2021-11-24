import { Document, Model, Schema } from 'mongoose';

export type Query = Record<string, unknown>;

type BaseDocument<T> = Document & T;

abstract class BaseMongoose<IModel> {
  protected static model: Model<unknown>;

  protected static schema: Schema;
  document: BaseDocument<IModel>;

  constructor(doc: BaseDocument<IModel>) {
    this.document = doc;
  }

  protected static getDoc<T>(data: T): BaseDocument<T> {
    const MyModel = this.model as Model<T>;
    return new MyModel(data);
  }
}

export default BaseMongoose;
