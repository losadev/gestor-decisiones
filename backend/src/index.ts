import express from "express";
import { connectionDB } from "./config/db.config";
import userRouter from "./routes/user.routes";
import login from "./routes/auth.routes";
import cors from "cors";
import { verifyUser } from "./middlewares/verifyUser";
import cookieParser from "cookie-parser";
import createDecisionRouter from "./routes/decision.routes";
import deleteDecisionRouter from "./routes/decision.routes";
import evaluationRouter from "./routes/evaluation.router";
import recommendationRouter from "./routes/recommendation.routes";

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
app.use("/api/decision", verifyUser, createDecisionRouter);
app.use("/api/evaluation", verifyUser, evaluationRouter);
app.use("/api/recommendation", verifyUser, recommendationRouter);
app.use("/api/decision/:id", verifyUser, deleteDecisionRouter);

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, async () => {
  connectionDB();
});
