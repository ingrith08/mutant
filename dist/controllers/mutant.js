"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mutant_1 = __importDefault(require("../repositories/Mutant"));
const IsMutant = (ctx) => {
    const { request: { body: { dna } } } = ctx;
    const horizontalSequence = getHorizontalSecuences(dna);
    const verticalSequence = getVerticalSecuences(dna);
    const diagonalSequence = getDiagonalSecuences(dna);
    const totalSequencesFound = horizontalSequence + verticalSequence + diagonalSequence;
    const isMutant = totalSequencesFound > 1;
    Mutant_1.default.create({ dna, isMutant });
    if (!isMutant) {
        ctx.throw(403, isMutant);
    }
    ctx.status = 200;
    ctx.body = isMutant;
};
const getHorizontalSecuences = (dna) => {
    let sequences = 0;
    dna.map((row) => {
        if (ValidateSequences(row)) {
            sequences++;
            if (sequences > 1) {
                return sequences;
            }
        }
    });
    return sequences;
};
const getVerticalSecuences = (dna) => {
    let sequences = 0;
    dna.map((_, index) => {
        const row = getColumn(index, dna);
        if (ValidateSequences(row)) {
            sequences++;
            if (sequences > 1) {
                return sequences;
            }
        }
    });
    return sequences;
};
const getColumn = (index, dna) => {
    let column = '';
    dna.map((row) => {
        column += row[index];
    });
    return column;
};
const getDiagonalSecuences = (dna) => {
    let sequences = 0;
    const diagonalSequence = getDiagonalSequence(dna, false);
    const diagonalSequenceReverse = getDiagonalSequence(dna, true);
    const diagonalSequenceTotal = diagonalSequence.concat(diagonalSequenceReverse);
    diagonalSequenceTotal.map((row) => {
        if (ValidateSequences(row)) {
            sequences++;
            if (sequences > 1) {
                return sequences;
            }
        }
    });
    return sequences;
};
const getDiagonalSequence = (dna, isReverse) => {
    const numberSequences = dna.length;
    let numberSequencesTwo = 2 * (numberSequences - 1);
    let letters;
    let diagonal = [];
    for (let k = 0; k <= numberSequencesTwo; ++k) {
        letters = '';
        for (let y = numberSequences - 1; y >= 0; --y) {
            const x = k - (isReverse ? numberSequences - y : y);
            if (x >= 0 && x < numberSequences) {
                letters += dna[y][x];
            }
        }
        if (letters.length > 0) {
            diagonal.push(letters);
        }
    }
    return diagonal;
};
const ValidateSequences = (row) => {
    return validateNitrogenousBase(row, 'A') || validateNitrogenousBase(row, 'T') ||
        validateNitrogenousBase(row, 'G') || validateNitrogenousBase(row, 'C');
};
const validateNitrogenousBase = (row, nitrogenousBase) => {
    const equalSequence = nitrogenousBase.repeat(4);
    return row.includes(equalSequence);
};
exports.default = {
    IsMutant
};
//# sourceMappingURL=mutant.js.map