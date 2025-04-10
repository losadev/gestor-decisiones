import express, { Request, Response } from "express";
import { connectionDB, sequelize } from "./config/db.config";
const app = express();

const PORT = 3000;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.listen(PORT, async () => {
  connectionDB();
  await sequelize.sync({ alter: true });
  console.log("Server running at PORT ", PORT);
});
