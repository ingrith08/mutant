import mongoose, { Schema } from 'mongoose';

export interface MutantI {
  hash: string;
  dna: Array<string>;
  isMutant: boolean;
}

export const MuntantSchema = new Schema<MutantI>({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
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
