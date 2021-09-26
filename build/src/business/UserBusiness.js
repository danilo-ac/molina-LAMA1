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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
class UserBusiness {
    constructor(userDataBase, authenticator, hashManager, idGenerator, emailValidation) {
        this.userDataBase = userDataBase;
        this.authenticator = authenticator;
        this.hashManager = hashManager;
        this.idGenerator = idGenerator;
        this.emailValidation = emailValidation;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email) {
                throw new Error("Empty 'Email'");
            }
            else if (!this.emailValidation.isValidEmail(user.email)) {
                throw new Error("Invalid 'Email'");
            }
            if (!user.password) {
                throw new Error("Empty 'Password'");
            }
            if (!user.name) {
                throw new Error("Empty 'Name'");
            }
            if (!user.role) {
                throw new Error("Empty 'Role'");
            }
            else if (!["ADMIN", "NORMAL"]
                .includes(user.role.toLocaleUpperCase().trim())) {
                throw new Error("'Role' must be 'admin' or 'normal'");
            }
            const id = this.idGenerator.generate();
            user.role = user.role.toUpperCase().trim();
            const hashPassword = yield this.hashManager.hash(user.password);
            yield this.userDataBase.createUser(id, user.email, user.name, hashPassword, user.role);
            const accessToken = this.authenticator.generateToken({ id, role: user.role });
            return accessToken;
        });
    }
    getUserByEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.email) {
                throw new Error("Empty 'Email'");
            }
            else if (!this.emailValidation.isValidEmail(user.email)) {
                throw new Error("Invalid 'Email'");
            }
            const userFromDB = yield this.userDataBase.getUserByEmail(user.email);
            if (!user.password) {
                throw new Error("Empty 'Password'");
            }
            const hashCompare = yield this.hashManager.compare(user.password, userFromDB.getPassword());
            const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });
            if (!hashCompare) {
                throw new Error("Invalid Password!");
            }
            return accessToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map