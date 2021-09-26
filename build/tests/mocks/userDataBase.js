"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataBaseMock = void 0;
const UserDatabase_1 = require("../../src/data/UserDatabase");
class UserDataBaseMock extends UserDatabase_1.UserDatabase {
    constructor() {
        super(...arguments);
        this.createUser = jest.fn();
    }
}
exports.UserDataBaseMock = UserDataBaseMock;
//# sourceMappingURL=userDataBase.js.map