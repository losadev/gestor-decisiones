import { Sequelize } from "sequelize";

const sequalize = new Sequelize("proyecto-final-db", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export const connectionDB = async () => {
  try {
    await sequalize.authenticate();
    console.log("La conexion ha sido establecida");
  } catch (error) {
    console.log("Error al conectarse a la BD", error);
  }
};
