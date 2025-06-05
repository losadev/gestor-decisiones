"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prosCons_controller_1 = require("../controllers/prosCons.controller");
const router = (0, express_1.Router)();
router.get("/:id", prosCons_controller_1.getAllProsConsById);
exports.default = router;
