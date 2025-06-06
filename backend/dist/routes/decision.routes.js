"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/decision.routes.ts
const express_1 = require("express");
const decision_controller_1 = require("../controllers/decision.controller");
const router = (0, express_1.Router)();
router.post("/", decision_controller_1.createDecision);
router.delete("/:id", decision_controller_1.deleteDecision);
router.get("/", decision_controller_1.getAllDecisions);
router.get("/:id", decision_controller_1.getDecisionById);
router.put("/:id", decision_controller_1.updateDecision);
router.patch("/:id", decision_controller_1.updateState);
exports.default = router;
