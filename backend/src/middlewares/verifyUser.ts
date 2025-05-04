import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const SECRET_ACCESS_TOKEN = process.env.JWT_SECRET;

    const token = req.cookies["access_token"];
    console.log("Token recibido: ", req.cookies);

    if (!token) {
      res.status(401).json({ message: "No se ha proveído el token" });
      return;
    }

    if (!SECRET_ACCESS_TOKEN) {
      res.status(500).json({ message: "El secreto JWT no se ha configurado" });
      return;
    }

    /**
     * 1. Decodifica el token
     * 2. Verfica la firma
     * 3. Develve el payload
     */
    const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN) as jwt.JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    const existingUser = await User.findByPk(decoded.id);

    if (!existingUser) {
      res.status(401).json({ message: "Usuario no encontrado" });
      return;
    }

    const { password, ...data } = existingUser.get({ plain: true });
    req.user = data;
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
