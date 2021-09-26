"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
class Authenticator {
    constructor() {
        this.generateToken = jest
            .fn((input) => {
            return "token";
        });
        this.getData = jest
            .fn((token) => {
            return {
                id: "1",
                role: "ADMIN"
            };
        });
    }
}
exports.Authenticator = Authenticator;
//# sourceMappingURL=Authenticator.js.map