import express, { Request, Response } from "express";
import { connectionDB, sequelize } from "./config/db.config";
import userRouter from "./routes/user.routes";
import login from "./routes/auth.routes";
import cors from "cors";
import { verify } from "./middlewares/verify";
import cookieParser from "cookie-parser";
import decisionRouter from "./routes/decision.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // cookie-parser para poder leer cookies

const PORT = process.env.PORT || 3000;

app.use("/api/register", userRouter);
app.use("/api/login", login);
app.get("/api/try", verify, (req: Request, res: Response) => {
  res.json({ data: req.body, message: "Funciona", token: req.cookies });
});
app.use("/api/decision", decisionRouter);

app.listen(PORT, async () => {
  connectionDB();
});
