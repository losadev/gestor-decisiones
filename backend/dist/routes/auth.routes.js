"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", (0, express_validator_1.body)("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(), (0, express_validator_1.body)("password").not().isEmpty(), auth_controller_1.login);
exports.default = router;
