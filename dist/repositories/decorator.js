"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function MongooseDecorator(model, schema) {
    return function decorator(Base) {
        var _a;
        return _a = class extends Base {
            },
            _a.model = model,
            _a.schema = schema,
            _a;
    };
}
exports.default = MongooseDecorator;
//# sourceMappingURL=decorator.js.map