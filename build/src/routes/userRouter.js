"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", UserController_1.default.signup);
exports.userRouter.post("/login", UserController_1.default.login);
//# sourceMappingURL=userRouter.js.map