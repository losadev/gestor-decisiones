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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProsConsById = void 0;
const proCon_model_1 = require("../models/proCon.model");
const getAllProsConsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prosCons = yield proCon_model_1.ProCon.findAll({
            where: { decisionId: id },
        });
        if (prosCons.length === 0) {
            res.status(404).json({
                message: "No se han encontrado los pros y contras",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "Se han recuperado todos los pros y contras",
            prosCons,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Ha ocurrido un error en el servidor", success: false });
    }
});
exports.getAllProsConsById = getAllProsConsById;
