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
exports.verifyCurrentPassword = exports.updatePassword = exports.updateUser = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("../services/user.service");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const avatarUrl = req.file ? req.file.filename : "";
        const user = yield user_service_1.userService.createUser(Object.assign(Object.assign({}, req.body), { avatar: avatarUrl }));
        res
            .status(201)
            .json({ message: "Usuario creado con éxito", data: user, success: true });
    }
    catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Ha ocurrido un error en el servidor",
                success: false,
            });
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const avatarUrl = req.file ? req.file.filename : undefined;
        const updatedData = Object.assign(Object.assign({}, req.body), (avatarUrl && { avatar: avatarUrl }));
        const updatedUser = yield user_service_1.userService.updateUser(userId, updatedData);
        if (!updatedUser) {
            res.status(404).json({
                message: "Usuario no encontrado",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "Usuario actualizado con éxito",
            data: updatedUser,
            success: true,
        });
    }
    catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                message: "Ha ocurrido un error en el servidor",
                success: false,
            });
        }
    }
});
exports.updateUser = updateUser;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;
    try {
        const user = yield user_model_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Contraseña actual incorrecta" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        yield user.save();
        res.json({ message: "Contraseña actualizada correctamente" });
    }
    catch (err) {
        res.status(500).json({ message: "Error al actualizar la contraseña" });
    }
});
exports.updatePassword = updatePassword;
const verifyCurrentPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const userId = req.params.id;
    try {
        const user = yield user_model_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
        }
        res.json({ message: "Contraseña correcta" });
    }
    catch (err) {
        res.status(500).json({ message: "Error al verificar la contraseña" });
    }
});
exports.verifyCurrentPassword = verifyCurrentPassword;
