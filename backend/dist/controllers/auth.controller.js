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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateAccessJWT_1 = require("../utils/generateAccessJWT");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield user_model_1.User.findOne({ where: { email } });
    if (!existingUser) {
        res
            .status(400)
            .json({
            message: "No existe ningun usuario con ese correo electrónico",
            success: false,
        });
        return;
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(req.body.password, existingUser.password);
    if (!isPasswordValid) {
        res
            .status(401)
            .json({ message: "La contraseña es incorrecta", success: false });
        return;
    }
    const _a = existingUser.get({
        plain: true,
    }), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    let options = {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    };
    const token = (0, generateAccessJWT_1.generateAccessJWT)({ id: existingUser.id });
    res.cookie("access_token", token, options);
    res.status(200).json({
        message: "Usuario loegueado con éxito",
        token,
        data: userWithoutPassword,
        success: true,
    });
});
exports.login = login;
const logout = (_req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res
        .status(200)
        .json({ message: "Sesión cerrada correctamente", success: true });
};
exports.logout = logout;
