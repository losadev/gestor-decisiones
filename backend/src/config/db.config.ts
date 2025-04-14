import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import dotenv from "dotenv";
import { Decision } from "../models/decision.model";
import { Category } from "../models/category.model";

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  host: "localhost",
  dialect: "postgres",
  models: [User, Category, Decision],
});

export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("La conexión ha sido establecida");
  } catch (error) {
    console.log("Error al conectarse a la BD", error);
  }
};
