import express, { Request, Response } from "express";
import { connectionDB, sequelize } from "./config/db.config";
import userRouter from "./routes/user.routes";
import login from "./routes/auth.routes";
import cors from "cors";
import { verify } from "./middlewares/verify";
import cookieParser from "cookie-parser"; // Importa cookie-parser

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Configura cookie-parser para poder leer cookies

const PORT = process.env.PORT || 3000;

app.use("/api/register", userRouter);
app.use("/api/login", login);
app.get("/api/try", verify, (req: Request, res: Response) => {
  res.json({ data: req.body, message: "Funciona", token: req.cookies });
});

app.listen(PORT, async () => {
  connectionDB();
  await sequelize.sync({ force: true });
  console.log("Server running at PORT ", PORT);
});
