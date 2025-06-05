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
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const verifyUser_1 = require("./middlewares/verifyUser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const decision_routes_1 = __importDefault(require("./routes/decision.routes"));
const evaluation_routes_1 = __importDefault(require("./routes/evaluation.routes"));
const recommendation_routes_1 = __importDefault(require("./routes/recommendation.routes"));
const proCon_routes_1 = __importDefault(require("./routes/proCon.routes"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const auth_controller_1 = require("./controllers/auth.controller");
//import "./types/express";
const uploadsDir = path_1.default.join(__dirname, "..", "uploads");
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://172.19.0.4:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 5000;
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
app.use("/api/register", user_routes_1.default);
app.use("/api/login", auth_routes_1.default);
app.get("/api/me", verifyUser_1.verifyUser, (req, res) => {
    const user = req.user;
    if (!user) {
        res.status(401).send({ message: "ERROR EN /api/me" });
        return;
    }
    res.json({ user: user });
});
app.use("/api/decision", verifyUser_1.verifyUser, decision_routes_1.default);
app.use("/api/evaluation", verifyUser_1.verifyUser, evaluation_routes_1.default);
app.use("/api/recommendation", verifyUser_1.verifyUser, recommendation_routes_1.default);
app.use("/api/proscons", verifyUser_1.verifyUser, proCon_routes_1.default);
app.post("/api/logout", auth_controller_1.logout);
app.use("/api/users", verifyUser_1.verifyUser, user_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hello, world!");
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_1.connectionDB)();
}));
