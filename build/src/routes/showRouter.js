"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRouter = void 0;
const express_1 = __importDefault(require("express"));
const ShowController_1 = __importDefault(require("../controller/ShowController"));
exports.showRouter = express_1.default.Router();
exports.showRouter.post("/create", ShowController_1.default.createShow);
exports.showRouter.get("/:weekDay", ShowController_1.default.getShowByWeekDay);
//# sourceMappingURL=showRouter.js.map