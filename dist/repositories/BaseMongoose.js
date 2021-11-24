"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseMongoose {
    constructor(doc) {
        this.document = doc;
    }
    static getDoc(data) {
        const MyModel = this.model;
        return new MyModel(data);
    }
}
exports.default = BaseMongoose;
//# sourceMappingURL=BaseMongoose.js.map