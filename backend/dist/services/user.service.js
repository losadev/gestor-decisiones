"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.userService = {
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, lastName, email, password, birthDate, avatar } = userData;
        const avatarUrl = avatar || "";
        const SALT = Number(process.env.SALT) || 10;
        const hash = yield bcryptjs_1.default.hash(password, SALT);
        const existingUser = yield user_model_1.User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("Ya existe un usario con ese correo");
        }
        const user = yield user_model_1.User.create({
            id: (0, uuid_1.v4)(),
            name,
            lastName,
            email,
            password: hash,
            birthDate,
            avatar: avatarUrl,
        });
        return user;
    }),
    updateUser: (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findByPk(userId);
        if (!user)
            return null;
        if (updateData.password) {
            const SALT = Number(process.env.SALT) || 10;
            const hashedPassword = yield bcryptjs_1.default.hash(updateData.password, SALT);
            updateData.password = hashedPassword;
        }
        yield user.update(updateData);
        return user;
    }),
};
