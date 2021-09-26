"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const showRouter_1 = require("./routes/showRouter");
const bandRouter_1 = require("./routes/bandRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/show", showRouter_1.showRouter);
app.use("/band", bandRouter_1.bandRouter);
const server = app.listen(process.env.PORT || 8000, () => {
    if (server) {
        const address = server.address();
        console.log(`Servidor rodando em http://localhost:${address.port}`);
    }
    else {
        console.error(`Falha ao rodar o servidor.`);
    }
});
//# sourceMappingURL=index.js.map