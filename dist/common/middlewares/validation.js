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
Object.defineProperty(exports, "__esModule", { value: true });
const validation = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { request: { body: { dna } } } = ctx;
    validateRequired(ctx, dna);
    validateLength(ctx, dna);
    validateLetters(ctx, dna);
    yield next();
});
const validateRequired = (ctx, dna) => {
    if (!dna || dna.length <= 0) {
        ctx.throw(400, 'El ADN es requerido');
    }
};
const validateLength = (ctx, dna) => {
    const numberSequences = dna.length;
    dna.map((nitrogenBase) => {
        if (numberSequences !== nitrogenBase.length) {
            ctx.throw(400, 'La matriz debe ser simetrica (NxN)');
        }
    });
};
const validateLetters = (ctx, dna) => {
    dna.map((nitrogenBase) => {
        const pattern = new RegExp('^[ATGC]+$', 'i');
        if (!pattern.test(nitrogenBase)) {
            ctx.throw(400, 'Letra de base nitrogenada inválida');
        }
    });
};
exports.default = validation;
//# sourceMappingURL=validation.js.map