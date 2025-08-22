import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const userService = {
  createUser: async (userData: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date;
    avatar?: string;
  }) => {
    const { name, lastName, email, password, birthDate, avatar } = userData;
    const avatarUrl = avatar || "";
    const SALT = Number(process.env.SALT) || 10;
    const hash = await bcrypt.hash(password, SALT);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Ya existe un usario con ese correo");
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

    return user;
  },
  updateUser: async (
    userId: string,
    updateData: {
      name?: string;
      lastName?: string;
      email?: string;
      password?: string;
      birthDate?: Date;
      avatar?: string;
    }
  ) => {
    const user = await User.findByPk(userId);
    if (!user) return null;

    if (updateData.password) {
      const SALT = Number(process.env.SALT) || 10;
      const hashedPassword = await bcrypt.hash(updateData.password, SALT);
      updateData.password = hashedPassword;
    }

    await user.update(updateData);

    return user;
  },
};
