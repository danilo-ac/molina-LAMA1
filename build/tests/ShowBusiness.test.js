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
const ShowBusiness_1 = __importDefault(require("../src/business/ShowBusiness/ShowBusiness"));
const Authenticator_1 = require("./mocks/Authenticator");
const idGenerator_1 = require("./mocks/idGenerator");
const SQLShowDatabase_1 = __importDefault(require("./mocks/ShowDatabase/SQLShowDatabase"));
const SQLShowDatabase2_1 = __importDefault(require("./mocks/ShowDatabase/SQLShowDatabase2"));
describe("Conjunto de testes para o endpoint de 'Show'", () => {
    test("Sucesso ao criar um show, retornando um 'showId' ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "11",
            weekDay: "sábado",
            startTime: 22,
            endTime: 23
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
            expect(res).toEqual({ showId: 1 });
        }
        catch (err) {
            err;
        }
    }));
    test("Erro ao criar um show com 'Body Request' de 'keys' inválidas", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            aUhsiahudaiuhd: "1",
            week_Day: "sábado",
            start_Time: 7,
            end_Time: 8
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.message).toEqual("Invalid or missing key");
        }
    }));
    test("Erro ao criar um show com 'bandId' inválido", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase2_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "x",
            weekDay: "sábado",
            startTime: 8,
            endTime: 9
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.tips).toEqual("ID of 'bandId' is invalid");
        }
    }));
    test("Erro ao criar um show com 'Body Request' com 'keys' ausentes", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            weekDay: "sábado",
            startTime: 7,
            endTime: 8
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.message).toEqual("Invalid or missing key");
            expect(err.tips).toEqual([
                "Is expected 'bandId', 'weekDay', 'startTime', 'endTime' keys",
                "'bandId: string format",
                "'weekDay': string 'sexta', 'sábado' or 'domingo' value",
                "'startTime': number between '8' up to '22', and only intergers numbers",
                "'endTime': number between '9' up to '23', and only intergers numbers"
            ]);
        }
    }));
    test("Erro ao criar um show com horário fora do intervalo 8h-23h", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 7,
            endTime: 8
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.tips).toEqual("'startTime': number between '8' up to '22', and only intergers numbers");
        }
    }));
    test("Erro ao criar um show com horário não inteiro, ex.: 8.30h", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 8.3,
            endTime: 9
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.tips).toEqual("'startTime': number between '8' up to '22', and only intergers numbers");
        }
    }));
    test("Erro ao criar um show já existente no mesmo dia de evento", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "1",
            weekDay: "sábado",
            startTime: 22,
            endTime: 23
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
            console.log(res);
        }
        catch (err) {
            expect(err.tips.message).toEqual("Show already scheduled in same date");
        }
    }));
    test("Erro ao criar um show que tem conflito de horário com outro show", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        const mockCreateShowDTO = {
            bandId: "11",
            weekDay: "sábado",
            startTime: 8,
            endTime: 10
        };
        const mockToken = "token";
        try {
            const res = yield showBusiness.createShow(mockCreateShowDTO, mockToken);
        }
        catch (err) {
            expect(err.tips.message).toEqual("There is a schedule conflict");
        }
    }));
    test("Sucesso ao listar shows de um dos dias de evento", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(3);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        try {
            const res = yield showBusiness.getShowByWeekDay("domingo");
            expect(res.length).toBeGreaterThanOrEqual(0);
        }
        catch (err) {
            err;
        }
        try {
            const res = yield showBusiness.getShowByWeekDay("sábado");
            expect(res.length).toBeGreaterThanOrEqual(0);
        }
        catch (err) {
            err;
        }
        try {
            const res = yield showBusiness.getShowByWeekDay("sexta");
            expect(res.length).toBeGreaterThanOrEqual(0);
        }
        catch (err) {
            err;
        }
    }));
    test("Erro ao listar shows fora dos dias de evento", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(2);
        const mockShowDatabase = new SQLShowDatabase_1.default();
        const mockauthenticator = new Authenticator_1.Authenticator();
        const mockIdGenerator = new idGenerator_1.IdGeneratorMock();
        const showBusiness = new ShowBusiness_1.default(mockShowDatabase, mockauthenticator, mockIdGenerator);
        try {
            const res = yield showBusiness.getShowByWeekDay("quinta");
        }
        catch (err) {
            expect(err.message).toEqual("Invalid or Missing Value");
            expect(err.tips).toEqual("'weekDay': 'sexta', 'sábado' or 'domingo' string value");
        }
    }));
});
//# sourceMappingURL=ShowBusiness.test.js.map