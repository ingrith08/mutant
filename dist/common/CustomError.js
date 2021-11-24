"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line no-shadow
var errorCodes;
(function (errorCodes) {
    errorCodes[errorCodes["UNKNOWN_ERROR"] = 0] = "UNKNOWN_ERROR";
})(errorCodes || (errorCodes = {}));
/**
 * El proposito de esta clase es proveer errores mas informativos que faciliten la resolucion de problemas usando
 * los logs
 */
class CustomError extends Error {
    /**
     *
     * @param message Mensaje principal del error
     * @param opts Data para incluir en el error
     */
    constructor(message, opts) {
        super(message);
        this.isCustomError = true;
        this.statusCode = (opts === null || opts === void 0 ? void 0 : opts.statusCode) || 500;
        this.code = (opts === null || opts === void 0 ? void 0 : opts.code) || 0;
        this.function = CustomError.getLine(this.stack || '');
        this.type = (opts === null || opts === void 0 ? void 0 : opts.type) || this.name;
        this.name = this.type;
        this.data = opts === null || opts === void 0 ? void 0 : opts.data;
    }
    static getLine(stack) {
        return stack.split('\n')[1].trim();
    }
    /**
     * Transforma el custom error en un objeto literal
     * @returns Objeto literal con la data del error
     */
    toObject() {
        const { type, statusCode, code, data } = this;
        return {
            function: this.function,
            type,
            statusCode,
            code,
            data,
        };
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map