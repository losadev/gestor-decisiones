import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname); // extension original del archivo
    // Generar un nombre único basado en la fecha actual y un número aleatorio
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Combinar el nombre único con la extensión del archivo
    cb(null, uniqueName + ext);
  },
});

export const upload = multer({ storage });
