"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bandRouter = void 0;
const express_1 = __importDefault(require("express"));
const BandController_1 = __importDefault(require("../controller/BandController"));
exports.bandRouter = express_1.default.Router();
exports.bandRouter.post("/addBand", BandController_1.default.registerBnad);
exports.bandRouter.get("/getBand/:id", BandController_1.default.getBandById);
//# sourceMappingURL=bandRouter.js.map