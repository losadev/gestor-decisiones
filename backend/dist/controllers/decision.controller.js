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
exports.updateState = exports.updateDecision = exports.getDecisionById = exports.getAllDecisions = exports.deleteDecision = exports.createDecision = void 0;
const proCon_service_1 = require("../services/proCon.service");
const decision_service_1 = require("../services/decision.service");
const decision_model_1 = require("../models/decision.model");
const createDecision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const decision = yield decision_service_1.decisionService.create(Object.assign({ userId: userId.id }, req.body));
        const proConsArray = req.body.prosCons;
        if (!proConsArray || proConsArray.length === 0) {
            res.status(404).json({
                message: "No se encuentran los y pros y contras",
                success: false,
            });
            return;
        }
        let prosCons = [];
        for (const proCon of proConsArray) {
            const { description, type, weight } = proCon;
            prosCons.push(yield proCon_service_1.proConService.create({
                description,
                type,
                weight,
                decisionId: decision.id,
            }));
        }
        res.status(201).json({
            message: "Decisión creada con éxito",
            data: decision,
            prosCons: prosCons,
            success: true,
        });
    }
    catch (error) {
        console.log(req.body.prosCons);
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
            success: false,
        });
    }
});
exports.createDecision = createDecision;
const deleteDecision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDecision = yield decision_service_1.decisionService.delete(id);
        res.status(200).json({ message: deletedDecision.message, success: true });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
            success: false,
        });
    }
});
exports.deleteDecision = deleteDecision;
const getAllDecisions = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decisions = yield decision_model_1.Decision.findAll();
        res.status(200).json({
            message: "Se han recuperado todas las decisiones",
            success: true,
            decisions,
        });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Ha ocurrido un error en el servidor", success: false });
    }
});
exports.getAllDecisions = getAllDecisions;
const getDecisionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const decision = yield decision_service_1.decisionService.getById(id);
        if (!decision) {
            res
                .status(404)
                .json({ message: "No se ha encontrado la decisión", success: false });
            return;
        }
        res.status(200).json({
            message: "Se ha recuperado la decisión",
            decision,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Ha ocurrido un error en el servidor", success: false });
    }
});
exports.getDecisionById = getDecisionById;
const updateDecision = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const decisionId = req.params.id;
        // verifica que la decisión existe y pertenece al usuario
        const existingDecision = yield decision_service_1.decisionService.getById(decisionId);
        if (!existingDecision || existingDecision.userId !== userId.id) {
            res
                .status(404)
                .json({ message: "Decisión no encontrada", success: false });
            return;
        }
        const updatedDecision = yield decision_service_1.decisionService.update(decisionId, Object.assign({}, req.body));
        // elimina pros y contras actuales
        yield proCon_service_1.proConService.deleteAllByDecisionId(decisionId);
        // crea los nuevos pros y contras
        const proConsArray = req.body.prosCons;
        if (!proConsArray || proConsArray.length === 0) {
            res
                .status(400)
                .json({ message: "Debe incluir al menos un Pro/Con", success: false });
            return;
        }
        let prosCons = [];
        for (const proCon of proConsArray) {
            const { description, type, weight } = proCon;
            prosCons.push(yield proCon_service_1.proConService.create({
                description,
                type,
                weight,
                decisionId,
            }));
        }
        res.status(200).json({
            message: "Decisión actualizada con éxito",
            data: updatedDecision,
            success: true,
            prosCons,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Ha ocurrido un error en el servidor",
            error: error.message,
        });
    }
});
exports.updateDecision = updateDecision;
const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user;
        const decision = yield decision_service_1.decisionService.getById(id);
        if (!decision || decision.userId !== userId.id) {
            res
                .status(404)
                .json({ message: "Decisión no encontrada", success: false });
            return;
        }
        const updatedDecision = yield decision_service_1.decisionService.update(id, {
            status: "evaluated",
        });
        res.status(200).json({
            message: "La decisión ha sido evaluada",
            data: updatedDecision,
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
exports.updateState = updateState;
