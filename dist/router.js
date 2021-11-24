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
const koa_router_1 = __importDefault(require("koa-router"));
const validation_1 = __importDefault(require("./common/middlewares/validation"));
const mutant_1 = __importDefault(require("./controllers/mutant"));
const stat_1 = __importDefault(require("./controllers/stat"));
const router = new koa_router_1.default();
router.get('/healtcheck', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.status = 200;
    ctx.body = 'ok';
}));
router.get('/stats', stat_1.default.GetStat);
router.post('/mutant', validation_1.default, mutant_1.default.IsMutant);
exports.default = router;
//# sourceMappingURL=router.js.map