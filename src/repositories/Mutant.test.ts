import Mutant from './Mutant';
import { MutantI, mutantModel as MuntantModel } from '../models/mutant';
import BaseMongoose from './BaseMongoose';

class FakeMutant extends Mutant {
  static fakeModel() {
    return this.model;
  }
}

describe('Mutant Model', () => {
  let mutantModel: MutantI;

  beforeEach(() => {
    mutantModel = {
      hash: "5513f4ef921938e1e782e346247f2855939d002a",
      dna: ["AATG", "CATG", "TAGC", "AAAA"],
      isMutant: false,
    };
  });

  it('should call the BaseMongoose.model.findOne', async () => {
    jest.spyOn(FakeMutant.fakeModel(), 'findOne').mockReturnValue({} as any);
    await FakeMutant.findOne({} as any);
    expect(FakeMutant.fakeModel().findOne).toHaveBeenCalledTimes(1);
  });

  it('should call the BaseMongoose.model.create', async () => {
    jest.spyOn(FakeMutant.fakeModel(), 'create').mockReturnValue({} as any);
    await FakeMutant.create({} as any);
    expect(FakeMutant.fakeModel().create).toHaveBeenCalledTimes(1);
  });

  it('should create a new Mutant object', () => {
    const mutant = new Mutant({
      hash: "5513f4ef921938e1e782e346247f2855939d002a",
      dna: ["AATG", "CATG", "TAGC", "AAAA"],
      isMutant: false,
    });

    expect(Object.getPrototypeOf(mutant) instanceof BaseMongoose).toBeTruthy();
  });
});
