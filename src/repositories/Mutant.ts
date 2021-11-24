import { Document } from 'mongoose';
import { MutantI, mutantModel, MuntantSchema } from '../models/mutant';
import BaseMongoose, { Query } from './BaseMongoose';
import MongooseDecorator from './decorator';

type MutantDocument = MutantI & Document;

interface StatI {
  count_human_dna: number;
  count_mutant_dna: number;
}

@MongooseDecorator<MutantI>(mutantModel, MuntantSchema)
class Mutant extends BaseMongoose<MutantI> implements MutantI {
  hash: string;
  dna: Array<string>;
  isMutant: boolean;

  constructor(data: MutantI | MutantDocument) {
    super(Mutant.getDoc<MutantI>(data));

    this.hash = data.hash;
    this.dna = data.dna;
    this.isMutant = data.isMutant;
  }

  static async findOne(query: Query): Promise<MutantDocument> {
    const mutant = await this.model.findOne(query);

    return mutant as MutantDocument;
  }

  static async create(data: MutantI): Promise<MutantDocument> {
    const customer = await this.model.create<MutantI>(data);

    return customer as MutantDocument;
  }

  static async getStat(): Promise<StatI> {
    return (
      await this.model.aggregate([
        { $group: { 
          _id: "mutant",
          count_human_dna: { $sum: { $cond: [{ $eq: [false, "$isMutant"]}, 1, 0]} },
          count_mutant_dna: { $sum: { $cond: [{ $eq: [true, "$isMutant"]}, 1, 0]} }
          }
        }
      ])
    )[0] as StatI;
  }

}

export default Mutant;
