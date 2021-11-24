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
const GetStat = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { count_human_dna, count_mutant_dna } = yield Mutant_1.default.getStat();
    const ratio = count_human_dna === 0 ? 'No existe' : count_mutant_dna / count_human_dna;
    ctx.status = 200;
    ctx.body = {
        count_mutant_dna,
        count_human_dna,
        ratio
    };
});
exports.default = {
    GetStat
};
//# sourceMappingURL=stat.js.map