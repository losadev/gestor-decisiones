import express, { Request, Response } from "express";
import { connectionDB } from "./config/db.config";
import userRouter from "./routes/user.routes";
import login from "./routes/auth.routes";
import cors from "cors";
import { verifyUser } from "./middlewares/verifyUser";
import cookieParser from "cookie-parser";
import decisionRouter from "./routes/decision.routes";
import evaluationRouter from "./routes/evaluation.router";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // cookie-parser para poder leer cookies

const PORT = process.env.PORT || 3000;

app.use("/api/register", userRouter);
app.use("/api/login", login);
// app.get("/api/try", verifyUser, (req: Request, res: Response) => {
//   console.log("Esto es req.user : ", req.user);
//   res.json({ data: req.body, message: "Funciona", token: req.cookies });
// });
app.use("/api/decision", verifyUser, decisionRouter);
app.use("/api/evaluation", verifyUser, evaluationRouter);

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, async () => {
  connectionDB();
});
