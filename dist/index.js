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
exports.server = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const router_1 = __importDefault(require("./router"));
const error_1 = __importDefault(require("./common/middlewares/error"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./common/db"));
const koaApp = new koa_1.default();
function main(app = koaApp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Connecting to DB');
            yield db_1.default.initDb();
        }
        catch (error) {
            console.log(`Failed DB connection: ${error}`);
        }
        app.use((0, koa2_cors_1.default)());
        app.use((0, koa_logger_1.default)());
        app.use((0, koa_bodyparser_1.default)());
        app.use((0, koa_helmet_1.default)());
        app.use(error_1.default);
        app.use(router_1.default.routes());
        app.listen(config_1.default.application.port || 3000, () => {
            console.log(`Listening on ${config_1.default.application.port || 3000}`);
        });
    });
}
exports.server = main();
exports.default = koaApp;
//# sourceMappingURL=index.js.map