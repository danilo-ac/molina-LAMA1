"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class CustomError extends BaseError_1.BaseError {
    constructor(message, code, tips) {
        super(message, code);
        this.message = message;
        this.code = code;
        this.tips = tips;
    }
}
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map