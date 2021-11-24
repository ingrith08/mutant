"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Mutant_1;
Object.defineProperty(exports, "__esModule", { value: true });
const mutant_1 = require("../models/mutant");
const BaseMongoose_1 = __importDefault(require("./BaseMongoose"));
const decorator_1 = __importDefault(require("./decorator"));
let Mutant = Mutant_1 = class Mutant extends BaseMongoose_1.default {
    constructor(data) {
        super(Mutant_1.getDoc(data));
        this.dna = data.dna;
        this.isMutant = data.isMutant;
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.model.create(data);
            return customer;
        });
    }
    static getStat() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.model.aggregate([
                { $group: {
                        _id: "mutant",
                        count_human_dna: { $sum: { $cond: [{ $eq: [false, "$isMutant"] }, 1, 0] } },
                        count_mutant_dna: { $sum: { $cond: [{ $eq: [true, "$isMutant"] }, 1, 0] } }
                    }
                }
            ]))[0];
        });
    }
};
Mutant = Mutant_1 = __decorate([
    (0, decorator_1.default)(mutant_1.mutantModel, mutant_1.MuntantSchema)
], Mutant);
exports.default = Mutant;
//# sourceMappingURL=Mutant.js.map