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
const UserBusiness_1 = require("../src/business/UserBusiness");
const Authenticator_1 = require("./mocks/Authenticator");
const EmailValidation_1 = __importDefault(require("./mocks/EmailValidation"));
const HashManager_1 = require("./mocks/HashManager");
const idGenerator_1 = require("./mocks/idGenerator");
const userDataBase_1 = require("./mocks/userDataBase");
describe("Cadastro", () => {
    test("Sucesso ao criar usuario", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userDataMock = new userDataBase_1.UserDataBaseMock();
        const hashManager = new HashManager_1.HashManager();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const emailValidation = new EmailValidation_1.default();
        const userBusiness = new UserBusiness_1.UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation);
        try {
            const result = yield userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "123456",
                role: "ADMIN"
            });
            expect(result).toBeDefined();
        }
        catch (err) {
            console.error(err);
        }
    }));
    test("Retorna erro quando email estiver vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userDataMock = new userDataBase_1.UserDataBaseMock();
        const hashManager = new HashManager_1.HashManager();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const emailValidation = new EmailValidation_1.default();
        try {
            const userBusiness = new UserBusiness_1.UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation);
            yield userBusiness.createUser({
                name: "matheus",
                email: "",
                password: "123456",
                role: "ADMIN"
            });
        }
        catch (error) {
            expect(error.message).toEqual("Empty 'Email'");
        }
    }));
    test("Retorna erro quando email é inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userDataMock = new userDataBase_1.UserDataBaseMock();
        const hashManager = new HashManager_1.HashManager();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const emailValidation = new EmailValidation_1.default();
        const userBusiness = new UserBusiness_1.UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation);
        try {
            const result = yield userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd",
                password: "123456",
                role: "ADMIN"
            });
        }
        catch (err) {
            expect(err.message).toEqual("Invalid 'Email'");
        }
    }));
    test("Retorna erro quando 'role' é diferente de 'admin' ou 'normal'", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const userDataMock = new userDataBase_1.UserDataBaseMock();
        const hashManager = new HashManager_1.HashManager();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const emailValidation = new EmailValidation_1.default();
        const userBusiness = new UserBusiness_1.UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation);
        try {
            const result = yield userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "123456",
                role: "1"
            });
        }
        catch (err) {
            expect(err.message).toEqual("'Role' must be 'admin' or 'normal'");
        }
    }));
    test("Retorna erro quando 'password' está ausente ou vazia", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const userDataMock = new userDataBase_1.UserDataBaseMock();
        const hashManager = new HashManager_1.HashManager();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const emailValidation = new EmailValidation_1.default();
        const userBusiness = new UserBusiness_1.UserBusiness(userDataMock, authenticator, hashManager, idGenerator, emailValidation);
        try {
            const result = yield userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                role: "admin"
            });
        }
        catch (err) {
            expect(err.message).toEqual("Empty 'Password'");
        }
        try {
            const result = yield userBusiness.createUser({
                name: "matheus",
                email: "mateheu@jdjdjd.com",
                password: "",
                role: "admin"
            });
        }
        catch (err) {
            expect(err.message).toEqual("Empty 'Password'");
        }
    }));
});
//# sourceMappingURL=UserBusiness.test.js.map