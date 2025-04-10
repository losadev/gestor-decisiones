import express from "express";
import { connectionDB, sequelize } from "./config/db.config";
import useRouter from "./routes/user.route";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/register", useRouter);

app.listen(PORT, async () => {
  connectionDB();
  await sequelize.sync({ force: true });
  console.log("Server running at PORT ", PORT);
});
