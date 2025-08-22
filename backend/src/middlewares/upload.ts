import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + ext);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedExt = [".jpg", ".jpeg", ".png"];
  const allowedMime = ["image/jpeg", "image/png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExt.includes(ext) && allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes en formato JPG o PNG"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const uploadAvatar = (req: Request, res: Response, next: NextFunction) => {
  const single = upload.single("avatar");
  single(req, res, (err) => {
    if (err) {
      let message = err.message;
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        message = "El archivo excede el tamaño máximo de 2MB";
      }
      return res.status(400).json({ error: message });
    }
    next();
  });
};
