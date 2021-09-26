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
exports.BandBusiness = void 0;
const User_1 = require("../model/User");
class BandBusiness {
    constructor(bandDataBase, authenticator, idGenerator) {
        this.bandDataBase = bandDataBase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
    }
    registerBand(name, musicGenre, responsible, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || !musicGenre || !responsible) {
                throw new Error(" Parâmetros faltando ");
            }
            const tokenData = this.authenticator.getData(token);
            if (tokenData.role !== User_1.UserRole.ADMIN) {
                throw new Error("Somente adm pode adicionar banda");
            }
            const id = this.idGenerator.generate();
            const band = {
                id: id,
                name: name,
                musicGenre: musicGenre,
                responsible: responsible
            };
            yield this.bandDataBase.registerBand(band);
            return "Band adicionada!";
        });
    }
    getBandById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const band = yield this.bandDataBase.getBandById(id);
            if (band.length === 0) {
                throw new Error("Id não existente!");
            }
            return band;
        });
    }
}
exports.BandBusiness = BandBusiness;
//# sourceMappingURL=BandBusiness.js.map