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
exports.deleteDecisionById = void 0;
const decision_model_1 = require("../models/decision.model");
const proCon_model_1 = require("../models/proCon.model");
const deleteDecisionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const decision = yield decision_model_1.Decision.findOne({
        where: { id },
        include: [proCon_model_1.ProCon],
    });
    if (!decision) {
        return { message: "La decisión no existe" };
    }
    yield decision.destroy();
    return { message: "La decisión ha sido borrada con éxito" };
});
exports.deleteDecisionById = deleteDecisionById;
