"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + ext);
    },
});
const fileFilter = (_req, file, cb) => {
    const allowedExt = [".jpg", ".jpeg", ".png"];
    const allowedMime = ["image/jpeg", "image/png"];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedExt.includes(ext) && allowedMime.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Solo se permiten imágenes en formato JPG o PNG"));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});
const uploadAvatar = (req, res, next) => {
    const single = exports.upload.single("avatar");
    single(req, res, (err) => {
        if (err) {
            let message = err.message;
            if (err instanceof multer_1.default.MulterError && err.code === "LIMIT_FILE_SIZE") {
                message = "El archivo excede el tamaño máximo de 2MB";
            }
            return res.status(400).json({ error: message });
        }
        next();
    });
};
exports.uploadAvatar = uploadAvatar;
