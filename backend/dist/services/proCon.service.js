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
exports.proConService = void 0;
const proCon_model_1 = require("../models/proCon.model");
const uuid_1 = require("uuid");
exports.proConService = {
    create: (proConData) => __awaiter(void 0, void 0, void 0, function* () {
        const { description, type, weight, decisionId } = proConData;
        const proCon = yield proCon_model_1.ProCon.create({
            id: (0, uuid_1.v4)(),
            description,
            type,
            weight,
            decisionId,
        });
        return proCon;
    }),
    update: (proConId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const proCon = yield proCon_model_1.ProCon.findOne({ where: { id: proConId } });
        if (!proCon) {
            throw new Error("El pro/con no existe");
        }
        yield proCon.update(updateData);
        return proCon;
    }),
    deleteById: (proConId) => __awaiter(void 0, void 0, void 0, function* () {
        const proCon = yield proCon_model_1.ProCon.findOne({ where: { id: proConId } });
        if (!proCon) {
            throw new Error("El pro/con no existe");
        }
        yield proCon.destroy();
        return true;
    }),
    getByDecisionId: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        const proCons = yield proCon_model_1.ProCon.findAll({ where: { decisionId } });
        return proCons;
    }),
    deleteAllByDecisionId: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        yield proCon_model_1.ProCon.destroy({
            where: { decisionId },
        });
    }),
};
