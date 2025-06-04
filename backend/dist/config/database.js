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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const decision_model_1 = require("../models/decision.model");
const category_model_1 = require("../models/category.model");
const proCon_model_1 = require("../models/proCon.model");
const evaluation_model_1 = require("../models/evaluation.model");
const recommendation_model_1 = require("../models/recommendation.model");
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    host: "localhost",
    dialect: "postgres",
    models: [user_model_1.User, category_model_1.Category, decision_model_1.Decision, proCon_model_1.ProCon, evaluation_model_1.Evaluation, recommendation_model_1.Recommendation],
});
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        yield exports.sequelize.sync({ force: true });
        console.log(`Server running at http://localhost:${process.env.PORT}/`);
    }
    catch (error) {
        console.log("Error al conectarse a la BD", error.message);
    }
});
exports.connectionDB = connectionDB;
