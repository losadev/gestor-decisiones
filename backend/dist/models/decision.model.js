"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decision = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const proCon_model_1 = require("./proCon.model");
const evaluation_model_1 = require("./evaluation.model");
const user_model_1 = require("./user.model");
const decision_types_1 = require("../@types/decision.types");
const recommendation_model_1 = require("./recommendation.model");
let Decision = class Decision extends sequelize_typescript_1.Model {
};
exports.Decision = Decision;
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Decision.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Decision.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM(...Object.values(decision_types_1.CategoryType))),
    __metadata("design:type", String)
], Decision.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)("progress"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("progress", "evaluated")),
    __metadata("design:type", String)
], Decision.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], Decision.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Decision.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => proCon_model_1.ProCon),
    __metadata("design:type", Array)
], Decision.prototype, "proCons", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => evaluation_model_1.Evaluation),
    __metadata("design:type", evaluation_model_1.Evaluation)
], Decision.prototype, "evaluation", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => recommendation_model_1.Recommendation),
    __metadata("design:type", recommendation_model_1.Recommendation)
], Decision.prototype, "recommendation", void 0);
exports.Decision = Decision = __decorate([
    sequelize_typescript_1.Table
], Decision);
