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
exports.getEvaluationByDecisionId = exports.getAllEvaluations = exports.createEvaluation = void 0;
const evaluation_service_1 = require("../services/evaluation.service");
const createEvaluation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { result, score, decisionId } = req.body;
        const user = req.user;
        if (!decisionId) {
            res
                .status(404)
                .json({ message: "No se encuentra la Decisión", success: false });
            return;
        }
        const evaluation = yield evaluation_service_1.evaluationService.create({
            result,
            score,
            decisionId,
            userId: user.id,
        });
        res.status(201).json({
            message: "Evaluación creada con éxito",
            data: evaluation,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
            success: false,
        });
    }
});
exports.createEvaluation = createEvaluation;
const getAllEvaluations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evaluations = yield evaluation_service_1.evaluationService.getAll();
        res.status(200).json({
            message: "Evaluaciones obtenidas con éxito",
            data: evaluations,
            success: true,
        });
    }
    catch (error) {
        console.error("Error al obtener las evaluaciones:", error);
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
            success: false,
        });
    }
});
exports.getAllEvaluations = getAllEvaluations;
const getEvaluationByDecisionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decisionId } = req.params;
        if (!decisionId) {
            res
                .status(400)
                .json({ message: "Falta el ID de la decisión", success: false });
            return;
        }
        const evaluation = yield evaluation_service_1.evaluationService.getByDecisionId(decisionId);
        if (!evaluation) {
            res.status(404).json({
                message: "Evaluación no encontrada para esta decisión",
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: "Evaluación obtenida con éxito",
            data: evaluation,
        });
    }
    catch (error) {
        console.error("Error al obtener la evaluación:", error);
        res.status(500).json({
            message: "Server Internal Error",
            error: error.message || error,
        });
    }
});
exports.getEvaluationByDecisionId = getEvaluationByDecisionId;
