import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, lastName, email, password, birthDate, avatar } = req.body;
    const avatarUrl = avatar || "";
    const SALT = Number(process.env.SALT) || 10;
    const hash = await bcrypt.hash(password, SALT);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "Ya existe un usario con ese correo" });
      return;
    }

    const user = await User.create({
      id: uuidv4(),
      name,
      lastName,
      email,
      password: hash,
      birthDate,
      avatar: avatarUrl,
    });

    res.status(201).json({ message: "Usuario creado con éxito", data: user });
    return;
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Internal Error", error: error.message });
    return;
  }
};
