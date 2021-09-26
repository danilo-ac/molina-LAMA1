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
exports.BandController = void 0;
const BandBusiness_1 = require("../business/BandBusiness");
const BandDataBase_1 = require("../data/BandDataBase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class BandController {
    constructor(bandBusiness) {
        this.bandBusiness = bandBusiness;
    }
    registerBnad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, musicGenre, responsible } = req.body;
                const token = req.headers.authorization;
                yield bandBusiness.registerBand(name, musicGenre, responsible, token);
                res.status(200).send("Band adicionada!");
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getBandById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield bandBusiness.getBandById(id);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.BandController = BandController;
const bandDataBase = new BandDataBase_1.BandDataBase();
const authenticator = new Authenticator_1.Authenticator();
const idGenerator = new IdGenerator_1.IdGenerator();
const bandBusiness = new BandBusiness_1.BandBusiness(bandDataBase, authenticator, idGenerator);
const bandController = new BandController(bandBusiness);
exports.default = bandController;
//# sourceMappingURL=BandController.js.map