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
exports.decisionService = void 0;
const decision_model_1 = require("../models/decision.model");
const decision_repository_1 = require("../repositories/decision.repository");
const uuid_1 = require("uuid");
exports.decisionService = {
    create: (decisionData) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, category, userId } = decisionData;
        const decision = yield decision_model_1.Decision.create({
            id: (0, uuid_1.v4)(),
            title,
            category,
            userId,
        });
        return decision;
    }),
    delete: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedDecision = yield (0, decision_repository_1.deleteDecisionById)(decisionId);
        return deletedDecision;
    }),
    getById: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        const decision = yield decision_model_1.Decision.findOne({
            where: { id: decisionId },
        });
        return decision;
    }),
    update: (decisionId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const decision = yield decision_model_1.Decision.findOne({ where: { id: decisionId } });
        if (!decision) {
            throw new Error("La decisión no existe");
        }
        yield decision.update(updateData);
        return decision;
    }),
};
