import mongoose, { Schema } from 'mongoose';

export interface MutantI {
  dna: Array<string>;
  isMutant: boolean;
}

export const MuntantSchema = new Schema<MutantI>({
  dna: {
    type: [String],
  },
  isMutant: {
    type: Boolean,
    required: true,
  },
}, {
  minimize: false,
  timestamps: true,
});

export const mutantModel = mongoose.model<MutantI>('mutant', MuntantSchema);
