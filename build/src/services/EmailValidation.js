"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailValidation {
    isValidEmail(input) {
        if (!input.includes("@") ? true
            : !input.split("@")[0] ? true
                : !input.split("@")[1].includes(".") ? true
                    : input.split("@")[1].split(".")[0].length > 0 &&
                        input.split("@")[1].split(".")[1].length > 0 ? false : true) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.default = EmailValidation;
//# sourceMappingURL=EmailValidation.js.map