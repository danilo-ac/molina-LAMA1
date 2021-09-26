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
exports.UserController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const BaseDatabase_1 = require("../data/BaseDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
const EmailValidation_1 = __importDefault(require("../services/EmailValidation"));
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    role: req.body.role
                };
                const token = yield userBusiness.createUser(input);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = {
                    email: req.body.email,
                    password: req.body.password
                };
                const token = yield userBusiness.getUserByEmail(loginData);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
const hashManager = new HashManager_1.HashManager();
const authenticator = new Authenticator_1.Authenticator();
const idGenerator = new IdGenerator_1.IdGenerator();
const emailValidation = new EmailValidation_1.default();
const userDataBase = new UserDatabase_1.UserDatabase();
const userBusiness = new UserBusiness_1.UserBusiness(userDataBase, authenticator, hashManager, idGenerator, emailValidation);
const userController = new UserController(userBusiness);
exports.default = userController;
//# sourceMappingURL=UserController.js.map