"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluation_controller_1 = require("../controllers/evaluation.controller");
const router = (0, express_1.Router)();
router.post("/", evaluation_controller_1.createEvaluation);
router.get("/", evaluation_controller_1.getAllEvaluations);
router.get("/:decisionId", evaluation_controller_1.getEvaluationByDecisionId);
exports.default = router;
