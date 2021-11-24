import { DefaultContext } from 'koa';
import Mutant from '../repositories/Mutant';
import hash from 'object-hash';

const IsMutant = async (ctx: DefaultContext) => {

  const { request: { body: { dna } } } = ctx;

  const horizontalSequence =  getHorizontalSecuences(dna);
  const verticalSequence =  getVerticalSecuences(dna);
  const diagonalSequence =  getDiagonalSecuences(dna);
  const totalSequencesFound = horizontalSequence + verticalSequence + diagonalSequence;

  const isMutant = totalSequencesFound > 1;

  const hashString = hash(dna);
  const mutants = await Mutant.findOne({hash: hashString});

  if (!mutants) {
    Mutant.create({hash: hashString, dna, isMutant});
  }

  if (!isMutant) {
    ctx.throw(403, isMutant);
  }

  ctx.status = 200;
  ctx.body = isMutant;
};

const getHorizontalSecuences = (dna: [string]) => {
  let sequences = 0;
  dna.map((row)=> {
    if (ValidateSequences(row)) {
      sequences++
			if (sequences > 1) {
				return sequences;
			}
    }
  })
  return sequences;
}

const getVerticalSecuences = (dna: [string]) => {
  let sequences = 0;
  dna.map((_, index)=> {
    const row = getColumn(index, dna);
    if (ValidateSequences(row)) {
      sequences++
			if (sequences > 1) {
        return sequences;
			}
    }
  })
  return sequences;
}

const getColumn = (index: number, dna:[string]) => {
  let column = '';
  dna.map((row) => {
    column += row[index]
  })
  return column;
}

const getDiagonalSecuences = (dna: [string]) => {
  let sequences = 0;

  const diagonalSequence = getDiagonalSequence(dna, false);
  const diagonalSequenceReverse = getDiagonalSequence(dna, true);
  const diagonalSequenceTotal = diagonalSequence.concat(diagonalSequenceReverse);

  diagonalSequenceTotal.map((row)=> {
    if (ValidateSequences(row)) {
      sequences++
			if (sequences > 1) {
        return sequences;
			}
    }
  })
  return sequences;
}

const getDiagonalSequence = (dna: Array<string>, isReverse: Boolean) => {
  const numberSequences = dna.length;
  let numberSequencesTwo = 2 * (numberSequences - 1);
  let letters: string;
  let diagonal = [];

  for (let k = 0; k <= numberSequencesTwo; ++k) {
    letters = '';
    for (let y = numberSequences - 1; y >= 0; --y) {
      const x = k - (isReverse ? numberSequences - y : y);
      if (x >= 0 && x < numberSequences) {
        letters += dna[y][x];
      }
    }
    if(letters.length > 0) {
      diagonal.push(letters);
    }
  }
  return diagonal;
}

const ValidateSequences = (row: string) => {
  return validateNitrogenousBase(row, 'A') ||  validateNitrogenousBase(row, 'T') ||
  validateNitrogenousBase(row, 'G') || validateNitrogenousBase(row, 'C');
}

const validateNitrogenousBase = (row: string, nitrogenousBase: string) => {
  const equalSequence= nitrogenousBase.repeat(4);
  return row.includes(equalSequence);
}

export default {
  IsMutant
};
