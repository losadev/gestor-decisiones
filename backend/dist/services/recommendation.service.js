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
exports.recommendationService = void 0;
const recommendation_model_1 = require("../models/recommendation.model");
const uuid_1 = require("uuid");
exports.recommendationService = {
    create: (recommendationData) => __awaiter(void 0, void 0, void 0, function* () {
        const recommendation = yield recommendation_model_1.Recommendation.create(Object.assign({ id: (0, uuid_1.v4)() }, recommendationData));
        return recommendation;
    }),
    get: (decisionId) => __awaiter(void 0, void 0, void 0, function* () {
        const recommendation = yield recommendation_model_1.Recommendation.findOne({
            where: { decisionId },
        });
        return recommendation;
    }),
    getAllByUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return recommendation_model_1.Recommendation.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
    }),
};
