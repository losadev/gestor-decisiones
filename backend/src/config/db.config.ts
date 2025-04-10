import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";

export const sequelize = new Sequelize({
  database: "proyecto-final-db",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgres",
  models: [User],
});

export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("La conexión ha sido establecida");
  } catch (error) {
    console.log("Error al conectarse a la BD", error);
  }
};
