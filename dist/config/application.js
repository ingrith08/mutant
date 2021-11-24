"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'prod',
    dbUri: process.env.MONGO_URI || 'mongodb+srv://ingrhy:ingrhy@mutant.llzku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
};
//# sourceMappingURL=application.js.map