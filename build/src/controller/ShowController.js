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
exports.ShowController = void 0;
const ShowBusiness_1 = __importDefault(require("../business/ShowBusiness/ShowBusiness"));
const SQLShowDatabase_1 = __importDefault(require("../data/ShowDatabase/SQLShowDatabase"));
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
class ShowController {
    constructor(showBusiness) {
        this.showBusiness = showBusiness;
    }
    createShow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getShowId = yield showBusiness
                    .createShow(req.body, req.headers.authorization);
                return res
                    .status(200)
                    .send(getShowId)
                    .end();
            }
            catch (err) {
                res
                    .status(err.code || 500)
                    .send({
                    message: err.message || "Internal Error",
                    error: err.tips || "Something went wrong"
                })
                    .end();
            }
        });
    }
    getShowByWeekDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const showsList = yield showBusiness
                    .getShowByWeekDay(req.params.weekDay);
                !showsList ?
                    res
                        .status(204)
                        .end()
                    : res
                        .status(200)
                        .send(showsList)
                        .end();
            }
            catch (err) {
                res
                    .status(err.code || 500)
                    .send({
                    message: err.message || "Internal Error",
                    error: err.tips || "Something went wrong"
                })
                    .end();
            }
        });
    }
}
exports.ShowController = ShowController;
const userDatabase = new SQLShowDatabase_1.default();
const idGenerator = new IdGenerator_1.IdGenerator();
const authenticator = new Authenticator_1.Authenticator();
const showBusiness = new ShowBusiness_1.default(userDatabase, authenticator, idGenerator);
const showController = new ShowController(showBusiness);
exports.default = showController;
//# sourceMappingURL=ShowController.js.map