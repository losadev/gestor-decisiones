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
exports.evaluationService = void 0;
const evaluation_model_1 = require("../models/evaluation.model");
const uuid_1 = require("uuid");
exports.evaluationService = {
    create: (evaluationData) => __awaiter(void 0, void 0, void 0, function* () {
        const evaluation = yield evaluation_model_1.Evaluation.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, evaluationData), { date: new Date() }));
        return evaluation;
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const evaluations = yield evaluation_model_1.Evaluation.findAll({
            order: [["date", "DESC"]],
        });
        return evaluations;
    }),
    getByDecisionId: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        const evaluation = yield evaluation_model_1.Evaluation.findOne({
            where: { decisionId },
        });
        return evaluation;
    }),
};
