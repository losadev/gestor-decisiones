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
exports.getRecommendations = exports.createRecommendation = void 0;
const openai_service_1 = require("../services/openai.service");
const evaluation_model_1 = require("../models/evaluation.model");
const decision_model_1 = require("../models/decision.model");
const recommendation_service_1 = require("../services/recommendation.service");
const proCon_model_1 = require("../models/proCon.model");
const createRecommendation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decisionId } = req.body;
        if (!decisionId) {
            res.status(400).json({ message: "No se encontró la Decision" });
            return;
        }
        const user = req.user;
        const existingRecommendation = yield recommendation_service_1.recommendationService.get(decisionId);
        if (existingRecommendation) {
            res
                .status(200)
                .json({ message: "Ya existe una recomendación para esta decisión." });
            return;
        }
        const recentDecisions = yield decision_model_1.Decision.findAll({
            where: { userId: user.id },
            include: [proCon_model_1.ProCon],
            order: [["createdAt", "DESC"]],
            limit: 3,
        });
        if (recentDecisions.length < 3) {
            // res.status(400).json({
            //   message:
            //     "Se necesitan al menos 3 decisiones para generar una recomendación.",
            // });
            return;
        }
        const evaluations = yield evaluation_model_1.Evaluation.findAll({
            where: {
                decisionId: recentDecisions.map((d) => d.id),
            },
        });
        const decisionsData = recentDecisions.map((decision) => {
            var _a, _b;
            const pros = decision.proCons
                .filter((pc) => pc.type === "Pro")
                .map((pc) => pc.text);
            const cons = decision.proCons
                .filter((pc) => pc.type === "Contra")
                .map((pc) => pc.text);
            const score = (_b = (_a = evaluations.find((e) => e.decisionId === decision.id)) === null || _a === void 0 ? void 0 : _a.score) !== null && _b !== void 0 ? _b : 0;
            return {
                title: decision.title,
                pros,
                cons,
                score,
            };
        });
        const recommendation = yield (0, openai_service_1.getRecommendationFromAI)(decisionsData);
        if (!recommendation) {
            res.status(500).json({
                message: "No se pudo generar la recomendación con IA.",
            });
            return;
        }
        const newRecommendation = yield recommendation_service_1.recommendationService.create({
            userId: user.id,
            decisionId,
            title: recommendation.title,
            content: recommendation.content,
        });
        res.status(201).json({
            message: "Recomendación creada con éxito",
            recommendation: newRecommendation,
        });
    }
    catch (error) {
        console.error("Error al generar recomendación:", error);
        res.status(500).json({ message: "Error al generar recomendación" });
    }
});
exports.createRecommendation = createRecommendation;
const getRecommendations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const recommendations = yield recommendation_service_1.recommendationService.getAllByUser(user.id);
        res.status(200).json({
            message: "Recomendaciones recuperadas con éxito",
            recommendations,
        });
    }
    catch (error) {
        console.error("Error al recuperar recomendaciones:", error);
        res.status(500).json({ message: "Error al recuperar recomendaciones" });
    }
});
exports.getRecommendations = getRecommendations;
