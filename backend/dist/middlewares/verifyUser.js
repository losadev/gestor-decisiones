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
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SECRET_ACCESS_TOKEN = process.env.JWT_SECRET;
        const token = req.cookies["access_token"];
        if (!token) {
            res.status(401).json({ message: "No se ha proveído el token" });
            return;
        }
        if (!SECRET_ACCESS_TOKEN) {
            res.status(500).json({ message: "El secreto JWT no está configurado" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_ACCESS_TOKEN);
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: "Token inválido" });
            return;
        }
        const existingUser = yield user_model_1.User.findByPk(decoded.id);
        if (!existingUser) {
            res.status(401).json({ message: "Usuario no encontrado" });
            return;
        }
        const _a = existingUser.get({ plain: true }), { password } = _a, data = __rest(_a, ["password"]);
        req.user = data;
        if (req.params.id && req.params.id !== String(data.id)) {
            res
                .status(403)
                .json({ message: "No tienes permiso para acceder a este recurso" });
            return;
        }
        next();
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error de autenticación", error: error.message });
    }
});
exports.verifyUser = verifyUser;
