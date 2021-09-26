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
const BandBusiness_1 = require("../src/business/BandBusiness");
const Authenticator_1 = require("./mocks/Authenticator");
const bandDataBase_1 = require("./mocks/bandDataBase");
const idGenerator_1 = require("./mocks/idGenerator");
describe("Cadastrar banda", () => {
    test("Sucesso ao criar banda", () => __awaiter(void 0, void 0, void 0, function* () {
        const bandDataBaseMock = new bandDataBase_1.BandDataBaseMock();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const bandBusiness = new BandBusiness_1.BandBusiness(bandDataBaseMock, authenticator, idGenerator);
        const band = {
            name: "matheus",
            musicGenre: "samba",
            responsible: "djdjdj"
        };
        const result = yield bandBusiness
            .registerBand(band.name, band.musicGenre, band.responsible, "token");
        expect(result).toEqual("Band adicionada!");
    }));
    test("Erro ao criar banda com um valor vazio no 'Body Request'", () => __awaiter(void 0, void 0, void 0, function* () {
        const bandDataBaseMock = new bandDataBase_1.BandDataBaseMock();
        const authenticator = new Authenticator_1.Authenticator();
        const idGenerator = new idGenerator_1.IdGeneratorMock();
        const bandBusiness = new BandBusiness_1.BandBusiness(bandDataBaseMock, authenticator, idGenerator);
        const band = {
            name: "matheus",
            musicGenre: "",
            responsible: "djdjdj"
        };
        try {
            yield bandBusiness
                .registerBand(band.name, band.musicGenre, band.responsible, "token");
        }
        catch (error) {
            expect(error.message).toEqual(" Parâmetros faltando ");
        }
    }));
});
//# sourceMappingURL=BandBusiness.test.js.map