"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mutant_1 = __importDefault(require("../repositories/Mutant"));
const object_hash_1 = __importDefault(require("object-hash"));
const IsMutant = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { request: { body: { dna } } } = ctx;
    const horizontalSequence = getHorizontalSecuences(dna);
    const verticalSequence = getVerticalSecuences(dna);
    const diagonalSequence = getDiagonalSecuences(dna);
    const totalSequencesFound = horizontalSequence + verticalSequence + diagonalSequence;
    const isMutant = totalSequencesFound > 1;
    const hashString = (0, object_hash_1.default)(dna);
    const mutants = yield Mutant_1.default.findOne({ hash: hashString });
    if (!mutants) {
        Mutant_1.default.create({ hash: hashString, dna, isMutant });
    }
    if (!isMutant) {
        ctx.throw(403, isMutant);
    }
    ctx.status = 200;
    ctx.body = isMutant;
});
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