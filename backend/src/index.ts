import express from "express";
import { connectionDB } from "./config/database";
import userRouter from "./routes/user.routes";
import login from "./routes/auth.routes";
import cors from "cors";
import { verifyUser } from "./middlewares/verifyUser";
import cookieParser from "cookie-parser";
import decisionRouter from "./routes/decision.routes";
import evaluationRouter from "./routes/evaluation.routes";
import recommendationRouter from "./routes/recommendation.routes";
import prosConsRouter from "./routes/proCon.routes";
import fs from "fs";
import path from "path";
import { logout } from "./controllers/auth.controller";
//import "./types/express";

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://172.19.0.4:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/register", userRouter);
app.use("/api/login", login);

app.get("/api/me", verifyUser, (req, res) => {
  const user = (req as any).user as any;
  if (!user) {
    res.status(401).send({ message: "ERROR EN /api/me" });
    return;
  }
  res.json({ user: user });
});

app.use("/api/decision", verifyUser, decisionRouter);
app.use("/api/evaluation", verifyUser, evaluationRouter);
app.use("/api/recommendation", verifyUser, recommendationRouter);
app.use("/api/proscons", verifyUser, prosConsRouter);
app.post("/api/logout", logout);
app.use("/api/users", verifyUser, userRouter);

app.get("/", (_req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, async () => {
  connectionDB();
});
