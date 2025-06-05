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
exports.ProCon = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const proCon_type_1 = require("../@types/proCon.type");
const decision_model_1 = require("./decision.model");
let ProCon = class ProCon extends sequelize_typescript_1.Model {
};
exports.ProCon = ProCon;
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Default)(sequelize_typescript_1.DataType.UUIDV4),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], ProCon.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Length)({ min: 5, max: 255 }),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], ProCon.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ENUM("Pro", "Contra")),
    __metadata("design:type", String)
], ProCon.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.FLOAT),
    __metadata("design:type", Number)
], ProCon.prototype, "weight", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => decision_model_1.Decision),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.UUID),
    __metadata("design:type", String)
], ProCon.prototype, "decisionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => decision_model_1.Decision, { onDelete: "CASCADE" }),
    __metadata("design:type", decision_model_1.Decision)
], ProCon.prototype, "decision", void 0);
exports.ProCon = ProCon = __decorate([
    sequelize_typescript_1.Table
], ProCon);
