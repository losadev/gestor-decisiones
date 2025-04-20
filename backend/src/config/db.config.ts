import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import dotenv from "dotenv";
import { Decision } from "../models/decision.model";
import { Category } from "../models/category.model";
import { ProCon } from "../models/proCon.model";
import { Evaluation } from "../models/evaluation.model";
import { Recommendation } from "../models/recommendation.model";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  host: "localhost",
  dialect: "postgres",
  models: [User, Category, Decision, ProCon, Evaluation, Recommendation],
});

export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log(`Server running at http://localhost:${process.env.PORT}/`);
  } catch (error: any) {
    console.log("Error al conectarse a la BD", error.message);
  }
};
