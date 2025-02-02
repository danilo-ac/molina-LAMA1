import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { showRouter } from "./routes/showRouter";
import { bandRouter } from "./routes/bandRouter";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/show", showRouter)
app.use("/band",bandRouter)

const server = app.listen(process.env.PORT || 8000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
  });
