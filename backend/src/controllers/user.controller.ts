import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/User.model";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  const { body } = req.body;
  const SALT = process.env.SALT || 10;
  const { password } = body;
  const hash = await bcrypt.hash(password, SALT);

  await User.create({
    id: body.,
    name,
    lastName,
  });
  try {
  } catch (error) {}
};
